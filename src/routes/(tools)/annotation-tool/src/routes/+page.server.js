import { z } from 'zod';
import vader from 'vader-sentiment';

const textSchema = z.object({
	text: z
		.string({ required_error: 'Text is required' })
		.min(2, { message: 'Text must be at least 2 characters' })
		.trim()
});

// get_sentiment function
const get_sentiment = (text) => {
	const score = vader.SentimentIntensityAnalyzer.polarity_scores(text);
	if (score.compound >= 0.05) {
		return 'The sentiment of your text is Positive!';
	} else if (score.compound > -0.05) {
		return 'The sentiment of your text is Neutral';
	} else {
		return 'The sentiment of your text is Negative';
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		// const text = formData.get('text');
		try {
			const result = textSchema.parse(formData);
			console.log('success!');
			const sentiment = get_sentiment(result.text);
			return {
				success: true,
				sentiment
			};
		} catch (err) {
			const { fieldErrors: errors } = err.flatten();
			// const { text } = formData;
			return {
				errors
			};
		}
	}
};

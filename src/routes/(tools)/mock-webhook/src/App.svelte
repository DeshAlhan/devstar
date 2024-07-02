<script>
	import axios from 'axios';
	let url = '';
	let event = '';
  
	const submitForm = async () => {
	  try {
		const response = await axios.post('http://localhost:4000/webhooks', { url, event });
		console.log('Webhook created:', response.data);
	  } catch (error) {
		console.error('Error creating webhook:', error);
	  }
	};
  </script>
  
  <main>
	<h1>Webhook Tester</h1>
	<form on:submit|preventDefault={submitForm}>
	  <label for="url">URL:</label>
	  <input type="text" id="url" bind:value={url} />
  
	  <label for="event">Event:</label>
	  <input type="text" id="event" bind:value={event} />
  
	  <button type="submit">Submit</button>
	</form>
  </main>
  
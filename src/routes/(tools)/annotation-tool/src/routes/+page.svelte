<script>
import {enhance} from "$app/forms"
export let form;

</script>
<section class="container mx-auto px-4 pb-5">
<div class="flex lg:flex-row justify-center items-center">
 <div class="flex-col flex lg:flex-row gap-4 items-center justify-between">
   <div class="w-full lg:w-1/2">
    <img class="rounded-sm brightness-50" src="group-chat.svg" alt=""/>
   </div>
   <div class="w-full lg:w-1/2 bg-slate-100 p-3 lg:p-8 h-full">
    <h2 class="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-slate-500 to-pink-600 my-4">Kit-Sentiment</h2>
    <p class="text-lg text-slate-500">Kit-sentiment is a simple and intuitive Svelte app that leverages Artificial Intelligence to analyze the sentiment behind any text input, including social media posts. With its user-friendly interface, you can easily input your text and receive an accurate sentiment analysis in just a matter of seconds. Whether you're curious about the tone behind a friend's tweet or looking to gain insights into public opinion, Kit-sentiment has got you covered. So why wait? Give it a try now and experience the power of AI-powered sentiment analysis!</p>
     <form method="POST" class="w-full my-6" action="" use:enhance>
     <div>
      <textarea rows="4" cols="7" name="text"  class="w-full h-98 rounded-sm textarea text-slate-500 text-md" placeholder="Your text...."></textarea>
     </div>
     {#if form?.errors?.text }
      <span class="py-2 px-1 text-red-400">{form?.errors?.text[0]}</span>
    {/if}
     <div class="my-4">
      <button class="rounded-sm btn bg-slate-700 hover:bg-slate-600 text-white btn-outline w-1/3" type="submit">Submit</button>
     </div>
     </form>
     <div>
       {#if form?.success }
        <p class="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-slate-500 to-pink-600">{form?.sentiment}</p>
       {/if}
     </div>
   </div>
 </div>
</div>
</section>
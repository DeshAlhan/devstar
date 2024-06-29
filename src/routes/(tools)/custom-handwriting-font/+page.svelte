<script>
  let showTemplates = true;
  let showMyFonts = false;

  let showBasicsOptions = true;
  let showLanguagesOptions = true;

  const letters = "abcdefghijklmnopqrstuvwxyz";
</script>

<div
  class="card gap-16 items-center mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 overflow-hidden rounded-lg"
>
  <!-- Add tool here -->
  <!-- side -->
  <div class="border-r-2 p-2 w-full">
    <button
      on:click={() => (showTemplates = !showTemplates)}
      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-8 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
      >Templates</button
    >
    <!-- Templates -->

    <div
      class=" text-gray-900 text-sm px-4 py-2 dark:text-white flex flex-col w-auto"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="flex justify-between cursor-pointer mb-2"
        on:click={() => (showBasicsOptions = !showBasicsOptions)}
      >
        Basics
        {#if showBasicsOptions}
          <span>-</span>
        {:else}
          <span>+</span>
        {/if}
      </div>
      {#if showBasicsOptions}
        <ul class="ml-4" id="basics-options">
          <li class="pb-2">
            English
            <button class="bg-green-500 px-2 py-[2px] mx-1">Add</button>
            <button class="bg-red-500 px-2 py-[2px]">Remove</button>
          </li>
          <li class="pb-2">
            Numbers
            <button class="bg-green-500 px-2 py-[2px] mx-1">Add</button>
            <button class="bg-red-500 px-2 py-[2px]">Remove</button>
          </li>
          <li class="pb-2">
            Punctuation
            <button class="bg-green-500 px-2 py-[2px] mx-1">Add</button>
            <button class="bg-red-500 px-2 py-[2px]">Remove</button>
          </li>
        </ul>
      {/if}
      <div
        class="flex justify-between cursor-pointer mb-2"
        on:click={() => (showLanguagesOptions = !showLanguagesOptions)}
      >
        Languages
        {#if showLanguagesOptions}
          <span>-</span>
        {:else}
          <span>+</span>
        {/if}
      </div>
    </div>

    <button
      on:click={() => showMyFonts != showMyFonts}
      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-8 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >My Fonts</button
    >
    <!-- My Fonts -->

    <div
      class=" text-gray-900 text-sm px-4 py-2 dark:text-white flex flex-col w-auto"
    >
      <ul>
        <li class="mb-2">My Font 1</li>
        <li class="mb-2">My Font 2</li>
      </ul>
    </div>
  </div>

  <!--right  -->
  <div class="pr-16">
    {#if showTemplates}
      <ul class="flex flex-wrap justify-center items-center gap-2">
        {#each letters as letter}
          <li
            class="flex justify-center items-center p-2 bg-gray-200 rounded shadow w-10 h-10"
          >
            {letter}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
</style>

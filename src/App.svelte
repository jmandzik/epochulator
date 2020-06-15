<script>
  import {
    format,
    formatRelative,
    formatDistanceToNow,
    startOfDay,
    startOfWeek,
    startOfMonth,
    startOfYear,
    endOfDay,
    endOfWeek,
    endOfMonth,
    endOfYear,
  } from "date-fns";
  import Stat from "./Stat.svelte";
  import Copied from "./Copied.svelte";
  import { onMount } from "svelte";

  let date = new Date();
  let copied = null;

  $: day = format(date, "yyyy-MM-dd");
  $: time = format(date, "HH:mm:ss");
  $: ms = date.getTime();
  $: s = Math.round(date.getTime() / 1000);
  $: relative = formatDistanceToNow(date, { addSuffix: true });
  $: console.log({ day, time, ms, s, relative });
  let unit = "milliseconds";

  onMount(() => {
    document.querySelector("#source-of-truth").select();
  });

  function handleDateInput(e) {
    const [year, month, day] = e.target.value.split("-").map(Number);
    let newDate = new Date(year, month - 1, day).getTime();

    const [hours, minutes, seconds] = time.split(":").map(Number);
    newDate += hours * 3600 * 1000;
    newDate += minutes * 60 * 1000;
    newDate += seconds * 1000;
    date = new Date(newDate);
  }

  function handleTimeInput(e) {
    const [hours, minutes, seconds = 0] = e.target.value.split(":").map(Number);
    console.log({ hours, minutes, seconds });
    const dateInMs = date.getTime();
    let newDate = startOfDay(date).getTime();
    newDate += hours * 3600 * 1000;
    newDate += minutes * 60 * 1000;
    newDate += seconds * 1000;
    date = new Date(newDate);
  }

  function handleCopied(event) {
    copied = event.detail;
    setTimeout(() => {
      copied = null;
    }, 2000);
  }

  function handleUserProvidedTime(e) {
    let input;
    if (isNaN(Number(e.target.value))) {
      input = new Date(e.target.value);
      if (input === "Invalid Date") {
        return;
      }
      date = input;
      return;
    }
    switch (e.target.value.length) {
      case 10:
        date = new Date(Number(e.target.value) * 1000);
        unit = "seconds";
        break;
      case 13:
        date = new Date(Number(e.target.value));
        unit = "milliseconds";
        break;
    }
  }
</script>

<style>
  .layout {
    width: 600px;
  }
</style>

<div class="bg-gray-100 rounded layout">

  {#if copied}
    <Copied value={copied} />
  {/if}
  <header
    class="flex items-center justify-between px-4 py-5 text-white bg-indigo-600 border-b border-gray-200">
    <div class="inline-flex items-center justify-center">
      <img src="/images/epochulator32.png" alt="Epochulator logo" />
      <h1 class="pl-2 text-2xl font-medium leading-6 ">Epochulator</h1>
    </div>
    <div>
      <div class="relative mt-1 rounded-md shadow-sm">
        <input
          id="source-of-truth"
          class="block w-full pl-2 pr-12 form-input text-cool-gray-900"
          value={ms}
          on:input={handleUserProvidedTime}
          aria-describedby="source-of-truth" />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span class="text-gray-500" id="source-of-truth">{unit}</span>
        </div>
      </div>
    </div>
  </header>
  <main class="m-4">
    <section class="flex justify-between">
      <div>
        <label
          for="date"
          class="block text-sm font-medium leading-5 text-gray-700">
          Start of ...
        </label>
        <span class="relative z-0 inline-flex rounded-md shadow-sm">
          <button
            type="button"
            on:click={() => (date = startOfDay(new Date()))}
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Day
          </button>
          <button
            type="button"
            on:click={() => (date = startOfWeek(new Date()))}
            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Week
          </button>
          <button
            type="button"
            on:click={() => (date = startOfMonth(new Date()))}
            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Month
          </button>
          <button
            type="button"
            on:click={() => (date = startOfYear(new Date()))}
            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Year
          </button>
        </span>
      </div>
      <div>
        <label
          for="date"
          class="block text-sm font-medium leading-5 text-gray-700">
          End of ...
        </label>
        <span class="relative z-0 inline-flex rounded-md shadow-sm">
          <button
            type="button"
            on:click={() => (date = endOfDay(new Date()))}
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Day
          </button>
          <button
            type="button"
            on:click={() => (date = endOfWeek(new Date()))}
            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Week
          </button>
          <button
            type="button"
            on:click={() => (date = endOfMonth(new Date()))}
            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Month
          </button>
          <button
            type="button"
            on:click={() => (date = endOfYear(new Date()))}
            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700">
            Year
          </button>
        </span>
      </div>
    </section>
    <section class="grid grid-cols-2 gap-5 my-5">
      <div class="w-full">
        <label
          for="date"
          class="block text-sm font-medium leading-5 text-gray-700">
          Date
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            type="date"
            class="block w-full px-4 py-3 transition duration-150 ease-in-out form-input"
            bind:value={day}
            on:input={handleDateInput} />

        </div>
      </div>
      <div class="w-full">
        <label
          for="time"
          class="block text-sm font-medium leading-5 text-gray-700">
          Time
        </label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            type="time"
            class="block w-full px-4 py-3 transition duration-150 ease-in-out form-input"
            bind:value={time}
            on:input={handleTimeInput} />

        </div>
      </div>

    </section>
    <hr />
    <div class="grid grid-cols-2 gap-5 mt-5">

      {#if unit === 'milliseconds'}
        <Stat label="Seconds" value={s} on:copied={handleCopied} />
      {:else}
        <Stat label="Milliseconds" value={ms} on:copied={handleCopied} />
      {/if}
      <Stat label="Relative" value={relative} on:copied={handleCopied} />

      <div class="col-span-2">
        <Stat
          label="ISO8601"
          value={date.toISOString()}
          on:copied={handleCopied} />
      </div>
      <div class="col-span-2">
        <Stat
          label="Local"
          value={format(date, 'PPPPpppp')}
          on:copied={handleCopied} />
      </div>

    </div>
  </main>

</div>

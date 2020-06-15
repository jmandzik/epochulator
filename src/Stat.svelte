<script>
  export let label;
  export let value;

  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div
  class="p-2 bg-white rounded-lg shadow cursor-pointer"
  on:click={async () => {
    dispatch('copied', value);
    console.log('dispatching', value);
    await navigator.clipboard.writeText(value);
  }}>
  <dl>
    <dt class="text-sm font-medium leading-5 text-gray-500 truncate">
      {label}
    </dt>
    <dd class="mt-1 text-lg font-semibold leading-9 text-gray-900">{value}</dd>
  </dl>
</div>

<script lang="ts">
  import Preview from "./lib/preview/Preview.svelte";
</script>

<div class="topright">
  <button on:click={() => document.body.classList.toggle("dark")}>
    Toggle dark mode
  </button>
</div>

<Preview />

<style>
  .topright {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
  }
</style>

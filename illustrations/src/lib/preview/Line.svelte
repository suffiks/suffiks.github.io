<script lang="ts">
  export let key = "";
  export let value:
    | string
    | number
    | boolean
    | undefined
    | object
    | Array<unknown>;
  export let indent: number | undefined = undefined;
  export let index = -1;
  export let parentArray = false;
</script>

<div
  class="line"
  class:inline={index == 0}
  data-index={index}
  data-indent={indent}
  {...$$restProps}
>
  {#if indent && indent > 0 && index != 0}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html Array(indent * 2 - 1)
      .fill("&nbsp;")
      .join("")}
  {/if}
  {#if key}
    <span class="key">{key}:</span>
  {:else}
    <span class="symbol">- </span>
  {/if}
  {#if Array.isArray(value)}
    {#each value as value}
      <svelte:self
        {value}
        indent={indent !== undefined ? indent + 1 : 1}
        parentArray={true}
      />
    {/each}
  {:else if typeof value === "object"}
    {#each Object.entries(value) as [key, val], index}
      <svelte:self
        {key}
        value={val}
        indent={indent !== undefined ? indent + 1 : 1}
        index={parentArray ? index : -1}
        data-yolo={"asdf"}
      />
    {/each}
  {:else if value !== undefined}
    <span
      class="value"
      class:string={typeof value == "string"}
      class:number={typeof value == "number"}
      class:boolean={typeof value == "boolean"}>{value}</span
    >
  {/if}
</div>

<style>
  .line {
    padding-right: 0.5rem;
  }
  .inline {
    display: inline;
  }
  .key {
    color: var(--key-color);
  }

  .string {
    color: var(--string-color);
  }

  .number {
    color: var(--number-color);
  }

  .boolean {
    color: var(--boolean-color);
  }
</style>

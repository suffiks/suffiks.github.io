<svelte:options
  customElement={{
    tag: "suffiks-preview",
    props: { dark: { type: "Boolean", reflect: true } },
  }}
/>

<script lang="ts">
  import Line from "./Line.svelte";
  import { code, resources, services } from "./code";
  import { calculateLine, getOffset, type LineProps } from "./helpers";

  export let dark = false;

  const servicesEls: HTMLElement[] = new Array(services.length);
  const serviceDialogs: HTMLDialogElement[] = new Array(services.length);
  const codeblockEls: HTMLElement[] = new Array(code.length);
  const resultblockEls: HTMLElement[][] = new Array(resources.length)
    .fill([])
    .map((_, i) => new Array(resources[i].code.length));
  let activeCodeblocks: number[] = [];
  let activeResultblocks: number[][] = new Array(resources.length).fill([]);
  let activeService = "";

  let lines: LineProps[] = [];

  const highlight = (id: string | undefined) => {
    if (!id) return;

    const activeCBs: number[] = [];
    for (let i = 0; i < code.length; i++) {
      if (code[i].service === id) {
        activeCBs.push(i);
      }
    }
    activeCodeblocks = activeCBs;

    const svc = services.find((s) => s.id === id);
    if (!svc) return;
    const svcEl = servicesEls[services.indexOf(svc)];

    activeService = svc.id;

    const newLines: LineProps[] = [];
    for (let i = 0; i < activeCBs.length; i++) {
      const codeblock = codeblockEls[activeCBs[i]];
      if (!codeblock) continue;

      const line = calculateLine(previewEl, codeblock, svcEl);
      newLines.push(line);
    }

    const activeResults: number[][] = new Array(3).fill([]).map(() => []);
    for (let i = 0; i < resources.length; i++) {
      for (let j = 0; j < resources[i].code.length; j++) {
        if (resources[i].code[j].service === id) {
          activeResults[i].push(j);
        }
      }
    }

    for (let i = 0; i < activeResults.length; i++) {
      const resultblocks = resultblockEls[i];
      for (let j = 0; j < activeResults[i].length; j++) {
        const resultblock = resultblocks[activeResults[i][j]];
        if (!resultblock) {
          continue;
        }

        const line = calculateLine(previewEl, resultblock, svcEl, true);
        newLines.push(line);
      }
    }

    activeResultblocks = activeResults;

    lines = newLines;
  };

  let previewEl: HTMLElement;

  const reset = () => {
    activeCodeblocks = [];
    activeResultblocks = new Array(resources.length).fill([]);
    lines = [];

    serviceDialogs.forEach((d) => {
      d.close();
    });
  };

  const showDialog = (index: number) => {
    const dialog = serviceDialogs[index];
    dialog.show();

    const offset = getOffset(previewEl);
    const dialogOffset = getOffset(dialog);
    const button = getOffset(servicesEls[index]);

    // Center the dialog above the service button
    const x = dialogOffset.width / -2;
    const y = button.top - dialogOffset.height - 10 - offset.top;

    dialog.style.left = `${x}px`;
    dialog.style.top = `${y}px`;
  };

  let previewHeight: number;
  let previewWidth: number;
</script>

<div class="wrapper" class:dark aria-hidden="true">
  <div
    class="preview"
    bind:this={previewEl}
    bind:clientHeight={previewHeight}
    bind:clientWidth={previewWidth}
  >
    <div class="code">
      {#each code as c, index}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class:codeblock={!!c.service}
          class:hover={!!c.service}
          class:active={activeCodeblocks.includes(index)}
          on:mouseenter={c.service ? () => highlight(c.service) : null}
          on:mouseleave={reset}
          bind:this={codeblockEls[index]}
        >
          {#each Object.entries(c.lines) as [key, value]}
            <Line {key} {value} indent={c.indent} />
          {/each}
        </div>
      {/each}
    </div>

    <div class="services">
      {#each services as service, index}
        <button
          class="service"
          on:mouseenter={() => {
            highlight(service.id);
            showDialog(index);
          }}
          on:mouseleave={reset}
          bind:this={servicesEls[index]}
        >
          <dialog bind:this={serviceDialogs[index]}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </dialog>
          <div class="logo">
            <svelte:component this={service.component} width={64} />
          </div>
          <div class="details">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        </button>
      {/each}
    </div>

    <div class="code results">
      {#each resources as r, outer}
        {#if outer > 0} <div class="divider" /> {/if}
        <div class="resource" class:active={activeService == r.service}>
          {#each r.code as c, index}
            <div
              class:codeblock={!!c.service}
              bind:this={resultblockEls[outer][index]}
              class:active={activeResultblocks[outer].includes(index)}
            >
              {#each Object.entries(c.lines) as [key, value]}
                <Line {key} {value} indent={c.indent} />
              {/each}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  <svg width={previewWidth} height={previewHeight}>
    {#each lines as line}
      <line {...line} stroke="#f77242" stroke-width="2" />
    {/each}
  </svg>
</div>

<style lang="postcss">
  .wrapper {
    position: relative;
    font-size: 0.8rem;
    white-space: nowrap;
    text-align: left;

    --codeblock-outline: #f77242;
    --codeblock-bg-hover: rgb(243 244 246 / 0.1);

    --key-color: #008080;
    --string-color: #0451a5;
    --number-color: #098658;
    --boolean-color: #0000ff;
  }

  .wrapper.dark {
    --codeblock-outline: #f77242;
    --codeblock-bg-hover: rgb(243 244 246 / 0.1);

    --key-color: rgba(251, 180, 115, 1);
    --string-color: rgba(220, 220, 113, 1);
    --number-color: rgba(255, 92, 38, 1);
    --boolean-color: rgba(92, 255, 38, 1);
  }

  .wrapper > svg {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
  }

  .preview {
    display: flex;
    flex-direction: row;
    gap: 2.2rem;
    align-items: center;
    justify-content: space-between;
  }

  .services {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .service .logo {
    padding: 1rem;
    border: 1px;
    border: #ffffff;
    border-radius: 5px;
  }

  .service .details {
    display: none;
  }

  .code {
    cursor: default;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      Liberation Mono, Courier New, monospace;
  }

  .codeblock {
    width: fit-content;
    border-radius: 0.375rem;
    outline-width: 1px;
    outline-color: var(--codeblock-outline);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    outline-offset: 1px;
  }

  .codeblock.hover:hover,
  .codeblock.active {
    background-color: var(--codeblock-bg-hover);
    outline-style: solid;
  }

  /* .resource {
		@apply overflow-hidden max-h-24 transition-all p-2;
	}

	.resource.active {
		@apply max-h-fit;
	} */

  .divider::before {
    content: "---";
    display: block;
    padding: 0.2rem 0;
  }

  dialog {
    position: absolute;
    padding: 1rem;
    z-index: 10;
    font-size: 1rem;
    background: white;
    border-radius: 5px;
    border: 1px solid gray;
  }
</style>

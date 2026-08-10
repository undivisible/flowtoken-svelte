<script lang="ts">
  import { untrack } from "svelte";
  import { resolveAnimationName } from "./animations";
  import type { FlowTokenAnimation } from "./animations";
  import { createDiffState, nextDiffState, splitPlainTokens, type Sep } from "./tokenize";

  interface Props {
    input: string;
    sep?: Sep;
    animation?: FlowTokenAnimation | string | null;
    animationDuration?: string;
    animationTimingFunction?: string;
    animationIterationCount?: string;
  }

  let {
    input,
    sep = "diff",
    animation = "fadeIn",
    animationDuration = "0.45s",
    animationTimingFunction = "ease-in-out",
    animationIterationCount = "1",
  }: Props = $props();

  let diffState = $state.raw(createDiffState());

  $effect(() => {
    if (sep !== "diff") {
      untrack(() => {
        if (diffState.prevInput || diffState.tokens.length > 0) {
          diffState = createDiffState();
        }
      });
      return;
    }

    const next = untrack(() => nextDiffState(diffState, input));
    if (next !== diffState) {
      diffState = next;
    }
  });

  const plainTokens = $derived.by(() => {
    if (sep === "diff") return [] as string[];
    return splitPlainTokens(input, sep);
  });

  const animationName = $derived(animation ? resolveAnimationName(animation) : undefined);
</script>

{#if sep === "diff"}
  {#each diffState.tokens as token (token.source)}
    <span
      style:animation-name={animationName}
      style:animation-duration={animationDuration}
      style:animation-timing-function={animationTimingFunction}
      style:animation-iteration-count={animationIterationCount}
      style:white-space="pre-wrap"
      style:display="inline-block"
    >
      {token.text}
    </span>
  {/each}
{:else}
  {#each plainTokens as token, index (index)}
    <span
      style:animation-name={animationName}
      style:animation-duration={animationDuration}
      style:animation-timing-function={animationTimingFunction}
      style:animation-iteration-count={animationIterationCount}
      style:white-space="pre-wrap"
      style:display="inline-block"
    >
      {token}
    </span>
  {/each}
{/if}

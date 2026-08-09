<script lang="ts">
  import { resolveAnimationName } from "./animations";
  import {
    createDiffTracker,
    splitPlainTokens,
    updateDiffTracker,
    type Sep,
    type TokenWithSource,
  } from "./tokenize";

  interface Props {
    input: string;
    sep?: Sep;
    animation?: string | null;
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

  const diffTracker = createDiffTracker();

  const diffTokens = $derived.by(() => {
    if (sep !== "diff") {
      diffTracker.prevInput = "";
      diffTracker.fullText = "";
      diffTracker.tokens = [];
      return [] as TokenWithSource[];
    }
    return updateDiffTracker(diffTracker, input);
  });

  const plainTokens = $derived.by(() => {
    if (sep === "diff") return [] as string[];
    return splitPlainTokens(input, sep);
  });

  const animationName = $derived(animation ? resolveAnimationName(animation) : undefined);
</script>

{#if sep === "diff"}
  {#each diffTokens as token (token.source)}
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

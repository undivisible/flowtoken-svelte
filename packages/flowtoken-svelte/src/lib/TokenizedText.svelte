<script lang="ts">
  import { resolveAnimationName } from "./animations";

  type Sep = "diff" | "word" | "char";

  interface TokenWithSource {
    text: string;
    source: number;
  }

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

  let prevInput = $state("");
  let diffTokens = $state<TokenWithSource[]>([]);
  let fullText = $state("");

  $effect(() => {
    if (sep !== "diff") return;

    if (!prevInput || input.length < prevInput.length) {
      diffTokens = [];
      fullText = "";
    }

    if (input !== prevInput) {
      if (input.includes(fullText)) {
        const uniqueNewContent = input.slice(fullText.length);
        if (uniqueNewContent.length > 0) {
          diffTokens = [
            ...diffTokens,
            { text: uniqueNewContent, source: diffTokens.length },
          ];
          fullText = input;
        }
      } else {
        diffTokens = [{ text: input, source: 0 }];
        fullText = input;
      }
    }

    prevInput = input;
  });

  const splitTokens = $derived.by(() => {
    if (sep === "word") {
      return input.split(/(\s+)/).filter((token) => token.length > 0);
    }
    if (sep === "char") {
      return input.split(/(.)/).filter((token) => token.length > 0);
    }
    return [] as string[];
  });

  const animationName = $derived(
    animation ? resolveAnimationName(animation) : undefined,
  );
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
  {#each splitTokens as token, index (index)}
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

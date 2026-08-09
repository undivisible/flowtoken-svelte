<script lang="ts">
  import { Streamdown } from "@tschk/svelte-streamdown";
  import TokenizedText from "./TokenizedText.svelte";
  import { mapStreamdownAnimation } from "./animations";
  import type { Sep } from "./tokenize";

  interface Props {
    content: string;
    sep?: Sep;
    animation?: string | null;
    animationDuration?: string;
    animationTimingFunction?: string;
    plain?: boolean;
    streaming?: boolean;
  }

  let {
    content,
    sep = "diff",
    animation = "fadeIn",
    animationDuration = "0.45s",
    animationTimingFunction = "ease-in-out",
    plain = false,
    streaming = true,
  }: Props = $props();

  const streamdownAnimated = $derived(animation ? mapStreamdownAnimation(animation) : false);
  const mode = $derived(streaming ? "streaming" : "static");
</script>

{#if plain}
  <TokenizedText input={content} {sep} {animation} {animationDuration} {animationTimingFunction} />
{:else if animation === null}
  <Streamdown markdown={content} mode="static" />
{:else}
  <Streamdown markdown={content} {mode} animated={streamdownAnimated} />
{/if}

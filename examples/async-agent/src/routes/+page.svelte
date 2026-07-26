<script lang="ts">
  import { onMount } from "svelte";
  import { AnimatedMarkdown } from "flowtoken-svelte";

  const description =
    "FlowToken brings gentle, token-by-token motion to streamed LLM text and Markdown in Svelte, making partial responses feel as deliberate as the finished thought.";
  const tokens = description.match(/\S+\s*/g) ?? [];

  let content = $state("");

  onMount(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      content += tokens[index] ?? "";
      index += 1;
      if (index === tokens.length) window.clearInterval(timer);
    }, 70);

    return () => window.clearInterval(timer);
  });
</script>

<main>
  <p>
    <AnimatedMarkdown
      {content}
      plain={true}
      sep="diff"
      animation="fadeIn"
      animationDuration="0.45s"
      animationTimingFunction="ease-in-out"
    />
  </p>
  <nav aria-label="Links">
    <a href="https://github.com/undivisible/flowtoken-svelte">GitHub</a>
    <a href="https://undivisible.dev">undivisible.dev</a>
  </nav>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    min-height: 100vh;
    padding: 2rem;
    background: #000;
    color: #fff;
    text-align: center;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.35;
    margin: 0;
    max-width: 620px;
  }

  nav {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.75rem;
  }

  a {
    color: #d0bcff;
    padding: 0.5rem;
    text-underline-offset: 0.2em;
  }

  a:hover {
    opacity: 0.7;
  }
</style>

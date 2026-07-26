<script lang="ts">
  import { onMount } from "svelte";
  import { AnimatedMarkdown } from "flowtoken-svelte";

  const description =
    "FlowToken is a lightweight Svelte component for streaming AI and Markdown responses with graceful, token-by-token motion.";
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
      animation="fadeAndScale"
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
    text-align: center;
  }

  p {
    font-size: clamp(1.5rem, 3vw, 2.35rem);
    line-height: 1.25;
    margin: 0;
    max-width: 42rem;
  }

  nav {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  a {
    color: inherit;
    text-underline-offset: 0.2em;
  }

  a:hover {
    opacity: 0.7;
  }
</style>

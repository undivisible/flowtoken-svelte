<script lang="ts">
  import { onMount } from "svelte";
  import { AnimatedMarkdown } from "flowtoken-svelte";

  const description =
    "Max Carter makes things for people—compilers, runtimes, operating systems, and native tools that make complicated systems feel direct. FlowToken Svelte is part of that work: a small text visualization library for turning live LLM output into something calm, readable, and continuous while it is still arriving.";
  const tokens = description.match(/\S+\s*/g) ?? [];

  let content = $state("");

  onMount(() => {
    let index = 0;
    let timer: ReturnType<typeof window.setTimeout>;

    const send = () => {
      content += tokens[index] ?? "";
      index += 1;
      if (index < tokens.length) timer = window.setTimeout(send, 32);
    };

    timer = window.setTimeout(send, 32);

    return () => window.clearTimeout(timer);
  });
</script>

<main>
  <section>
    <p class="stream" aria-live="polite">
      <AnimatedMarkdown
        {content}
        plain={true}
        sep="word"
        animation="fadeIn"
        animationDuration="0.6s"
        animationTimingFunction="ease-in-out"
      />
    </p>
    <nav aria-label="Links">
      <a href="https://github.com/undivisible/flowtoken-svelte">GitHub</a>
      <a href="https://undivisible.dev">undivisible.dev</a>
    </nav>
  </section>
</main>

<style>
  main {
    align-items: center;
    background: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  section {
    max-width: 640px;
    padding: 2rem;
    width: 100%;
  }

  .stream {
    font-size: 1.375rem;
    line-height: 1.5;
    margin: 0;
  }

  nav {
    display: flex;
    gap: 0.25rem;
    margin-top: 1.5rem;
  }

  a {
    color: #9aa0a6;
    font-size: 0.875rem;
    padding: 0.5rem;
    text-underline-offset: 0.2em;
  }

  a:hover {
    opacity: 0.7;
  }
</style>

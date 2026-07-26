<script lang="ts">
  import { onMount } from "svelte";
  import { AnimatedMarkdown } from "flowtoken-svelte";

  const description =
    "FlowToken is a text visualization library to animate and smooth streaming LLM token generation.";
  const tokens = description.split(" ");

  let content = $state("");

  onMount(() => {
    let index = 0;
    let timer: ReturnType<typeof window.setTimeout>;
    const delay = () => 1000 / 3 + Math.random() * 5;

    const send = () => {
      if (index === tokens.length) {
        timer = window.setTimeout(() => {
          content = "";
          index = 0;
          timer = window.setTimeout(send, delay());
        }, 1000);
        return;
      }

      content = content ? `${content} ${tokens[index]}` : tokens[index];
      index += 1;
      timer = window.setTimeout(send, delay());
    };

    timer = window.setTimeout(send, delay());

    return () => window.clearTimeout(timer);
  });
</script>

<main>
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
</main>

<style>
  main {
    min-height: 100vh;
    padding: 2rem;
  }

  .stream {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    max-width: 40rem;
  }

  nav {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  a {
    color: #9aa0a6;
    font-size: 0.75rem;
    text-underline-offset: 0.2em;
  }

  a:hover {
    opacity: 0.7;
  }
</style>

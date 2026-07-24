<script lang="ts">
  import { AnimatedMarkdown } from "flowtoken-svelte";

  type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    streaming?: boolean;
  };

  const assistantReply = `# Async Agent Demo

Here's a simulated streaming response with **markdown** support:

- Diff-based token animation
- Code blocks and lists
- Smooth fade-in on new chunks

\`\`\`typescript
const agent = "flowtoken-svelte";
console.log(\`Hello from \${agent}\`);
\`\`\`

Ask anything to see it stream in.`;

  let messages = $state<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome! Send a message and I'll stream a markdown reply with `fadeIn` animations.",
      streaming: false,
    },
  ]);
  let input = $state("");
  let streamTimer: ReturnType<typeof setInterval> | null = null;

  function stopStream() {
    if (streamTimer) {
      clearInterval(streamTimer);
      streamTimer = null;
    }
  }

  function streamAssistantReply(assistantId: string) {
    stopStream();
    let index = 0;

    streamTimer = setInterval(() => {
      index += 2;
      const content = assistantReply.slice(0, index);
      const done = index >= assistantReply.length;

      messages = messages.map((message) =>
        message.id === assistantId
          ? { ...message, content, streaming: !done }
          : message,
      );

      if (done) {
        stopStream();
      }
    }, 35);
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    messages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: text },
    ];
    input = "";

    const assistantId = crypto.randomUUID();
    messages = [
      ...messages,
      { id: assistantId, role: "assistant", content: "", streaming: true },
    ];
    streamAssistantReply(assistantId);
  }
</script>

<main class="chat">
  <header class="header">
    <h1>FlowToken Svelte</h1>
    <p>Async agent demo with diff streaming and fadeIn animations.</p>
  </header>

  <section class="messages" aria-live="polite">
    {#each messages as message (message.id)}
      <article class="message" class:user={message.role === "user"}>
        <div class="role">{message.role === "user" ? "You" : "Agent"}</div>
        <div class="bubble">
          {#if message.role === "user"}
            <p>{message.content}</p>
          {:else}
            <AnimatedMarkdown
              content={message.content}
              sep="diff"
              animation={message.streaming ? "fadeIn" : null}
              animationDuration="0.45s"
              animationTimingFunction="ease-out"
              streaming={message.streaming ?? false}
            />
          {/if}
        </div>
      </article>
    {/each}
  </section>

  <form class="composer" onsubmit={handleSubmit}>
    <input
      bind:value={input}
      placeholder="Ask the agent..."
      autocomplete="off"
      aria-label="Message"
    />
    <button type="submit">Send</button>
  </form>
</main>

<style>
  .chat {
    max-width: 720px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem 1rem;
    gap: 1rem;
  }

  .header h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .header p {
    margin: 0.35rem 0 0;
    color: #9aa0a6;
    font-size: 0.95rem;
  }

  .messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding-bottom: 0.5rem;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: flex-start;
  }

  .message.user {
    align-items: flex-end;
  }

  .role {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #9aa0a6;
  }

  .bubble {
    width: 100%;
    max-width: 100%;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: #15171c;
    border: 1px solid #262930;
  }

  .message.user .bubble {
    width: auto;
    max-width: 85%;
    background: #1a2332;
    border-color: #2b3b52;
  }

  .message.user p {
    margin: 0;
  }

  .composer {
    display: flex;
    gap: 0.5rem;
    position: sticky;
    bottom: 0;
    padding-top: 0.5rem;
    background: linear-gradient(transparent, #0b0c10 30%);
  }

  .composer input {
    flex: 1;
    border: 1px solid #30343c;
    background: #12141a;
    color: inherit;
    border-radius: 999px;
    padding: 0.75rem 1rem;
    outline: none;
  }

  .composer input:focus {
    border-color: #5b8def;
  }

  .composer button {
    border: none;
    border-radius: 999px;
    padding: 0.75rem 1.1rem;
    background: #5b8def;
    color: #081018;
    font-weight: 600;
    cursor: pointer;
  }

  .composer button:hover {
    filter: brightness(1.05);
  }

  .bubble :global(.svelte-streamdown) {
    font-size: 0.95rem;
  }
</style>

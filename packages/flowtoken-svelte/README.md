# @tschk/flowtoken-svelte

A Svelte 5 port of [FlowToken](https://github.com/Ephibbs/flowtoken) for animated LLM text streaming, built on [svelte-streamdown](https://github.com/undivisible/svelte-streamdown).

## Install

```bash
bun add @tschk/flowtoken-svelte
```

Also works with `npm` / `pnpm` / `yarn`. Requires Svelte 5.

## Usage

```svelte
<script>
  import { AnimatedMarkdown } from "@tschk/flowtoken-svelte";
  import "@tschk/flowtoken-svelte/styles.css";
  import "@tschk/svelte-streamdown/styles.css";

  let content = $state("## Hello, **world**!");
</script>

<AnimatedMarkdown
  {content}
  sep="diff"
  animation="fadeIn"
  animationDuration="0.45s"
  animationTimingFunction="ease-in-out"
/>
```

## Components

### `AnimatedMarkdown`

Renders markdown with FlowToken-style animations during streaming.

| Prop                      | Type                         | Default         | Description                                         |
| ------------------------- | ---------------------------- | --------------- | --------------------------------------------------- |
| `content`                 | `string`                     | —               | Markdown content                                    |
| `sep`                     | `"diff" \| "word" \| "char"` | `"diff"`        | Token split mode (plain mode only)                  |
| `animation`               | `string \| null`             | `"fadeIn"`      | Animation name, or `null` for static                |
| `animationDuration`       | `string`                     | `"0.45s"`       | CSS animation duration (plain mode)                 |
| `animationTimingFunction` | `string`                     | `"ease-in-out"` | CSS timing function (plain mode)                    |
| `animationIterationCount` | `string`                     | `"1"`           | CSS iteration count (plain mode)                    |
| `plain`                   | `boolean`                    | `false`         | Use token-level `TokenizedText` instead of markdown |
| `streaming`               | `boolean`                    | `true`          | Use Streamdown streaming mode                       |

When `animation` is `null`, renders static markdown via Streamdown. In markdown mode, Streamdown maps FlowToken names to its built-in animation variants (`true` / `blur` / `slide-up` / `slide-down`). Set `plain={true}` for character/word/diff token animations that use the full FlowToken CSS keyframes, including duration/timing/iteration props.

For untrusted LLM markdown, do not enable Streamdown Mermaid (`mermaid` peer) without strict Mermaid security settings upstream — that path uses `{@html}` with a loose security level.

### `TokenizedText`

Low-level token splitter with diff/word/char modes, ported from FlowToken's `SplitText.tsx`.

## Animations

- `fadeIn`, `blurIn`, `dropIn`, `slideUp`, `slideInFromLeft`
- `fadeAndScale`, `rotateIn`, `bounceIn`, `elastic`, `wave`
- `typewriter`, `highlight`, `blurAndSharpen`, `colorTransition`

Import `@tschk/flowtoken-svelte/styles.css` for keyframes. Pass custom animation names for your own CSS keyframes.

## License

ISC

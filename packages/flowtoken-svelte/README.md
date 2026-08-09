# @tschk/flowtoken-svelte

A Svelte 5 port of [FlowToken](https://github.com/Ephibbs/flowtoken) for animated LLM text streaming, built on [svelte-streamdown](https://github.com/undivisible/svelte-streamdown).

## Install

```bash
npm install @tschk/flowtoken-svelte
```

Requires Svelte 5.

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
| `sep`                     | `"diff" \| "word" \| "char"` | `"diff"`        | Token split mode (for plain mode)                   |
| `animation`               | `string \| null`             | `"fadeIn"`      | Animation name, or `null` for static                |
| `animationDuration`       | `string`                     | `"0.45s"`       | CSS animation duration                              |
| `animationTimingFunction` | `string`                     | `"ease-in-out"` | CSS timing function                                 |
| `plain`                   | `boolean`                    | `false`         | Use token-level `TokenizedText` instead of markdown |
| `streaming`               | `boolean`                    | `true`          | Use Streamdown streaming mode                       |

When `animation` is `null`, renders static markdown via Streamdown. When animating, Streamdown handles block-level animations; set `plain={true}` for character/word/diff token animations on plain text.

### `TokenizedText`

Low-level token splitter with diff/word/char modes, ported from FlowToken's `SplitText.tsx`.

## Animations

- `fadeIn`, `blurIn`, `dropIn`, `slideUp`, `slideInFromLeft`
- `fadeAndScale`, `rotateIn`, `bounceIn`, `elastic`, `wave`
- `typewriter`, `highlight`, `blurAndSharpen`, `colorTransition`

Import `@tschk/flowtoken-svelte/styles.css` for keyframes. Pass custom animation names for your own CSS keyframes.

## License

ISC

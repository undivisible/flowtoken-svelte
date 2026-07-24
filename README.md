# FlowToken Svelte

Svelte 5 port of [FlowToken](https://github.com/Ephibbs/flowtoken) for animated LLM text streaming, built on [svelte-streamdown](https://github.com/undivisible/svelte-streamdown).

## Packages

| Path | Description |
| --- | --- |
| `packages/flowtoken-svelte` | Animated markdown + tokenized text components |
| `examples/async-agent` | SvelteKit chat demo with simulated streaming agent |

## Development

```bash
bun install
bun run build
bun run --cwd examples/async-agent dev
```

## License

ISC

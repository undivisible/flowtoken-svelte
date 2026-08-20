# FlowToken Svelte

Svelte 5 port of [FlowToken](https://github.com/Ephibbs/flowtoken) for animated LLM text streaming, built on [svelte-streamdown](https://github.com/undivisible/svelte-streamdown).

Try the interactive demo at [flowtoken-svelte.undivisible.dev](https://flowtoken-svelte.undivisible.dev).

## Packages

| Path                        | Description                                   |
| --------------------------- | --------------------------------------------- |
| `packages/flowtoken-svelte` | Animated markdown + tokenized text components |
| `examples/async-agent`      | SvelteKit demo with simulated streaming text  |

## Development

```bash
bun install
bun run build
bun run --cwd examples/async-agent dev
```

## License

ISC

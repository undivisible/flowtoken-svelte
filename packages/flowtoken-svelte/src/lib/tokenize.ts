export type Sep = "diff" | "word" | "char";

export interface TokenWithSource {
  text: string;
  source: number;
}

export interface DiffState {
  prevInput: string;
  fullText: string;
  tokens: TokenWithSource[];
}

export function createDiffState(): DiffState {
  return {
    prevInput: "",
    fullText: "",
    tokens: [],
  };
}

export function nextDiffState(state: DiffState, input: string): DiffState {
  if (input === state.prevInput) {
    return state;
  }

  let tokens = state.tokens;
  let fullText = state.fullText;

  if (!state.prevInput || input.length < state.prevInput.length) {
    tokens = [];
    fullText = "";
  }

  if (input.includes(fullText)) {
    const uniqueNewContent = input.slice(fullText.length);
    if (uniqueNewContent.length > 0) {
      tokens = [...tokens, { text: uniqueNewContent, source: tokens.length }];
      fullText = input;
    }
  } else {
    tokens = [{ text: input, source: 0 }];
    fullText = input;
  }

  return {
    prevInput: input,
    fullText,
    tokens,
  };
}

export function splitPlainTokens(input: string, sep: Exclude<Sep, "diff">): string[] {
  if (sep === "word") {
    return input.split(/(\s+)/).filter((token) => token.length > 0);
  }

  return Array.from(input);
}

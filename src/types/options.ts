export interface ParsingOption {
  checked: boolean;
  blockedBy?: (keyof ParsingOptions)[];
}

export interface ParsingOptions {
  caseSensitive: ParsingOption;
  lettersOnly: ParsingOption;
  symbolsOnly: ParsingOption;
}

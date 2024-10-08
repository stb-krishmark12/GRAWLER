import { Config } from "./src/config";

export const defaultConfig: Config = {
    url: "https://snsce.ac.in/",
    match: "https://snsce.ac.in/**",
  maxPagesToCrawl: 50,
  outputFileName: "output.json",
  maxTokens: 2000000,
};

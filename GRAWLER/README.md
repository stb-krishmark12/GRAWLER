# GRAWLER <!-- omit from toc -->

Crawl a site to generate knowledge files to create your own custom GPT from one or multiple URLs



- [Example](#example)
- [Get started](#get-started)
  - [Running locally](#running-locally)
    - [Clone the repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Configure the crawler](#configure-the-crawler)
    - [Run your crawler](#run-your-crawler)
  - [Alternative methods](#alternative-methods)
    - [Running in a container with Docker](#running-in-a-container-with-docker)
    - [Running as an API](#running-as-an-api)
  - [Upload your data to OpenAI](#upload-your-data-to-openai)
    - [Create a custom GPT](#create-a-custom-gpt)
    - [Create a custom assistant](#create-a-custom-assistant)
- [Contributing](#contributing)

## Example

This project crawls specified URLs and generates files that can be used to create a custom GPT.

Try it out by asking questions about the content of the crawled site.

> Note that you may need a paid ChatGPT plan to access this feature

## Get started

### Running locally

#### Clone the repository

Be sure you have Node.js >= 16 installed.

```sh
git 
```

#### Install dependencies

```sh
npm i
```

#### Configure the crawler

Open [config.ts](config.ts) and edit the `url` and `selector` properties to match your needs.

Example configuration:

```ts
export const defaultConfig: Config = {
  url: "https://www.example.com/docs",
  match: "https://www.example.com/docs/**",
  selector: `.content-container`,
  maxPagesToCrawl: 50,
  outputFileName: "output.json",
};
```

See [config.ts](src/config.ts) for all available options. Here is a sample of the common configuration options:

```ts
type Config = {
  /** URL to start the crawl, if sitemap is provided then it will be used instead and download all pages in the sitemap */
  url: string;
  /** Pattern to match against for links on a page to subsequently crawl */
  match: string;
  /** Selector to grab the inner text from */
  selector: string;
  /** Don't crawl more than this many pages */
  maxPagesToCrawl: number;
  /** File name for the finished data */
  outputFileName: string;
  /** Optional resources to exclude */
  resourceExclusions?: string[];
  /** Optional maximum file size in megabytes to include in the output file */
  maxFileSize?: number;
  /** Optional maximum number tokens to include in the output file */
  maxTokens?: number;
};
```

#### Run your crawler

```sh
npm start
```

### Alternative methods

#### [Running in a container with Docker](./containerapp/README.md)

To obtain the `output.json` with a containerized execution, go into the `containerapp` directory and modify the `config.ts` as shown above. The `output.json` file should be generated in the data folder. Note: the `outputFileName` property in the `config.ts` file in the `containerapp` directory is configured to work with the container.

#### Running as an API

To run the app as an API server you will need to do an `npm install` to install the dependencies. The server is written in Express JS.

To run the server:

`npm run start:server` to start the server. The server runs by default on port 3000.

You can use the endpoint `/crawl` with the post request body of config json to run the crawler. The API docs are served on the endpoint `/api-docs` and are served using Swagger.

To modify the environment you can copy over the `.env.example` to `.env` and set your values like port, etc. to override the variables for the server.

### Upload your data to OpenAI

The crawl will generate a file called `output.json` at the root of this project. Upload that [to OpenAI](https://platform.openai.com/docs/assistants/overview) to create your custom assistant or custom GPT.

#### Create a custom GPT

Use this option for UI access to your generated knowledge that you can easily share with others.

> Note: you may need a paid ChatGPT plan to create and use custom GPTs right now

1. Go to [https://chat.openai.com/](https://chat.openai.com/)
2. Click your name in the bottom left corner
3. Choose "My GPTs" in the menu
4. Choose "Create a GPT"
5. Choose "Configure"
6. Under "Knowledge" choose "Upload a file" and upload the file you generated
7. If you get an error about the file being too large, you can try to split it into multiple files and upload them separately using the option maxFileSize in the config.ts file or also use tokenization to reduce the size of the file with the option maxTokens in the config.ts file



#### Create a custom assistant

Use this option for API access to your generated knowledge that you can integrate into your product.

1. Go to [https://platform.openai.com/assistants](https://platform.openai.com/assistants)
2. Click "+ Create"
3. Choose "upload" and upload the file you generated


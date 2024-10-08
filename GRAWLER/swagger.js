import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "GRAWLER API",
    description: "GRWALER",
  },
  host: "localhost:5000",
};

const outputFile = "swagger-output.json";
const routes = ["./src/server.ts"];

swaggerAutogen()(outputFile, routes, doc);

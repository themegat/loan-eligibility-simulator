import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "http://localhost:5005/openapi/v1.json",
  apiFile: "./src/store/baseApi.ts",
  apiImport: "baseSplitApi",
  outputFile: "./src/store/loansApi.ts",
  exportName: "loansApi",
  hooks: true,
};

export default config;

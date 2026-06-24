import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Eve Dönüş Atölyeleri",

  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
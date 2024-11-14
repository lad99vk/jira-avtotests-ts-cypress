import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  videoCompression: false,
  e2e: {
    specPattern: "cypress/e2e/**/*.e2e.{js,ts}",
    baseUrl: "https://jira.trungk18.com",
    testIsolation: false,
    supportFile: false,
    retries: {
      runMode: 1,
      openMode: 1,
    },
    setupNodeEvents(on, config) {},
  },
});

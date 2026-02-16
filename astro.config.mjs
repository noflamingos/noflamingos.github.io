import { defineConfig } from "astro/config";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1]; // "<owner>/<repo>"
const base = repo ? `/${repo}/` : "/";

export default defineConfig({
  site: "https://YOUR_GITHUB_USERNAME.github.io",
  base,
});

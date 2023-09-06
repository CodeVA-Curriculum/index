# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Terms

| Term | Definition |
| element | Any document or group in the `src/content` folder. All elements are represented by `.md` files, and must either include or inherit `title` and `authors` values in YAML frontmatter |
| document | An element without child elements (e.g., a lesson plan) |
| group | An element with child elements, usually represented by a `meta.md` file. Child elements are included in a `contents` field in YAML frontmatter. |

## Search

The website allows for "queries" (it's a static site, so they aren't *really* queries). The way this works is a little silly--the `library/search` path loads up the metadata for every single element in the whole `src/content` directory. This allows the search page to render page based on queries, displaying a subset of the materials in the library. The search page *also updates* the URL based on the inputs from the user, allowing a user to visit a particular URL with a set of materials pre-filtered.

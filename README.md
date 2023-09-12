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

## Elements

Each element must either define (via frontmatter) or inherit (from a parent group element) the following attributes. If an attribute has a default value, the compiler will assign an element that default value in the absence of an attribute definition in the element's frontmatter or an inherited attribute from a parent.

| Attribute | Description | Default Value | Inheritable? |
| --------- | ----------- | ------------- | ------------ |
| `title` | The name of the element | N/A | No |
| `authors` | The authors of the element. | CodeVA Curriculum | Yes |
| `subject` | The content area associated with the element. Must be one of "Computer Science", "Science", "Language Arts", "Visual Arts", "Physical Education", "Music", "Mathematics", 

You can also define optional frontmatter attributes for different kinds of resources:

| Attribute | Description | Inheritable? |
| --------- | ----------- | ------------ |
| `contents` | A list of relative paths pointing to files to be associated with the element on the site. Usually used to define groups. | No |

TODO: support directories in `contents`

### Inheritance

If an element does not define a required attribute in its frontmatter, it will inherit the required attribute from its containing group (if available). The only exception is the `title` field--if an element does not define a `title`, the compiler will throw an error and will not generate a page for the element.

### Parents vs Members

Elements can be *parents*, *childs*, *groups*, and *members. Parent-child relationships related to inheritance, while members appear on groups' pages (but do not pass attributes through chains of inheritance).

Parents are ordered from most direct to least.

### Hiding an Element

To exclude an element from the site, prepend the filename with a `.`. Files named `.meta.md` will still pass attributes to elements seeking inherited values.

## Search

The website allows for "queries" (it's a static site, so they aren't *really* queries). The way this works is a little silly--the `library/search` path loads up the metadata for every single element in the whole `src/content` directory. This allows the search page to render page based on queries, displaying a subset of the materials in the library. The search page *also updates* the URL based on the inputs from the user, allowing a user to visit a particular URL with a set of materials pre-filtered.

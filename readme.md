# `@jakxz/mdx-mermaid`

Plug and play Mermaid in MDX

[![npm version](https://badge.fury.io/js/@jakxz%2Fmdx-mermaid.svg)](https://badge.fury.io/js/@jakxz%2Fmdx-mermaid)
[![GitHub license](https://img.shields.io/github/license/jakxz/mdx-mermaid)][license]
[![build](https://github.com/jakxz/mdx-mermaid/actions/workflows/build.yml/badge.svg)](https://github.com/jakxz/mdx-mermaid/actions/workflows/build.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/9d89c7483bb1a906ecdf/maintainability)](https://codeclimate.com/github/jakxz/mdx-mermaid/maintainability)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)][pr]

Use [Mermaid][mermaid] in `.md`, `.mdx`, `.jsx` and `.tsx` files with ease.

Based off the answer [here][inspire] by unknown.

This fork is intentionally limited to only replace mermaid blocks with the `Mermaid` react component.
It's optimized for use with mdx v2 and docusaurus, which is technically not officially supported.
Proceed at your own risk.

```bash
yarn add @jakxz/mdx-mermaid mermaid docusaurus-theme-mdx-v2
```

Update `docusaurus.config.js` like so:

```js
const mermaid = require("@jakxz/mdx-mermaid");

module.exports = {
  themes: ["mdx-v2"],
  presets: [
    [
      "classic",
      {
        docs: {
          remarkPlugins: [mermaid],
        },
      },
    ],
  ],
};
```

You'll need to make the `Mermaid` component available to your theme.
At time of writing I am just using this patch for the docusaurus-theme-mdx-v2 package:

```diff
diff --git a/node_modules/docusaurus-theme-mdx-v2/theme/MDXContent/index.js b/node_modules/docusaurus-theme-mdx-v2/theme/MDXContent/index.js
index ec7b4c8..ab4aa5e 100644
--- a/node_modules/docusaurus-theme-mdx-v2/theme/MDXContent/index.js
+++ b/node_modules/docusaurus-theme-mdx-v2/theme/MDXContent/index.js
@@ -1,7 +1,12 @@
-import React from "react";
-import { MDXProvider } from "@mdx-js/react";
-import MDXComponents from "@theme/MDXComponents";
+import React from 'react';
+import {MDXProvider} from '@mdx-js/react';
+import MDXComponents from '@theme/MDXComponents';
+import {Mermaid} from '@jakxz/mdx-mermaid/Mermaid';
 
-export default function MDXContent({ children }) {
-  return <MDXProvider components={MDXComponents}>{children}</MDXProvider>;
+export default function MDXContent({children}) {
+  return (
+    <MDXProvider components={{...MDXComponents, Mermaid}}>
+      {children}
+    </MDXProvider>
+  );
 }
```

Then, use code blocks in `.md` or `.mdx` files:

````md
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

OR, just use the component in `.mdx`, `.jsx` or `.tsx` files:

```jsx
import { Mermaid } from "@jakxz/mdx-mermaid/Mermaid";

<Mermaid
  chart={`graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`}
/>;
```

There are more examples [here][examples].

## License

MIT Jason Kurian

Original:
[MIT][license] © [Samuel Wall][author]

<!-- Definitions -->

[license]: https://github.com/jakxz/mdx-mermaid/blob/main/license
[author]: https://samuelwall.co.uk
[mermaid]: http://mermaid-js.github.io/mermaid/
[inspire]: https://github.com/facebook/docusaurus/issues/1258#issuecomment-594393744
[pr]: http://makeapullrequest.com
[examples]: https://sjwall.github.io/mdx-mermaid/docs/examples/
[documentation]: https://sjwall.github.io/mdx-mermaid/

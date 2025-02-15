# deno_doc_components

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/deno_doc_components_cn/mod.ts)
[![Build Status - Cirrus][]][Build status]

一组用于呈现 [deno_doc](https://deno.land/x/deno_doc)
[DocNodes](https://doc.deno.land/https://deno.land/x/deno_doc/lib/types.d.ts/~/DocNode)
的组件。

## 展示

仓库包含一个展示应用程序，用于查看 `_showcase`
目录中的组件。它可以使用以下方法在本地运行：

```
> deno task showcase
```

也可以直接访问
[deno-doc-components_cn.deno.dev](https://deno-doc-components_cn.deno.dev)
在线查看。

## 使用

### Services

There are other services that may need to be provided to integrate the
components into an application. These can also be provided via `setup()` and
will override the default behavior.

#### `href()`

The function `href()` should return a link string value which will be used at
points in rendering when linking off to other modules and symbols. It has the
following signature:

```ts
interface Configuration {
  href?: (path: string, symbol?: string) => string;
}
```

The `path` will be set to the module being requested (e.g. `/mod.ts`) and
optionally a `symbol` will be provided, if targeting a specific exported symbol
from that module.

#### `lookupSymbolHref()`

The function `lookupSymbolHref()` is used when the components are trying to
resolve a link to a specific symbol. An implementation should attempt to resolve
the symbol from the current namespace to the current module, to the global
namespace, returning a link to the first matching symbol it finds. If the symbol
cannot be found, `undefined` should be returned.

```ts
interface Configuration {
  lookupSymbolHref?: (
    current: string,
    namespace: string | undefined,
    symbol: string,
  ) => string | undefined;
}
```

The `current` will be set to the module that is the current reference point
(e.g. `/mod.ts`), any `namespace` that is in the current scope (e.g. `errors`)
and the symbol that is being looked for (e.g. `Uint8Array`). If the current
namespace is with another namespace, they will be separated by a `.` (e.g.
`custom.errors`).

#### twind

twind has some shared hidden state, which means that doc_components needs to
share the same versions of the remote twind modules. In order to do that,
`doc_components` from the bare specifiers `twind`, `twind/colors`, `twind/css`.
Also, if you are setting up twind to SSR in a client application, you will end
up needing items from `twind/sheets`.

Therefore it is expected that you will use an
[import map](https://deno.land/manual/node/import_maps) to provide the specific
version of twind you are using in your end application. This repository contains
an example which is used for the showcase.

You can specify a twind setup configuration by passing a property of `tw` when
performing a setup. For example:

```ts
import { setup } from "https://deno.land/x/deno_doc_components/services.ts";

await setup({
  tw: {
    theme: {
      colors: {
        transparent: "transparent",
      },
    },
  },
});
```

The `/services.ts` module exports a `theme` object which is the default theme
settings that the `doc_components` use with twind, which can be used when you
are performing setup from twind yourself:

```ts
import { setup } from "twind";
import { theme } from "https://deno.land/x/deno_doc_components/services.ts";

setup({ theme });
```

---

Copyright 2021-2023 the Deno authors. All rights reserved. MIT License.

[Build Status - Cirrus]: https://github.com/denoland/doc_components/workflows/ci/badge.svg?branch=main&event=push
[Build status]: https://github.com/denoland/doc_components/actions

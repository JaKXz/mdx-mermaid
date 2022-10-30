/**
 * Copyright (c) Samuel Wall.
 *
 * This source code is licensed under the MIT license found in the
 * license file in the root directory of this source tree.
 */

import type { Data, Literal, Node, Parent } from "unist";
import type { Config } from "./config.model";

type CodeMermaid = Literal<string> & {
  type: "code";
  lang: "mermaid";
};
type Instance = [Literal, number, Parent<Node<Data> | Literal, Data>];
type OutputResult = (Node<Data> | Literal<unknown, Data>)[];

/**
 * mdx-mermaid plugin.
 *
 * @param config Config passed in from parser.
 * @returns Function to transform mdxast.
 */
export default function plugin(config?: Config) {
  return async function transformer(ast: any): Promise<Parent> {
    const visit: any = await import("unist-util-visit").then((mod) =>
      typeof mod.default === "function" ? mod.default : mod.visit
    );

    // Find all the mermaid diagram code blocks. i.e. ```mermaid
    const instances: Instance[] = [];
    visit(
      ast,
      { type: "code", lang: "mermaid" },
      (node: CodeMermaid, index, parent) => {
        instances.push([node, index!, parent as Parent<Node<Data>, Data>]);
      }
    );

    // Replace each Mermaid code block with the Mermaid component
    for (let i = 0; i < instances.length; i++) {
      const [node, index, parent] = instances[i];
      const passConfig = i == 0 ? config : undefined;
      const result = createMermaidNode(node as any, "Mermaid", passConfig);
      Array.prototype.splice.apply(parent.children, [index, 1, ...result]);
    }
    return ast;
  };
}

function createMermaidNode(
  node: CodeMermaid,
  hName: string,
  config?: Config
): OutputResult {
  return [
    {
      type: "mermaidCodeBlock",
      data: {
        hName,
        hProperties: {
          config: JSON.stringify(config),
          chart: node.value,
        },
      },
    },
  ];
}

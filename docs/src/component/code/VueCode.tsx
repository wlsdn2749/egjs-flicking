import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getOptionsObject, getPlugins, getStyle } from "./utils";

export default ({ options, panels, plugins, siblings, imports = [] }: SourceContext) => {
  const optionsObject = getOptionsObject(options);
  const declarePlugins = plugins ? `,
  data() {
    return {
      plugins: [${getPlugins(plugins)}]
    }
  }` : "";
  const allImports = [...plugins.map(plugin => [`{ ${plugin[0]} }`, "@egjs/flicking-plugins"]), ...imports];

  return <><CodeBlock className="html" title="template">
    {`<Flicking${options ? ` :options="{ ${optionsObject} }"` : ""}${plugins ? " :plugins=\"plugins\"" : ""}>
  ${panels.map(panel => `<${panel.tag}${panel.isSlot ? " slot=\"viewport\"" : ""}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</Flicking>${siblings ? `\n${siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n")}` : ""}`}
  </CodeBlock>
  <CodeBlock className="js" title="script">
    {`${getImports(allImports, { prefix: "vue" })}

export default {
  components: {
    Flicking
  }${declarePlugins}
}`}
  </CodeBlock></>;
};

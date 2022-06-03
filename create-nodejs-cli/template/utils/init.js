import { readFileSync } from "fs";

import welcome from "cli-welcome";
import unhandled from "cli-handle-unhandled";

const fileURL = new URL("../package.json", import.meta.url);
const pkg = JSON.parse(readFileSync(fileURL));

export default ({ clear = true }) => {
  unhandled();

  welcome({
    title: `create-node-cli`,
    tagLine: `Node CLI tutorial`,
    description: pkg.description,
    version: pkg.version,
    bgColor: `#6cc24a`,
    color: `#000000`,
    bold: true,
    clear,
  });
};

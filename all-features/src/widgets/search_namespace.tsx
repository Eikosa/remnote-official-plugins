import { renderWidget, RNPlugin } from "@remnote/plugin-sdk";
import { TestResultMap } from "../lib/types";
import { TestRunner } from "../components/TestRunner";
import {sleep} from "../lib/utils";

const searchNamespaceMethodTests: TestResultMap<RNPlugin["search"]> = {
  search: async (plugin, removeRem) => {
    const rem = await plugin.rem.createRem();
    await rem?.setText(["Can you find me?"]);
    await sleep(1000)
    const res = await plugin.search.search(["find"]);
    const actual = res[0]?._id
    const expected = rem?._id;
    await removeRem(rem);
    return {
      expected,
      actual
    }
  }
};

renderWidget(() => <TestRunner tests={searchNamespaceMethodTests} />);

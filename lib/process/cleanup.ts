import { NODE_LAMBDA_LAYER_DIR } from "./setup";
import * as fs from "fs-extra";

export const removeBundleDir = () => {
  // バンドル用のディレクトリを削除
  fs.removeSync(NODE_LAMBDA_LAYER_DIR);
};

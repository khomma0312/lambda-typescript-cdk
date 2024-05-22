#!/usr/bin/env node
import * as childProcess from "child_process";
import * as fs from "fs-extra";

export const NODE_LAMBDA_LAYER_DIR = `${process.cwd()}/bundle`;
export const NODE_LAMBDA_LAYER_RUNTIME_DIR_NAME = `nodejs`;

export const bundleNpm = () => {
  // package.jsonとpackage.lock.jsonをlambdaディレクトリからバンドル用のディレクトリにコピー
  copyPackageJson();

  // package.jsonの内容をもとにパッケージをインストール
  childProcess.execSync(`npm install --production`, {
    cwd: getModulesInstallDirName(),
    stdio: ["ignore", "inherit", "inherit"],
    env: { ...process.env },
    shell: "bash",
  });
};

const copyPackageJson = () => {
  fs.mkdirsSync(getModulesInstallDirName());
  ["package.json", "package-lock.json"].map((file) =>
    fs.copyFileSync(
      `${process.cwd()}/lambda/${file}`,
      `${getModulesInstallDirName()}/${file}`
    )
  );
};

const getModulesInstallDirName = (): string => {
  return `${NODE_LAMBDA_LAYER_DIR}/${NODE_LAMBDA_LAYER_RUNTIME_DIR_NAME}`;
};

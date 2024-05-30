// @ts-nocheck
import type { useMonaco } from "@monaco-editor/react";

import antdTs from "antd/es/antd.d.ts?raw";
import jsxRuntimeTs from "../node_modules/@types/react/jsx-runtime.d.ts?raw";
import reactTs from "../node_modules/@types/react/index.d.ts?raw";
import reactDomTs from "../node_modules/@types/react-dom/index.d.ts?raw";

export const addExtraLib = (
  monaco: NonNullable<ReturnType<typeof useMonaco>>
) => {
  const {
    languages: { typescript },
  } = monaco;
  typescript.typescriptDefaults.addExtraLib(
    antdTs,
    "file:///node_modules/@types/antd/index.d.ts"
  );
  typescript.typescriptDefaults.addExtraLib(
    jsxRuntimeTs,
    "file:///node_modules/@types/react/jsx-runtime/index.d.ts"
  );
  typescript.typescriptDefaults.addExtraLib(
    reactTs,
    "file:///node_modules/@types/react/index.d.ts"
  );
  typescript.typescriptDefaults.addExtraLib(
    reactDomTs,
    "file:///node_modules/@types/react-dom/index.d.ts"
  );
};

import swc, { transformSync } from "@swc/wasm-web";
let initialized: boolean;
export const transformCode = async (code: string) => {
  if (!initialized) {
    await swc();
    initialized = true;
  }
  return transformSync(code, {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
    module: {
      type: "commonjs",
    },
  }).code;
};
import * as antd from "antd";
import * as react from "react";
import * as reactdom from "react-dom";
import * as jsxRuntime from "react/jsx-runtime";
const deps = {
  react,
  antd,
  "react-dom": reactdom,
  "react/jsx-runtime": jsxRuntime,
};
export const compileCode = async (code: string) => {
  const exports: Record<string, unknown> = {};
  const parsedCode = await transformCode(code);
  const require = (path: string) => {
    if (deps[path]) {
      return deps[path];
    }
    throw Error(`Module not found: ${path}`);
  };
  const resultFn = new Function("exports", "require", parsedCode);
  resultFn(exports, require);
  return exports.default;
};

import { useEffect } from "react";
import { addExtraLib } from "./helpers";
import { useMonaco } from "@monaco-editor/react";

const useSetup = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;
    const {
      languages: { typescript },
    } = monaco;
    const defaultOptions = typescript.typescriptDefaults.getCompilerOptions();
    typescript.typescriptDefaults.setCompilerOptions({
      ...defaultOptions,
      moduleResolution: typescript.ModuleResolutionKind.NodeJs,
      jsx: typescript.JsxEmit.ReactJSX,
    });
    addExtraLib(monaco);
    monaco.editor.getEditors().forEach((editor) => {
      if (!monaco.editor.getModel(monaco.Uri.file("file.tsx"))) {
        const model = monaco.editor.createModel(
          "",
          "typescript",
          monaco.Uri.file("file.tsx")
        );
        editor.setModel(model);
      }
    });
  }, [monaco]);

  return monaco;
};

export default useSetup;

import MonacoEditor from '@monaco-editor/react'
import useSetup from './useSetup';
import { useEffect } from 'react';


interface IProps {
  value?: string;
  onChange?: (v: string) => void;
}
const Editor = ({ value, onChange }: IProps) => {
  const monaco = useSetup();  

  useEffect(() => {
    if (monaco) {
      monaco.editor.getModel(monaco.Uri.file('file.tsx'))?.setValue(value ?? '');
    }
  }, [monaco, value])
  return <MonacoEditor onChange={(v) => {
    onChange?.(v ?? '');
  }} defaultLanguage="typescript" />
}

export default Editor;
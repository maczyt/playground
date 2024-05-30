import { Box } from "@mui/system";
import { ReactNode, useEffect, useState } from "react";
import { compileCode } from "./helpers";

interface IProps {
  value?: string;
}
const Preview = ({ value }: IProps) => {
  const [preview, setPreview] = useState<ReactNode>(null);
  useEffect(() => {
    compileCode(value ?? "").then((Preview) => {
      // @ts-ignore
      setPreview(<Preview />);
    });
  }, [value]);
  return <Box>{preview}</Box>;
};

export default Preview;

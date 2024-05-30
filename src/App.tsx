import { Box } from "@mui/system";
import Editor from "./Editor";
import { useEffect, useRef, useState } from "react";
import Preview from "./Preview";
import { Alert, Tag } from "antd";
import { isMacOs } from "environment";

function App() {
  const [value, setValue] = useState(`import { Button } from 'antd';

export default function() {
  return (
      <Button onClick={() => {
        console.log('click me')
      }}>
        Hello World
      </Button>
  )
}
`);
  const valueRef = useRef(value);
  useEffect(() => {
    const handleSave = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key === "s") {
        ev.preventDefault();
        setValue(valueRef.current);
      }
    };
    document.addEventListener("keydown", handleSave);

    return () => {
      document.removeEventListener("keydown", handleSave);
    };
  }, []);
  return (
    <Box
      sx={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100vh" }}
    >
      <Box>
        <Alert
          message={
            <div>
              Only after saved code
              <Tag>({isMacOs ? "command" : "ctrl"}+s)</Tag>, the preview just to
              refresh
            </div>
          }
          type="info"
          showIcon
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Box>
          <Editor
            value={valueRef.current}
            onChange={(v) => {
              valueRef.current = v;
            }}
          />
        </Box>
        <Box>
          <Preview value={value} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;

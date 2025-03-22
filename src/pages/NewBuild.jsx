import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useStream } from "../context/StreamContext";
import { Box, Divider, Tooltip } from "@mui/joy";
import Editor from "@monaco-editor/react";
import { VscOpenPreview } from "react-icons/vsc";
import { IoMdCodeDownload } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { IconButton } from "@material-tailwind/react";
import { formatAISnippet } from "../utils/formatAISnippet";

const NewBuild = () => {
  const { projectId } = useParams();
  const { reader, output, setOutput, decoder } = useStream();
  const [streaming, setStreaming] = useState(false);
  const [snippet, setSnippet] = useState([]); // Parsed files
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file

  const editorRef = useRef();

  useEffect(() => {
    if (!reader || streaming) return;

    const streamResponse = async () => {
      setStreaming(true);
      let tempOutput = ""; 

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const decodedValue = decoder.decode(value);
          console.log("Chunk received:", decodedValue);

          tempOutput += decodedValue;
          setOutput((prev) => prev + decodedValue);
        }
      } catch (error) {
        console.error("Frontend Streaming Error:", error);
      } finally {
        setStreaming(false);
      }
    };

    streamResponse();
  }, [reader]);

  useEffect(() => {
    if (!output) return;
    const formattedSnippets = formatAISnippet(output);
    setSnippet(formattedSnippets);
  }, [output]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const actionMenu = [
    { name: "Update", action: () => {}, icon: <GrUpdate size={20} /> },
    { name: "Preview", action: () => {}, icon: <VscOpenPreview size={20} /> },
    { name: "Download", action: () => {}, icon: <IoMdCodeDownload size={20} /> },
  ];

  return (
    <div className="md:grid block grid-cols-12 w-full h-screen relative">
      {/* Sidebar */}
      <div className="md:block lg:block xl:block 2xl:block col-span-2 overflow-y-auto bg-[#1E1E1E] border-r border-[#333333] md:h-full xl:h-full h-auto lg:h-full 2xl:h-full p-1.5 md:p-5">
        <div className="overflow-x-auto flex gap-3 pb-2 w-full justify-evenly md:gap-3 xl:gap-3 2xl:gap-3 sm:gap-1">
          {actionMenu.map((action, key) => (
            <div key={key}>
              <Tooltip color="primary" title={action.name} arrow placement="top-start">
                <IconButton className="cursor-pointer">{action.icon}</IconButton>
              </Tooltip>
            </div>
          ))}
        </div>

        <div className="md:block xl:block lg:block 2xl:block hidden">
          <Divider>Recent</Divider>
          {/* File List */}
          {snippet.length > 0 ? (
            <ul className="text-white mt-3">
              {snippet.map((file, index) => (
                <li
                  key={index}
                  className={`cursor-pointer border-gray-800 border-b hover:text-gray-500 hover:underline text-gray-300 py-2 ${
                    selectedFile === file.filePath ? "text-yellow-300" : ""
                  }`}
                  onClick={() => {
                    setSelectedFile(file.filePath);
                    setOutput(file.content);
                  }}
                >
                  {file.filePath}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No files yet</p>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="col-span-10 h-full">
        <Box sx={{ minHeight: "100vh", minWidth: "100%", background: "#0f0a19", color: "gray" }}>
          <Editor
            onValidate={(markers) => markers.forEach((marker) => console.log("onValidate:", marker.message))}
            onMount={onMount}
            theme="vs-dark"
            height="100vh"
            width="100%"
            defaultLanguage="javascript"
            value={output}
            defaultValue={output}
          />
        </Box>
      </div>
    </div>
  );
};

export default NewBuild;

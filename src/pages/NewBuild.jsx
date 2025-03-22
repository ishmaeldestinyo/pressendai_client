import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStream } from "../context/StreamContext";
import { Box, Divider, Tooltip } from "@mui/joy";
import Editor from "@monaco-editor/react";
import { VscOpenPreview } from "react-icons/vsc";
import { IoMdHome } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { IconButton } from "@material-tailwind/react";
import { formatAISnippet } from "../utils/formatAISnippet";

const NewBuild = () => {
  const { projectId } = useParams();
  const { reader, output, setOutput, decoder } = useStream();
  const [streaming, setStreaming] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const navigate = useNavigate();
  const editorRef = useRef();

  // Memoized formatted snippets
  const snippets = useMemo(() => formatAISnippet(output), [output]);

  useEffect(() => {
    if (!reader || streaming) return;

    setStreaming(true);

    const streamResponse = async () => {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const decodedValue = decoder.decode(value);
          console.log("Chunk received:", decodedValue);

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

  // Auto-select first file and ensure the correct content is displayed
  useEffect(() => {
    if (snippets.length > 0) {
      const firstFile = snippets[0];
      
      setSelectedFile((prev) => {
        // Update only if the file exists in snippets
        const updatedFile = snippets.find((f) => f.filePath === prev?.filePath);
        return updatedFile || firstFile;
      });
    }
  }, [snippets]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const actionMenu = [
    { name: "Update", action: () => {}, icon: <GrUpdate size={20} /> },
    { name: "Preview", action: () => {}, icon: <VscOpenPreview size={20} /> },
    { name: "Home", action: () => navigate("/"), icon: <IoMdHome size={20} /> },
  ];

  return (
    <div className="grid grid-cols-12 w-full h-screen">
      {/* Sidebar - File List */}
      <div className="col-span-2 bg-[#1E1E1E] overflow-auto border-r border-gray-700 p-4">
        {/* Top Actions */}
        <div className="flex justify-between mb-4">
          {actionMenu.map((action, key) => (
            <Tooltip key={key} title={action.name} arrow>
              <IconButton onClick={action.action}>{action.icon}</IconButton>
            </Tooltip>
          ))}
        </div>

        <Divider>Files</Divider>

        {/* File List */}
        <ul className="mt-3 text-white overflow-x-auto">
          {snippets.length > 0 ? (
            snippets.map((file, index) => (
              <li
                key={index}
                className={`cursor-pointer py-2 px-3 border-b border-gray-800 hover:text-gray-400 ${
                  selectedFile?.filePath === file.filePath ? "bg-gray-700 text-yellow-300" : ""
                }`}
                onClick={() => setSelectedFile(file)}
              >
                {file.filePath}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No files yet</p>
          )}
        </ul>
      </div>

      {/* Code Editor */}
      <div className="col-span-10 h-full">
        <Box sx={{ height: "100vh", background: "#0f0a19", color: "gray" }}>
          <Editor
            onMount={onMount}
            theme="vs-dark"
            height="100vh"
            width="100%"
            language={selectedFile?.language || "javascript"}
            value={selectedFile?.content || "// Select a file to view content"}
          />
        </Box>
      </div>
    </div>
  );
};

export default NewBuild;

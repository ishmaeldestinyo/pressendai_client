import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useStream } from "../context/StreamContext";
import { Box, Button, Divider, Tooltip } from "@mui/joy";
import Editor from "@monaco-editor/react";
import { VscOpenPreview } from "react-icons/vsc";
import { IoMdCodeDownload } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { IconButton } from "@material-tailwind/react";

const NewBuild = () => {
  const { projectId } = useParams();
  const { reader, output, setOutput, decoder } = useStream();
  const [streaming, setStreaming] = useState(false);

  const [snippet, setSnippet] = useState([]);

  /**
   * 
   * @snippet format
   * files 
   * 
   */

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  useEffect(() => {
    if (!reader || streaming) return;
  
    const streamResponse = async () => {
      setStreaming(true);
  
      let tempOutput = ""; // Store the output locally before updating state
  
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
  
          const decodedValue = decoder.decode(value);
          console.log("Chunk received:", decodedValue);
  
          tempOutput += decodedValue; // Store partial result
          setOutput((prev) => prev + decodedValue); // Update UI
        }
      } catch (error) {
        console.error("Frontend Streaming Error:", error);
        setOutput((prev) => prev);
      } finally {
        setStreaming(false);
      }
    };
  
    streamResponse();
  }, [reader]);

  
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus(); // Focus the editor when it mounts
  };


  const actionMenu = [
    {
      name: "Update",
      action: () => {},
      icon: <GrUpdate size={20}/>
    },
    {
      name: "Preview",
      action: () => {},
      icon: <VscOpenPreview size={20}/>
    },
    {
      name: "Download",
      action: () => {},
      icon: <IoMdCodeDownload size={20}/>
    },

  ];
  
  return (
    <div className="md:grid block grid-cols-12 w-full h-screen relative">

      <div className="md:block lg:block xl:block 2xl:block block col-span-2 overflow-y-auto bg-[#1E1E1E] border-r border-[#333333] md:h-full xl:h-full h-auto lg:h-full 2xl:h-full p-1.5 md:p-5">
      <div className=" overflow-x-auto  flex gap-3 pb-2 w-full justify-evenly md:gap-3 xl:gap-3 2xl:gap-3 sm:gap-1 ">
        {actionMenu.map( (action, key) => (
          <div key={key}>
            <Tooltip color="primary"  title={action.name} arrow placement="top-start">
              <IconButton className=" cursor-pointer">{action.icon}</IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
        <div className="md:block xl:block lg:block 2xl:block hidden">
        <Divider>Recent</Divider>
        file list
        </div>
      </div>
      <div className="col-span-10 h-full">
        <Box
          sx={{
            minHeight: "100vh",
            minWidth: "100%",
            background: "#0f0a19",
            color: "gray",
          }}
        >
          <Editor
            onValidate={handleEditorValidation}
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

import Editor from "@monaco-editor/react";
import { IconButton } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import {
  FaComment,
  FaEdit,
  FaHome,
  FaMicrophone,
  FaRecordVinyl,
} from "react-icons/fa";
import { IoRecording, IoRecordingOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { getResult } from "../api/axiosConfig";
import { Box, CircularProgress, Divider } from "@mui/joy";

function EditProject() {

  const [streaming, setStreaming] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
  const hasRun = useRef();

  const { id } = useParams();

  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchProjectSnippet = async () => {
      // provide id
      try {
        const response = await getResult(`/api/projects/${id}`);

        if (response.status == 200) {
          setSnippets(response.data.data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (!hasRun.current) {
      fetchProjectSnippet();
    }
  }, []);

  const startRecordStreaming = async () => {};
  const grantEditPermission = async () => {};
  const sendPromptData = async () => {};
  const startPencilAction = async () => {};

  const actionMenu = [
    {
      btn: <LuPencil size={20} />,
      action: () => startPencilAction(),
    },
    {
      btn: <FaEdit size={20} />,
      action: () => grantEditPermission(),
    },
    {
      btn: <FaMicrophone size={20} />,
      action: () => startRecordStreaming(),
    },
    {
      btn: <FaComment size={20} />,
      action: () => sendPromptData(),
    },
  ];
  return (
    <div>
      show live view and circle it with pencil, then pop up voice recording and comment button 
      shows, for user to speak or edit
    </div>
  );
}

export default EditProject;

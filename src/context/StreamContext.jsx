import { createContext, useState, useContext } from "react";

const StreamContext = createContext();

export const StreamProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);
  const [output, setOutput] = useState("");
  const [reader, setReader] = useState(null);
  const decoder = new TextDecoder("utf-8");

  return (
    <StreamContext.Provider value={{ projectId, setProjectId, output, setOutput, reader, setReader, decoder }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => useContext(StreamContext);

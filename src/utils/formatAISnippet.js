export const formatAISnippet = (rawChunk) => {
    // Convert to string if not already a string
    rawChunk = String(rawChunk);
  
    const snippetRegex = /\*\*filePath:\s*(.*?)\*\*\n?```(\w+)?\n([\s\S]*?)```|\*\*(.*?)\*\*\n?```(\w+)?\n([\s\S]*?)```/g;
    const snippets = [];
  
    let match;
    while ((match = snippetRegex.exec(rawChunk)) !== null) {
      const filePath = (match[1] || match[4]).trim(); // Handles both formats
      const language = (match[2] || match[5]) ? (match[2] || match[5]).trim() : "";
      const content = (match[3] || match[6]).trim();
  
      const languageMapping = {
        js: "javascript",
        jsx: "javascript",
        ts: "typescript",
        tsx: "typescript",
        py: "python",
        rb: "ruby",
        java: "java",
        php: "php",
        html: "html",
        css: "css",
        json: "json",
        sh: "bash",
        env: "plaintext" // Handle .env files
      };
  
      const fileExtension = filePath.split(".").pop();
      const formattedLanguage = language || languageMapping[fileExtension] || "";
  
      snippets.push({
        filePath,
        include_file: true,
        content,
        language: formattedLanguage,
      });
    }
  
    return snippets;
  };
  
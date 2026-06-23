import React, { createContext, useContext, useState } from 'react';

interface EditorContextType {
  isDragMode: boolean;
  setIsDragMode: (val: boolean) => void;
}

export const EditorContext = createContext<EditorContextType>({
  isDragMode: false,
  setIsDragMode: () => {}
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDragMode, setIsDragMode] = useState(false);
  return (
    <EditorContext.Provider value={{ isDragMode, setIsDragMode }}>
      {children}
    </EditorContext.Provider>
  );
};

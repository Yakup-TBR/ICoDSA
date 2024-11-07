import { createContext, useContext, useState } from 'react';

// Context untuk editor
const EditorContext = createContext();

// Hook untuk mengakses editor context
export const useEditorContext = () => {
    return useContext(EditorContext);
};

// Provider untuk memberi akses context ke komponen lain
export const EditorProvider = ({ children }) => {
    const [editorContent, setEditorContent] = useState("");

    // Fungsi untuk mengupdate konten editor
    const updateEditorContent = (content) => {
        setEditorContent(content);
    };

    return (
        <EditorContext.Provider value={{ editorContent, updateEditorContent }}>
            {children}
        </EditorContext.Provider>
    );
};

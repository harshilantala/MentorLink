import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Bold, Italic, Underline, Link, List, Image, AlignLeft, Undo, Redo } from 'lucide-react';

// Custom CSS to override SunEditor styles - add this to your stylesheet or component
const customEditorStyles = `
  /* Clean up the editor UI */
  .sun-editor {
    border-radius: 12px !important;
    border: 1px solid #e5e7eb !important;
    font-family: inherit !important;
    box-shadow: none !important;
    overflow: hidden !important;
  }
  
  /* Button toolbar styling */
  .sun-editor .se-toolbar {
    outline: none !important;
    background-color: #f9fafb !important;
    border-bottom: 1px solid #f3f4f6 !important;
    padding: 6px !important;
  }
  
  /* Button groups */
  .sun-editor .se-btn-group {
    margin: 0 4px !important;
  }
  
  /* Buttons */
  .sun-editor .se-btn {
    border: none !important;
    background-color: transparent !important;
    margin: 0 1px !important;
    padding: 6px !important;
    border-radius: 6px !important;
  }
  
  .sun-editor .se-btn:hover {
    background-color: #f3f4f6 !important;
  }
  
  .sun-editor .se-btn.active {
    background-color: #e5e7eb !important;
  }
  
  /* Editor content area */
  .sun-editor .se-wrapper {
    background-color: #ffffff !important;
  }
  
  .sun-editor .se-wrapper-inner {
    padding: 12px 16px !important;
  }
  
  /* Placeholder */
  .sun-editor .se-wrapper-wysiwyg:focus:not(.se-disabled)[contenteditable=true]:empty:before {
    color: #9ca3af !important;
    font-style: normal !important;
    font-size: 14px !important;
  }
  
  /* Small toolbar for mobile view */
  @media (max-width: 768px) {
    .sun-editor .se-toolbar {
      padding: 4px !important;
    }
    
    .sun-editor .se-btn {
      padding: 4px !important;
    }
    
    .se-toolbar-icons-wrapper {
      white-space: nowrap;
      overflow-x: auto;
    }
  }
`;

const RichEditor = ({
    handleChange,
    contents,
    isAutofocus = false,
    minHeight = "120px",
    maxHeight,
    defaultValue,
    width,
    height,
    placeholder = "Write something..."
}) => {
    const editor = useRef();
    const [isActive, setIsActive] = useState(false);
    
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    
    // Inject custom styles
    React.useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = customEditorStyles;
        document.head.appendChild(styleEl);
        
        return () => {
            document.head.removeChild(styleEl);
        };
    }, []);

    const handleEditorLoad = (sunEditor) => {
        editor.current = sunEditor;
        
        // Prevent the editor from scrolling to itself
        if (sunEditor) {
            sunEditor.core.focus();
            // Immediately blur to prevent scrolling
            setTimeout(() => {
                sunEditor.core.blur();
            }, 0);
        }
    };

    return (
        <div 
            className={`rich-editor-container transition-all duration-200 ${isActive ? 'ring-2 ring-blue-200' : ''}`} 
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
        >
            <SunEditor
                name="myEditor"
                onChange={handleChange}
                setContents={contents}
                autoFocus={isAutofocus}
                getSunEditorInstance={handleEditorLoad}
                defaultValue={defaultValue}
                setOptions={{
                    buttonList: [
                        ['bold', 'underline', 'italic'],
                        ['link', 'list', 'align'],
                        ['image'],
                        ['undo', 'redo'],
                    ],
                    defaultStyle: "font-family: inherit; font-size: 14px; line-height: 1.5;",
                    resizingBar: false,
                    height: height,
                    minHeight: minHeight,
                    maxHeight: maxHeight,
                    placeholder: placeholder,
                    imageFileInput: true,
                    imageGalleryUrl: null, // Disable gallery if no custom handler
                    imageUploadUrl: null, // Disable default upload if no custom handler
                    toolbarContainer: null,
                    charCounter: false,
                    font: ['Arial', 'Verdana', 'Times New Roman', 'Helvetica'],
                }}
            />
        </div>
    );
};

export default RichEditor;
import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const RichEditor = ({
    handleChange,
    contents,
    isAutofocus,
    minHeight,
    defaultValue,
    width,
    height,
}) => {
    const editor = useRef();
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    return (
        <SunEditor
            name="myEditor"
            onChange={handleChange}
            setContents={contents}
            autoFocus={isAutofocus}
            getSunEditorInstance={getSunEditorInstance}
            defaultValue={defaultValue}
            setOptions={{
                buttonList: [
                    ["bold", "underline", "italic"],
                    ["link", "list", "align"],
                    ["fontSize", "subscript", "superscript"],
                    ["image"], // Added image option
                    ["undo", "redo"],
                ],
                defaultStyle: "font-family: sans-serif; font-size: 14px;",
                resizingBar: false,
                height: height,
                minHeight: minHeight,
                placeholder: "Say something...",
                imageFileInput: true, // Enable image file input
            }}
        />
    );
};

export default RichEditor;

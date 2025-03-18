import React from "react";
import moment from "moment";

const Message = ({ message, uid }) => {
    // Common styles
    const containerStyle = {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        marginBottom: "12px",
        justifyContent: message.sender._id === uid ? "flex-end" : "flex-start",
        transition: "all 0.3s ease-in-out",
    };
    
    // Message bubble styles
    const bubbleStyle = {
        maxWidth: "65%",
        padding: "12px 16px",
        borderRadius: message.sender._id === uid ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        backgroundColor: message.sender._id === uid ? "#E9F5FF" : "#F0F2F5",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, opacity 0.2s ease",
        animation: "fadeIn 0.3s ease-out forwards",
        position: "relative",
        overflow: "hidden",
    };
    
    // Message content styles
    const contentStyle = {
        margin: "0 0 4px 0",
        wordBreak: "break-word",
        fontSize: "15px",
        lineHeight: "1.4",
        color: "#2D3748",
        fontWeight: "400",
    };
    
    // Timestamp styles
    const timestampStyle = {
        fontSize: "11px",
        color: "#718096",
        alignSelf: "flex-end",
        marginTop: "4px",
        fontWeight: "300",
    };

    // Animation keyframes as a string to be included in the style tag
    const keyframesStyle = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={containerStyle}>
                <div 
                    style={bubbleStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <p style={contentStyle}>{message.content}</p>
                    <span style={timestampStyle}>
                        {moment(message.createdAt).format("LT")}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Message;
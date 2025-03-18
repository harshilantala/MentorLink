import React, { useState } from "react";

const ChatTiles = ({ mentee, handleChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // Container styles with hover effect
    const containerStyle = {
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: "12px",
        backgroundColor: isHovered ? "#f7fafc" : "#ffffff",
        boxShadow: isHovered 
            ? "0 4px 6px rgba(0, 0, 0, 0.05)" 
            : "0 1px 3px rgba(0, 0, 0, 0.05)",
        border: `1px solid ${isHovered ? "#e2e8f0" : "#edf2f7"}`,
        transition: "all 0.2s ease",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        width: "100%",
        maxWidth: "280px",
        position: "relative",
        overflow: "hidden",
    };

    // User info container
    const userInfoStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: "12px",
        width: "calc(100% - 28px)",
    };

    // Avatar styles
    const avatarStyle = {
        height: "40px",
        width: "40px",
        borderRadius: "50%",
        marginRight: "12px",
        objectFit: "cover",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        border: "2px solid #fff",
        transition: "transform 0.2s ease",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
    };

    // User details container
    const userDetailsStyle = {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    };

    // User name style
    const nameStyle = {
        margin: 0,
        fontSize: "14px",
        fontWeight: "600",
        color: "#2d3748",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    // User subtitle/enrollment style
    const subtitleStyle = {
        margin: 0,
        fontSize: "12px",
        fontWeight: "400",
        color: "#718096",
        opacity: 0.8,
    };

    // Checkbox container style
    const checkboxContainerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    // Custom checkbox styles
    const checkboxWrapperStyle = {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
    };

    // The actual checkbox input is hidden
    const hiddenInputStyle = {
        position: "absolute",
        opacity: 0,
        cursor: "pointer",
        height: 0,
        width: 0,
    };

    // Custom checkbox appearance
    const customCheckboxStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        height: "20px",
        width: "20px",
        backgroundColor: isChecked ? "#4299e1" : "#fff",
        border: `2px solid ${isChecked ? "#4299e1" : "#cbd5e0"}`,
        borderRadius: "4px",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    };

    // Checkbox checkmark
    const checkMarkStyle = {
        display: isChecked ? "block" : "none",
        width: "6px",
        height: "12px",
        border: "solid white",
        borderWidth: "0 2px 2px 0",
        transform: "rotate(45deg)",
        marginTop: "-2px",
    };

    // Handle the checkbox change
    const onCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        handleChange(e);
    };

    // Clean up name display
    const fullName = `${mentee?.firstName || ''} ${mentee?.middleName || ''} ${mentee?.lastName || ''}`.trim();

    return (
        <div 
            style={containerStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={userInfoStyle}>
                <img
                    style={avatarStyle}
                    src={
                        mentee?.avatar?.url === ""
                            ? `https://api.dicebear.com/9.x/personas/svg`
                            : mentee?.avatar?.url
                    }
                    alt={`Avatar of ${fullName}`}
                />
                <div style={userDetailsStyle}>
                    <h5 style={nameStyle}>{fullName}</h5>
                    <h6 style={subtitleStyle}>{mentee?.enrollment_no ? mentee?.enrollment_no : "Mentor"}</h6>
                </div>
            </div>

            <div style={checkboxContainerStyle}>
                <label style={checkboxWrapperStyle}>
                    <input
                        style={hiddenInputStyle}
                        type="checkbox"
                        id={mentee?._id}
                        onChange={onCheckboxChange}
                        checked={isChecked}
                    />
                    <span style={customCheckboxStyle}>
                        <span style={checkMarkStyle}></span>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default ChatTiles;
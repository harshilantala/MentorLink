import React, { useState } from "react";
import ChevronDown from "../../../../../../assets/icons/ChevronDown";

const ScrollToBottom = ({ scrollToBottom }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Button container styles
    const buttonStyle = {
        position: "absolute",
        bottom: "112px", // 28rem in px
        right: "54px", // 13.5rem in px
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: isHovered ? "#4B5563" : "#64748B", // Slightly lighter on hover
        color: "#FFFFFF",
        border: "none",
        boxShadow: isHovered 
            ? "0 8px 16px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)" 
            : "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "all 0.25s ease-in-out",
        outline: "none",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        zIndex: 10,
        padding: 0,
    };
    
    // Button ripple animation after click
    const handleClick = (e) => {
        // Create ripple effect
        const button = e.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.position = "absolute";
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        circle.style.transform = "scale(0)";
        circle.style.animation = "ripple 0.6s linear";
        
        // Clean up previous ripples
        const ripple = button.querySelector(".ripple");
        if (ripple) {
            ripple.remove();
        }
        
        circle.classList.add("ripple");
        button.appendChild(circle);
        
        // Execute scroll function
        scrollToBottom();
    };
    
    // Ripple animation keyframes
    const keyframesStyle = `
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-4px);
            }
            100% {
                transform: translateY(0);
            }
        }
    `;
    
    return (
        <>
            <style>{keyframesStyle}</style>
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={buttonStyle}
                aria-label="Scroll to bottom"
            >
                <ChevronDown 
                    myStyle={"h-5 w-5"} 
                    alt={true} 
                />
            </button>
        </>
    );
};

export default ScrollToBottom;
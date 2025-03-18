import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChat } from "../../../../../../actions/chat";
import ChatTiles from "./ChatTiles";

import Plus from "../../../../../../assets/icons/Plus";
import { studentGetAllStudentsOfMentor } from "../../../../../../actions/student";
import { authContext } from "../../../../../../contexts/authContext";
import { Roles } from "../../../../../../utility";

const ChatModal = ({ setShowModal, nodeRef }) => {
    // State variable to store the fetched mentees from the api
    const [myMentees, setMyMentees] = useState([]);
    // Animation state for modal entrance
    const [isVisible, setIsVisible] = useState(false);

    // Accessing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);
    const { mentees } = useSelector((state) => state.mentor);

    const dispatch = useDispatch();
    const history = useHistory();

    // State variable to store the chat ids of the selected mentees
    const [chatIds, setChatIds] = useState({ chats: [] });

    const { role } = useContext(authContext);

    // Animation effect - set visible after mount
    useEffect(() => {
        // Small delay to allow CSS transition to work
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    // useEffect as component did mount to fetch the mentee for the mentor
    useEffect(() => {
        // Checking to see if the logged in user in student or mentor
        if (role === Roles.STUDENT) dispatch(studentGetAllStudentsOfMentor(history, setMyMentees));
        else setMyMentees(mentees);
    }, [dispatch, history, mentees, role]);

    // Function to add and remove the chat ids from the state variable chatIds
    const handleChange = (e) => {
        const checked = e.target.checked;
        const id = e.target.id;
        if (checked) {
            setChatIds({ chats: [...chatIds.chats, id] });
        } else {
            const newChatIds = chatIds.chats.filter((chatid) => chatid !== id);
            setChatIds({ chats: newChatIds });
        }
    };

    // Function to submit the chatIds to the api for creation of new chats
    const handleSubmit = () => {
        dispatch(createChat(history, setShowModal, chatIds));
    };

    // Handle close with animation
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setShowModal(false), 300);
    };

    // Styled components
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 40,
        backdropFilter: "blur(2px)",
    };

    const modalStyle = {
        maxHeight: "500px",
        width: "90%",
        maxWidth: "600px",
        overflowY: "auto",
        zIndex: 50,
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
    };

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
        borderBottom: "1px solid #f1f1f1",
        paddingBottom: "12px",
    };

    const titleStyle = {
        fontSize: "20px",
        fontWeight: 600,
        color: "#333",
        margin: 0,
    };

    const closeButtonStyle = {
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderRadius: "50%",
        backgroundColor: "#f1f1f1",
        cursor: "pointer",
        fontSize: "18px",
        color: "#666",
        transition: "background-color 0.2s ease, transform 0.2s ease",
    };

    const selectedCountStyle = {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        padding: "8px 16px",
        backgroundColor: "#f7fafc",
        borderRadius: "8px",
        fontSize: "14px",
        color: "#4a5568",
    };

    const countBadgeStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "24px",
        height: "24px",
        backgroundColor: "#3182ce",
        color: "white",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: 600,
        marginLeft: "8px",
        padding: "0 8px",
    };

    const tilesContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        maxHeight: "280px",
        overflowY: "auto",
        padding: "4px 0",
        marginBottom: "16px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "flex-end",
        borderTop: "1px solid #f1f1f1",
        paddingTop: "16px",
        marginTop: "8px",
    };

    const createButtonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 20px",
        borderRadius: "8px",
        backgroundColor: chatIds.chats.length > 0 ? "#4299e1" : "#a0aec0",
        color: "#ffffff",
        fontWeight: 500,
        border: "none",
        cursor: chatIds.chats.length > 0 ? "pointer" : "not-allowed",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        opacity: chatIds.chats.length > 0 ? 1 : 0.7,
    };

    return (
        <div style={overlayStyle} onClick={handleClose}>
            <div 
                ref={nodeRef} 
                style={modalStyle} 
                onClick={(e) => e.stopPropagation()}
            >
                <div style={headerStyle}>
                    <h4 style={titleStyle}>Create a new chat</h4>
                    <button 
                        onClick={handleClose}
                        style={closeButtonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#e2e8f0";
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#f1f1f1";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        &times;
                    </button>
                </div>

                <div style={selectedCountStyle}>
                    <span>Selected users</span>
                    <span style={countBadgeStyle}>{chatIds.chats.length}</span>
                </div>

                <div style={tilesContainerStyle}>
                    {myMentees.map((mentee) => {
                        if (
                            chats.find((chat) =>
                                chat.users.find(
                                    (user) => user.user._id.toString() === mentee._id.toString()
                                )
                            ) === undefined
                        ) {
                            return (
                                <ChatTiles
                                    key={mentee._id}
                                    mentee={mentee}
                                    handleChange={handleChange}
                                />
                            );
                        }
                        return <div key={mentee._id}></div>;
                    })}
                </div>

                <div style={buttonContainerStyle}>
                    <button
                        onClick={handleSubmit}
                        disabled={chatIds.chats.length === 0}
                        style={createButtonStyle}
                        onMouseOver={(e) => {
                            if (chatIds.chats.length > 0) {
                                e.currentTarget.style.backgroundColor = "#3182ce";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }
                        }}
                        onMouseOut={(e) => {
                            if (chatIds.chats.length > 0) {
                                e.currentTarget.style.backgroundColor = "#4299e1";
                                e.currentTarget.style.transform = "translateY(0)";
                            }
                        }}
                    >
                        <Plus alt={false} myStyle={"h-5 w-5 mr-2"} /> Create Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
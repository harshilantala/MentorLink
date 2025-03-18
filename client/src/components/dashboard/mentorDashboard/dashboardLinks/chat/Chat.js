import React, { useEffect, useState, useRef } from "react";
import ChatAlt2Icon from "../../../../../assets/icons/ChatAlt2Icon";
import ChatSideBar from "./chatSideBar/ChatSideBar";
import ChatWindow from "./chatWindow/ChatWindow";
import ChatModal from "./chatModal/ChatModal";
import ModalOverlay from "../../../../modal/ModalOverlay";
import "./ChatStyles.css"; // We'll create this file for our custom animations

const Chat = () => {
    // api call to fetch all the chats
    useEffect(() => {
        if (localStorage.getItem("visible") !== null) {
            localStorage.removeItem("visible");
        }
    }, []);

    // state to control the modal show and dont show
    const [showModal, setShowModal] = useState(false);

    // state variable for storing the selected chat id for the selected chat
    const [selectedChat, setSelectedChat] = useState("");

    // state for showing the selected chat at top of chat window
    const [curChat, setCurChat] = useState({
        avatar: "",
        name: "",
    });

    // set selected set
    const setChatSelection = (id) => {
        setSelectedChat(id);
        localStorage.setItem("selectedChat", id);
    };

    // refs used for css transition to work for the modal and the overlay
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // Handle modal visibility with CSS transitions
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
            if (overlayRef.current) overlayRef.current.classList.add("overlay-visible");
            if (modalRef.current) {
                setTimeout(() => {
                    modalRef.current.classList.add("modal-visible");
                }, 50);
            }
        } else {
            document.body.style.overflow = "";
            if (overlayRef.current) overlayRef.current.classList.remove("overlay-visible");
            if (modalRef.current) modalRef.current.classList.remove("modal-visible");
        }
    }, [showModal]);

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) setShowModal(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className="chat-container">
            {showModal && (
                <>
                    <div ref={overlayRef} className="modal-overlay" onClick={() => setShowModal(false)}></div>
                    <div ref={modalRef} className="chat-modal">
                        <ChatModal setShowModal={setShowModal} />
                    </div>
                </>
            )}

            <div className="chat-header">
                <h2>Chat</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="create-chat-btn"
                >
                    <ChatAlt2Icon alt={false} myStyle={"icon"} />
                    <span>Create a chat</span>
                </button>
            </div>
            
            <div className="chat-content">
                <div className="sidebar-container">
                    <ChatSideBar 
                        setChatSelection={setChatSelection} 
                        setCurChat={setCurChat} 
                    />
                </div>
                <div className="chat-window-container">
                    <ChatWindow 
                        selectedChat={selectedChat} 
                        curChat={curChat} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;
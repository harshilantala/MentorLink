import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    clearMessages,
    createMessage,
    getMessages,
    getOlderMessages,
    updateNotification,
} from "../../../../../../actions/chat";
import { useSelector } from "react-redux";

import Loading from "../../../../../loading/Loading";
import ScrollToBottom from "./ScrollToBottom";
import Message from "./Message";
import { SocketContext } from "../../../../../../socket/socket";
import { authContext } from "../../../../../../contexts/authContext";

const ChatWindow = ({ selectedChat, curChat }) => {
    const socket = React.useContext(SocketContext);

    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    // accesing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);

    // accessing global store for the notification array to show notifications
    const { notifications } = useSelector((state) => state.chat);

    const dispatch = useDispatch();
    const history = useHistory();

    // div seletor for the div used as text input
    var contenteditable = document.querySelector("[contenteditable]");

    /* function to check if the custom input div is empty or not to control the send button disable status */
    const check = () => {
        if (isLoading) setDisable(true);
        else if (contenteditable.textContent.trim() === "") setDisable(true);
        else if (selectedChat === "" && localStorage.getItem("persistChat") === null)
            setDisable(true);
        else setDisable(false);

        var chatId = "";
        if (localStorage.getItem("persistChat") !== null) {
            chatId = JSON.parse(localStorage.getItem("persistChat")).chatId;
        }
        setMessage({
            content: contenteditable.textContent.trim(),
            chat: selectedChat !== "" ? selectedChat : chatId,
        });
    };

    // state for scroll to bottom element ----------------
    const [ele, setEle] = useState(null);

    useEffect(() => {
        const element = document.getElementById("scrollable");
        setEle(element);
    }, []);

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        if (ele.scrollTop < -100) {
            setVisible(true);
            localStorage.setItem("visible", true);
        } else {
            setVisible(false);
            localStorage.removeItem("visible");
            // notification removal for the move to bottom button when it is visible
            if (localStorage.getItem("selectedChat") !== null) {
                const sc = localStorage.getItem("selectedChat");
                let tmp = notifications.filter((id) => id !== sc);
                dispatch(updateNotification(tmp));
            }
        }
    };

    const scrollToBottom = () => {
        ele.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    // --------------------------------------------------------------

    // state to set the number of pages to fetch the old messages
    const [page, setPage] = useState(2);

    // api call to fetch all the messages for the selected chat
    useEffect(() => {
        setPage(2);
        if (selectedChat) {
            dispatch(getMessages(history, selectedChat, 1, setIsLoading));
            executeScroll();
            contenteditable !== null && contenteditable.focus();
        } else if (localStorage.getItem("persistChat") !== null) {
            const id = JSON.parse(localStorage.getItem("persistChat")).chatId;
            dispatch(getMessages(history, id, 1, setIsLoading));
            /* done this so that if selected chat is fetched from local storage
             then if somebody sends a message and i am on this chat then notification
             should not be shown */
            localStorage.setItem("selectedChat", id);
            executeScroll();
        } else {
            dispatch(clearMessages());
        }
        if (contenteditable !== null) {
            contenteditable.innerHTML = "";
            check();
        }
        setVisible(false);
    }, [selectedChat]);

    // state for custom placeholder in the input div
    const [placeHol, setPlaceHol] = useState("opacity-100");
    // state to set the disable status of the send button
    const [disable, setDisable] = useState(true);
    // state variable representing the message to be sent
    const [message, setMessage] = useState({
        content: "",
        chat: "",
    });

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // accessing state variable for the messages array
    const { messages } = useSelector((state) => state.chat);

    // function to send the text message
    const sendMessage = () => {
        dispatch(createMessage(history, message, socket, executeScroll));
        contenteditable.innerHTML = "";
        contenteditable.focus();
        check();
    };

    // function for hiding the custom placeholder
    const focusPlaceHol = () => {
        setPlaceHol("opacity-0");
    };

    // function for showing the custom placeholder
    const blurPlaceHol = () => {
        if (contenteditable.innerHTML === "" || contenteditable.innerHTML === "<br>") {
            setPlaceHol("opacity-100");
        }
    };

    // ref used so that message can be brought into view when sent or received
    const scrollMessage = useRef();

    // function to make scroll focus to the recent post posted
    const executeScroll = () => {
        scrollMessage?.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // state variable to control the loading for loding old messages
    const [oldMessageLoading, setOldMessageLoading] = useState(false);
    // load Older msg
    const loadOlderMessages = () => {
        console.log("load more msgs");
        setPage(page + 1);
        setOldMessageLoading(true);
        dispatch(getOlderMessages(history, selectedChat, page, setOldMessageLoading));
    };

    // Styles
    const containerStyle = {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        height: "100%",
        flexShrink: 0,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.3s ease"
    };

    const headerStyle = {
        width: "100%",
        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        padding: "16px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
    };

    const headerContentStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "16px",
        height: "100%",
    };

    const headerImageStyle = {
        height: "48px",
        width: "48px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid white"
    };

    const headerTextStyle = {
        color: "white",
        fontWeight: "600",
        fontSize: "1.1rem"
    };

    const messageContainerStyle = {
        width: "100%",
        height: "calc(80% - 16px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        padding: "20px",
        position: "relative",
        background: "#f9fafb"
    };

    const loadButtonStyle = {
        justifySelf: "center",
        padding: "8px 14px",
        borderRadius: "20px",
        fontSize: "0.75rem",
        backgroundColor: "#f3f4f6",
        color: "#6366f1",
        marginBottom: "12px",
        marginTop: "8px",
        fontWeight: "500",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)"
    };

    const loadButtonHoverStyle = {
        backgroundColor: "#e0e7ff",
        color: "#4338ca",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
    };

    const inputAreaStyle = {
        width: "100%",
        padding: "16px",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        marginTop: "auto"
    };

    const textInputContainerStyle = {
        width: "85%",
        position: "relative",
        flexGrow: 1
    };

    const textInputStyle = {
        width: "100%",
        padding: "14px 18px",
        borderRadius: "24px",
        maxHeight: "120px",
        backgroundColor: "white",
        outline: "none",
        fontSize: "0.95rem",
        breakWord: "break-word",
        overflowY: "auto",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
        transition: "border 0.2s ease, box-shadow 0.2s ease"
    };

    const textInputFocusStyle = {
        border: "1px solid #a5b4fc",
        boxShadow: "0 0 0 3px rgba(165, 180, 252, 0.2)"
    };

    const placeholderStyle = {
        color: "#9ca3af",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "20px",
        pointerEvents: "none",
        transition: "opacity 0.2s ease",
        fontSize: "0.95rem"
    };

    const sendButtonStyle = {
        backgroundColor: disable ? "#d1d5db" : "#4f46e5",
        padding: "12px",
        borderRadius: "50%",
        color: "white",
        border: "none",
        cursor: disable ? "not-allowed" : "pointer",
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        flexShrink: 0,
        boxShadow: disable ? "none" : "0 2px 5px rgba(79, 70, 229, 0.3)"
    };

    const sendButtonHoverStyle = {
        backgroundColor: disable ? "#d1d5db" : "#4338ca",
        transform: disable ? "none" : "translateY(-2px)",
        boxShadow: disable ? "none" : "0 4px 8px rgba(79, 70, 229, 0.4)"
    };

    const loadingContainerStyle = {
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb"
    };

    const [sendBtnHover, setSendBtnHover] = useState(false);
    const [loadBtnHover, setLoadBtnHover] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);

    return (
        <div style={containerStyle}>
            {localStorage.getItem("selectedChat") && (
                <div style={headerStyle}>
                    <div style={headerContentStyle}>
                        <img
                            src={
                                curChat?.avatar
                                  ? curChat.avatar
                                  : `https://api.dicebear.com/9.x/personas/svg?seed=${curChat?.name}`
                              }                                                         
                            alt="Profile"
                            style={headerImageStyle}
                        />
                        <h4 style={headerTextStyle}>{curChat.name}</h4>
                    </div>
                </div>
            )}
            {isLoading ? (
                <div style={loadingContainerStyle}>
                    <Loading myStyle={"w-8 h-8"} />
                </div>
            ) : (
                <div
                    id="scrollable"
                    onScroll={toggleVisible}
                    style={messageContainerStyle}
                >
                    <div ref={scrollMessage}></div>
                    {message.length !== 0 &&
                        messages
                            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                            .map((message) => (
                                <Message key={message._id} message={message} uid={uid} />
                            ))}
                    {messages.length !== 0 &&
                        (oldMessageLoading ? (
                            <Loading myStyle={"h-6 w-6 mb-2 mt-1"} />
                        ) : (
                            <button
                                onClick={loadOlderMessages}
                                title="Load message"
                                style={loadBtnHover ? {...loadButtonStyle, ...loadButtonHoverStyle} : loadButtonStyle}
                                onMouseEnter={() => setLoadBtnHover(true)}
                                onMouseLeave={() => setLoadBtnHover(false)}
                            >
                                Load previous messages
                            </button>
                        ))}
                </div>
            )}

            {visible && <ScrollToBottom scrollToBottom={scrollToBottom} />}

            {localStorage.getItem("selectedChat") && (
                <div style={inputAreaStyle}>
                    <div style={textInputContainerStyle}>
                        <div
                            onFocus={() => {
                                focusPlaceHol();
                                setInputFocus(true);
                            }}
                            onBlur={() => {
                                blurPlaceHol();
                                setInputFocus(false);
                            }}
                            onKeyUp={check}
                            contentEditable={true}
                            style={inputFocus ? {...textInputStyle, ...textInputFocusStyle} : textInputStyle}
                        ></div>
                        <h4
                            style={{
                                ...placeholderStyle,
                                opacity: placeHol === "opacity-100" ? 1 : 0
                            }}
                        >
                            Type something...
                        </h4>
                    </div>

                    <button
                        title="Send message"
                        style={sendBtnHover ? {...sendButtonStyle, ...sendButtonHoverStyle} : sendButtonStyle}
                        onClick={sendMessage}
                        disabled={disable}
                        onMouseEnter={() => !disable && setSendBtnHover(true)}
                        onMouseLeave={() => setSendBtnHover(false)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
import React, { useContext } from "react";
import DotIcon from "../../../../../../assets/icons/DotIcon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "../../../../../../contexts/authContext";

const SearchChatTile = ({
    chat,
    setChatSelection,
    thatUser,
    setCurChat,
    setTmpList,
    chats,
    setVal,
}) => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    const dispatch = useDispatch();

    // accessing global store for the notification array to show notifications
    const { notifications } = useSelector((state) => state.chat);

    // Generating default avatar if URL is empty
    const avatarUrl = thatUser?.user?.avatar?.url === ""
        ? `https://api.dicebear.com/9.x/personas/svg?seed=${thatUser?.user?.firstName}`
        : thatUser?.user?.avatar?.url;

    // Formatting user name
    const userName = `${thatUser?.user?.firstName} ${thatUser?.user?.middleName} ${thatUser?.user?.lastName}`;

    // Handle chat selection
    const handleChatSelect = () => {
        let id = chat._id.toString();
        let index = chats.findIndex((chat) => chat._id.toString() === id);

        if (notifications.includes(chat._id)) {
            let tmp = notifications.filter((id) => id !== chat._id.toString());
            dispatch({ type: "UPDATE_NOTIFICATION", tmp });
        }

        localStorage.setItem("0", index);
        setChatSelection(chat._id);
        localStorage.setItem(
            "persistChat",
            JSON.stringify({
                chatId: id,
                chatIndex: index,
            })
        );
        
        let thisChat = chat.users.find((user) => user.user._id !== uid);
        setCurChat({
            avatar: thisChat.user.avatar.url,
            name: `${thisChat.user.firstname} ${thisChat.user.middlename} ${thisChat.user.lastname}`,
        });
        
        setTmpList([]);
        setVal("");
    };

    const hasNotification = notifications.includes(chat._id);

    return (
        <div style={{
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%"
        }}>
            <div
                onClick={handleChatSelect}
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    width: "100%",
                    padding: "12px",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    transform: "translateY(0)",
                    position: "relative",
                    overflow: "hidden"
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
                }}
            >
                <div style={{
                    position: "relative",
                    marginRight: "12px"
                }}>
                    <img
                        style={{
                            height: "48px",
                            width: "48px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #eaeaea",
                            transition: "transform 0.3s ease",
                        }}
                        src={avatarUrl}
                        alt="Profile"
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    />
                    {hasNotification && (
                        <div style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            backgroundColor: "#10b981",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: "2px solid white",
                            animation: "pulse 1.5s infinite"
                        }} />
                    )}
                </div>
                
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "hidden",
                    paddingRight: "12px"
                }}>
                    <h3 style={{
                        margin: "0 0 4px 0",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>
                        {userName}
                    </h3>
                    <p style={{
                        margin: "0",
                        fontSize: "14px",
                        color: hasNotification ? "#10b981" : "#666",
                        fontWeight: hasNotification ? "500" : "400",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>
                        {chat?.latestMessage?.content || "No messages yet"}
                    </p>
                </div>
                
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    minWidth: "70px"
                }}>
                    <p style={{
                        margin: "0 0 4px 0",
                        fontSize: "12px",
                        color: "#888",
                        whiteSpace: "nowrap"
                    }}>
                        {chat?.latestMessage?.createdAt ? moment(chat.latestMessage.createdAt).calendar() : ""}
                    </p>
                    
                    {hasNotification && (
                        <span style={{
                            backgroundColor: "#10b981",
                            color: "white",
                            borderRadius: "12px",
                            padding: "2px 8px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "inline-block"
                        }}>
                            New
                        </span>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                @keyframes pulse {
                    0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
                    }
                    
                    70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
                    }
                    
                    100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchChatTile;
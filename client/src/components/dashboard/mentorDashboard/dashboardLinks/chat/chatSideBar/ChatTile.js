import React, { useContext, useState } from "react";
import DotIcon from "../../../../../../assets/icons/DotIcon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "../../../../../../contexts/authContext";

const ChatTile = ({
  chat,
  index,
  setChatSelection,
  thatUser,
  setCurChat,
  setTmpList,
}) => {
  const { uid } = useContext(authContext);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  // accessing global store for the notification array to show notifications
  const { notifications } = useSelector((state) => state.chat);

  // Check if this chat is the currently selected one
  const isSelected =
    localStorage.getItem("0") !== null &&
    JSON.parse(localStorage.getItem("0")) === index;

  // Get initials for avatar fallback
  const getInitials = () => {
    const firstName = thatUser?.user?.firstName || "";
    const lastName = thatUser?.user?.lastName || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Truncate message if too long
  const truncateMessage = (message, maxLength = 28) => {
    if (!message) return "";
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  // Handle click on chat tile
  const handleChatSelection = () => {
    localStorage.setItem("0", index);
    setChatSelection(chat._id);

    if (notifications.includes(chat._id)) {
      let tmp = notifications.filter((id) => id !== chat._id.toString());
      dispatch({ type: "UPDATE_NOTIFICATION", tmp });
    }

    localStorage.setItem(
      "persistChat",
      JSON.stringify({
        chatId: chat._id,
        chatIndex: index,
      })
    );

    let thisChat = chat.users.find((user) => user.user._id !== uid);
    setCurChat({
      avatar: thisChat.user.avatar.url,
      name: `${thisChat.user.firstName} ${thisChat.user.middleName} ${thisChat.user.lastName}`,
    });

    setTmpList([]);
  };

  // Styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      marginBottom: "12px",
    },
    chatTile: {
      display: "grid",
      gridTemplateColumns: "48px 1fr auto",
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: isSelected
        ? "#eef2ff"
        : isHovered
        ? "#f3f4f6"
        : "transparent",
      border: isSelected ? "1px solid #dbeafe" : "1px solid transparent",
    },
    avatar: {
      height: "48px",
      width: "48px",
      borderRadius: "50%",
      objectFit: "cover",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    avatarFallback: {
      height: "48px",
      width: "48px",
      borderRadius: "50%",
      backgroundColor: "#e0e7ff",
      color: "#4f46e5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "600",
      fontSize: "16px",
    },
    contentContainer: {
      display: "flex",
      width: "100%",
      marginLeft: "12px",
      flexDirection: "column",
      justifyContent: "space-evenly",
      overflow: "hidden",
    },
    name: {
      fontSize: "15px",
      fontWeight: "500",
      color: "#1f2937",
      margin: "0 0 4px 0",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    message: {
      fontSize: "13px",
      color: isSelected ? "#4b5563" : "#6b7280",
      margin: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontWeight: notifications.includes(chat._id) ? "500" : "400",
    },
    metaContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingLeft: "8px",
    },
    time: {
      fontSize: "11px",
      color: "#6b7280",
      margin: "0 0 6px 0",
    },
    divider: {
      width: "94%",
      height: "1px",
      backgroundColor: "#e5e7eb",
      marginTop: "4px",
    },
    notificationDot: {
      height: "8px",
      width: "8px",
      backgroundColor: "#10b981",
      borderRadius: "50%",
      display: notifications.includes(chat._id) ? "block" : "none",
    },
  };

  return (
    <div style={styles.container}>
      <div
        onClick={handleChatSelection}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={styles.chatTile}
      >
          <img
            style={styles.avatar}
            src={
                thatUser?.user?.avatar?.url
                  ? thatUser.user.avatar.url
                  : `https://api.dicebear.com/9.x/personas/svg?seed=${thatUser?.user?.firstName || "default"}`
              }                           
            alt={`${thatUser?.user?.firstName || ""}'s avatar`}
          />
        
        <div style={styles.contentContainer}>
          <h3 style={styles.name}>
            {`${thatUser?.user?.firstName || ""} ${
              thatUser?.user?.middleName || ""
            } ${thatUser?.user?.lastName || ""}`.trim()}
          </h3>
          <p style={styles.message}>
            {truncateMessage(chat?.latestMessage?.content)}
          </p>
        </div>

        <div style={styles.metaContainer}>
          <span style={styles.time}>
            {chat?.latestMessage?.createdAt
              ? moment(chat.latestMessage.createdAt).calendar()
              : ""}
          </span>
          <div style={styles.notificationDot}></div>
        </div>
      </div>
      <div style={styles.divider}></div>
    </div>
  );
};

export default ChatTile;

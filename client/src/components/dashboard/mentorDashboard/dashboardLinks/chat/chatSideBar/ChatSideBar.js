import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "../../../../../../assets/icons/SearchIcon";
import ChatTile from "./ChatTile";
import { useSelector } from "react-redux";
import SearchChatTile from "./SearchChatTile";
import { authContext } from "../../../../../../contexts/authContext";
import "./ChatSideBar.css"; // We'll create this CSS file for sidebar-specific styles

const ChatSideBar = ({ setChatSelection, setCurChat }) => {
    // getting uid of the logged in user
    const { uid } = useContext(authContext);

    // accesing global state to fetch the chats
    const { chats } = useSelector((state) => state.chat);

    // use effect used to persists the chat side bar selection and the chat window chat top bar data
    useEffect(() => {
        if (localStorage.getItem("persistChat") !== null) {
            const index = JSON.parse(localStorage.getItem("persistChat")).chatIndex;
            localStorage.setItem("0", index);

            const chatId = JSON.parse(localStorage.getItem("persistChat")).chatId;
            const chats = JSON.parse(localStorage.getItem("chats"));
            let thatChat = chats.find((chat) => chat._id.toString() === chatId.toString());
            let thisChat = thatChat.users.find((user) => user.user._id !== uid);
            setCurChat({
                avatar: thisChat.user.avatar.url,
                name: `${thisChat.user.firstName} ${thisChat.user.middleName} ${thisChat.user.lastName}`,
            });
        }
    }, []);

    // state variable to show the temporary search list
    const [tmpList, setTmpList] = useState([]);
    // state varibale to reset the search query in the input field
    const [val, setVal] = useState("");
    // State for search input focus
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // function to perform search when query typed in search bar
    const handleSearch = (e) => {
        let val = e.target.value.toLowerCase();
        let tmp = [];

        if (val !== "") {
            chats.forEach(chat => {
                const matchedUser = chat.users.find(user => {
                    const firstName = user.user.firstName?.toLowerCase() || "";
                    const middleName = user.user.middleName?.toLowerCase() || "";
                    const lastName = user.user.lastName?.toLowerCase() || "";
                    
                    return firstName.includes(val) || 
                           middleName.includes(val) || 
                           lastName.includes(val);
                });
                
                if (matchedUser && !tmp.some(c => c._id === chat._id)) {
                    tmp.push(chat);
                }
            });
        }

        setTmpList(tmp);
        setVal(val);
    };

    // Empty state when no chats are available
    const renderEmptyState = () => (
        <div className="empty-chats-state">
            <div className="empty-chats-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <h3>No conversations yet</h3>
            <p>Start a new chat to begin messaging</p>
        </div>
    );

    return (
        <div className="sidebar">
            <div className="search-container">
                <div className={`search-input-wrapper ${isSearchFocused ? 'focused' : ''}`}>
                    <div className="search-icon">
                        <SearchIcon myStyle={"icon"} alt={true} />
                    </div>
                    <input
                        type="text"
                        onChange={handleSearch}
                        className="search-input"
                        placeholder="Search chat..."
                        value={val}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {val && (
                        <button 
                            className="clear-search"
                            onClick={() => {
                                setVal("");
                                setTmpList([]);
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="x-icon">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="chats-container">
                {chats?.length === 0 ? (
                    renderEmptyState()
                ) : tmpList.length === 0 ? (
                    chats?.map((chat, index) => {
                        if (
                            chat !== undefined &&
                            chat.users.find((user) => user.user._id !== uid)
                        ) {
                            let thatUser = chat.users.find((user) => user.user._id !== uid);
                            return (
                                <ChatTile
                                    key={chat._id}
                                    chat={chat}
                                    index={index}
                                    setChatSelection={setChatSelection}
                                    thatUser={thatUser}
                                    setCurChat={setCurChat}
                                    setTmpList={setTmpList}
                                />
                            );
                        }
                        return null;
                    })
                ) : (
                    <>
                        <div className="search-results-header">
                            <span>Search Results</span>
                            <button 
                                className="clear-results"
                                onClick={() => {
                                    setVal("");
                                    setTmpList([]);
                                }}
                            >
                                Clear
                            </button>
                        </div>
                        {tmpList?.map((chat) => {
                            if (
                                chat !== undefined &&
                                chat.users.find((user) => user.user._id !== uid)
                            ) {
                                let thatUser = chat.users.find((user) => user.user._id !== uid);
                                return (
                                    <SearchChatTile
                                        key={chat._id}
                                        chat={chat}
                                        setChatSelection={setChatSelection}
                                        thatUser={thatUser}
                                        setCurChat={setCurChat}
                                        setTmpList={setTmpList}
                                        chats={chats}
                                        setVal={setVal}
                                    />
                                );
                            }
                            return null;
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatSideBar;
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
// import {
//     getAllPosts,
//     getOlderPosts,
//     submitComment,
//     submitPost,
//     updatePost,
// } from "../../../../../actions/post";

// import SinglePost from "./singlePost/SinglePost";
// import PaperAirplaneIcon from "../../../../../assets/icons/PaperAirplaneIcon";
// import { CSSTransition } from "react-transition-group";
// import ModalOverlay from "../../../../modal/ModalOverlay";
// import PostEditModal from "./postModals/PostEditModal";
// import PostDeleteModal from "./postModals/PostDeleteModal";
// import SingleComment from "./singleComment/SingleComment";
// import CommentDeleteModal from "./postModals/CommentDeleteModal";
// import Loading from "../../../../loading/Loading";
// import RichEditor from "../../../../richEditor/RichEditor";

// const Post = ({ socket, streamUpdated, setStreamUpdated }) => {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [isHidden, setIsHidden] = useState(true);
//     // state variable to show viewing pill on the selected post
//     const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
//     // state to store the selected post to edit
//     const [selectedPost, setSelectedPost] = useState(null);
//     // state variable to get the selected comment
//     const [selectedComment, setSelectedComment] = useState(null);
//     // state to set the submit button disable
//     const [disablePost, setDisablePost] = useState(true);

//     // states for loading
//     const [postLoading, setPostLoading] = useState(false);
//     const [oldPostLoading, setOldPostLoading] = useState(false);
//     const [commentLoading, setCommentLoading] = useState(false);

//     // state to control the modal show and dont show
//     const [showOverlay, setShowOverlay] = useState(false);
//     const [showPostEditModal, setShowPostEditModal] = useState(false);
//     const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
//     const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);

//     // refs used for css transition to work for the modal and the overlay
//     const postEditModalRef = useRef(null);
//     const postDeleteModalRef = useRef(null);
//     const commentDeleteModalRef = useRef(null);
//     const overlayRef = useRef(null);

//     useEffect(() => {
//         dispatch(getAllPosts(history, 1));
//     }, [dispatch, history]);

//     // fetching posts from the global state
//     const { posts } = useSelector((state) => state.post);
//     // getting all comments for a post from the global store after api call
//     const { comments } = useSelector((state) => state.post);

//     console.log("posts", posts);

//     // state variable to store the post body
//     const [postBody, setPostBody] = useState({
//         body: "",
//         commentEnabled: true,
//     });
//     // state variable to store the comment body
//     const [commentBody, setCommentBody] = useState({
//         body: "",
//     });

//     // function to make scroll focus to the recent post posted
//     const scrollPost = useRef();
//     const executeScroll = () => {
//         scrollPost?.current?.scrollIntoView({
//             behavior: "smooth",
//         });
//     };

//     // updating the state variable for post body
//     const handleChange = (content) => {
//         let text = content.replace(/<[^>]+>/g, ""); // regex to convert html to plain text
//         if (text === "") setDisablePost(true);
//         else setDisablePost(false);
//         setPostBody((prevState) => ({ ...prevState, body: content }));
//     };

//     // fucntion to set the comment disable state
//     const handleToggleCommentDisable = () => {
//         setPostBody((prevState) => ({
//             ...prevState,
//             commentEnabled: !prevState.commentEnabled,
//         }));
//     };

//     console.log(postBody);

//     // function to handle the post submission
//     const handlePostSubmit = (e, postId, postContent) => {
//         e.preventDefault();
//         if (!postId) {
//             dispatch(submitPost(history, postBody, socket, executeScroll));
//             setPostBody({
//                 body: "",
//                 commentEnabled: true,
//             });
//         } else {
//             dispatch(updatePost(history, postId, postContent));
//         }
//         // setSelectedPost(null);
//         // setSelectedPostIndex(-1);
//     };

//     console.log("selected post", selectedPost);
//     console.log("selected index", selectedPostIndex);

//     // function to update the state for the comment body
//     const handleCommentChange = (e) => {
//         setCommentBody({ ...commentBody, body: e.target.value });
//     };

//     // function to handle the comment submission
//     const handleCommentSubmit = (e) => {
//         e.preventDefault();
//         dispatch(submitComment(history, commentBody, executeScrollToComment, selectedPost._id));
//         setCommentBody({
//             body: "",
//         });
//     };

//     // ref to focus the comment typing box when reply is clicked
//     const focusInput = useRef();

//     // function to make scroll focus to the recent comment posted
//     const scrollComment = useRef();
//     const executeScrollToComment = () => {
//         scrollComment?.current?.scrollIntoView({
//             behavior: "smooth",
//         });
//     };

//     // function to focus the comment input box when reply is clicked
//     const executeFocusInput = () => {
//         setTimeout(() => {
//             focusInput?.current?.focus();
//         }, 10);
//     };

//     // state to set the number of pages to fetch the old messages
//     const [page, setPage] = useState(2);

//     // load Older posts
//     const loadOlderPosts = () => {
//         console.log("load more msgs");
//         setOldPostLoading(true);
//         setPage(page + 1);
//         dispatch(getOlderPosts(history, page, setOldPostLoading));
//     };

//     return (
//         <div className="w-full h-full grid grid-cols-12 relative pl-2">
//             <CSSTransition
//                 nodeRef={overlayRef}
//                 in={showOverlay}
//                 timeout={300}
//                 classNames="overlay"
//                 unmountOnExit
//             >
//                 <ModalOverlay nodeRef={overlayRef} />
//             </CSSTransition>
//             <CSSTransition
//                 nodeRef={postEditModalRef}
//                 in={showPostEditModal}
//                 timeout={300}
//                 classNames="modal"
//                 unmountOnExit
//             >
//                 <PostEditModal
//                     nodeRef={postEditModalRef}
//                     setShowOverlay={setShowOverlay}
//                     setShowPostEditModal={setShowPostEditModal}
//                     selectedPost={selectedPost}
//                     handlePostSubmit={handlePostSubmit}
//                 />
//             </CSSTransition>
//             <CSSTransition
//                 nodeRef={postDeleteModalRef}
//                 in={showPostDeleteModal}
//                 timeout={300}
//                 classNames="modal"
//                 unmountOnExit
//             >
//                 <PostDeleteModal
//                     nodeRef={postDeleteModalRef}
//                     setShowOverlay={setShowOverlay}
//                     setShowPostDeleteModal={setShowPostDeleteModal}
//                     id={selectedPost?._id}
//                     setSelectedPost={setSelectedPost}
//                     setSelectedPostIndex={setSelectedPostIndex}
//                 />
//             </CSSTransition>
//             <CSSTransition
//                 nodeRef={commentDeleteModalRef}
//                 in={showCommentDeleteModal}
//                 timeout={300}
//                 classNames="modal"
//                 unmountOnExit
//             >
//                 <CommentDeleteModal
//                     nodeRef={commentDeleteModalRef}
//                     setShowOverlay={setShowOverlay}
//                     setShowCommentDeleteModal={setShowCommentDeleteModal}
//                     id={selectedComment?._id}
//                 />
//             </CSSTransition>
//             <div className="col-span-8 border-r-2 border-gray-200 flex flex-col overflow-y-auto pt-2 pr-2 relative">
//                 <button
//                     onClick={() => {
//                         setPostLoading(true);
//                         setStreamUpdated(false);
//                         dispatch(getAllPosts(history, 1, setPostLoading));
//                         setSelectedPost(null);
//                         setSelectedPostIndex(-1);
//                     }}
//                     className={`py-1 px-3 bg-white rounded-md text-blue-600 shadow-m32 hover:shadow-md transition-all flex items-center justify-between absolute left-1/2 transform -translate-x-1/2 -top-10 ${
//                         streamUpdated ? "translate-y-24" : ""
//                     } text-sm`}
//                 >
//                     Stream updated
//                 </button>
//                 <div
//                     className={`h-3/4 overflow-y-auto mb-3 pr-2 flex flex-col-reverse underlineLink ${
//                         postLoading && "justify-center"
//                     }`}
//                 >
//                     <div ref={scrollPost}></div>
//                     {postLoading ? (
//                         <div className="flex items-center justify-center">
//                             <Loading width="40px" height="40px" />
//                         </div>
//                     ) : (
//                         posts
//                             .sort((a, b) => {
//                                 return a.postData.createdAt < b.postData.createdAt ? 1 : -1;
//                             })
//                             .map((post, index) => {
//                                 return (
//                                     <SinglePost
//                                         key={post.postData._id}
//                                         post={post.postData}
//                                         author={post.authorData}
//                                         setShowOverlay={setShowOverlay}
//                                         setShowPostEditModal={setShowPostEditModal}
//                                         setShowPostDeleteModal={setShowPostDeleteModal}
//                                         setSelectedPost={setSelectedPost}
//                                         setIsHidden={setIsHidden}
//                                         setSelectedPostIndex={setSelectedPostIndex}
//                                         selectedPostIndex={selectedPostIndex}
//                                         executeFocusInput={executeFocusInput}
//                                         setCommentLoading={setCommentLoading}
//                                         index={index}
//                                     />
//                                 );
//                             })
//                     )}
//                     {!postLoading ? (
//                         oldPostLoading ? (
//                             <div className="w-full">
//                                 <Loading alt={true} />
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={loadOlderPosts}
//                                 title="Load message"
//                                 className={`justify-self-center p-1.5 rounded-md disabled:opacity-50 text-gray-400 hover:text-gray-700 text-xs transition-all mb-1`}
//                             >
//                                 Load previous post
//                             </button>
//                         )
//                     ) : (
//                         <div></div>
//                     )}
//                 </div>
//                 <form
//                     className="h-1/4 relative border border-solid border-b border-gray-200 flex flex-col items-center justify-start"
//                     onSubmit={handlePostSubmit}
//                 >
//                     <div className="w-full flex items-center justify-end p-1">
//                         <span className="flex items-center justify-between gap-x-2 mr-5 cursor-pointer text-sm bg-gray-200 py-1.5 px-2 rounded-md">
//                             <input
//                                 className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer focus:ring-0 focus:ring-offset-0"
//                                 type="checkbox"
//                                 id="disableComment"
//                                 onChange={handleToggleCommentDisable}
//                                 checked={!postBody.commentEnabled}
//                             />
//                             <label className="cursor-pointer" htmlFor="disableComment">
//                                 Disable comments
//                             </label>
//                         </span>

//                         <button
//                             disabled={disablePost}
//                             type="submit"
//                             title="Submit post"
//                             className="py-1 px-2 bg-blue-600 rounded-md text-white disabled:opacity-50 hover:bg-blue-800 transition-all flex items-center justify-between"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                     <RichEditor
//                         contents={postBody.body}
//                         handleChange={handleChange}
//                         isAutofocus={false}
//                         minHeight={"12vh"}
//                         height={"100%"}
//                     />
//                 </form>
//             </div>
//             <div className="col-span-4 p-4 flex flex-col justify-between">
//                 <div>
//                     <h3 className="font-bold mb-5">Comments</h3>
//                     <div className="h-650 overflow-y-auto flex flex-col">
//                         {selectedPostIndex !== -1 ? (
//                             commentLoading ? (
//                                 <Loading myStyle={"w-7 h-7"} />
//                             ) : (
//                                 comments.map((comment) => {
//                                     return (
//                                         <SingleComment
//                                             key={comment.commentData._id}
//                                             author={comment.authorData}
//                                             comment={comment.commentData}
//                                             setShowCommentDeleteModal={setShowCommentDeleteModal}
//                                             setShowOverlay={setShowOverlay}
//                                             setSelectedComment={setSelectedComment}
//                                         />
//                                     );
//                                 })
//                             )
//                         ) : (
//                             <div></div>
//                         )}
//                         <div ref={scrollComment}></div>
//                     </div>
//                 </div>

//                 {isHidden || (
//                     <form className="group" onSubmit={handleCommentSubmit}>
//                         <div className="grid grid-cols-12 mt-4 border border-gray-400 rounded-full focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent">
//                             <input
//                                 value={commentBody.body}
//                                 ref={focusInput}
//                                 onChange={handleCommentChange}
//                                 name="comment"
//                                 type="text"
//                                 placeholder="Type a comment..."
//                                 className="col-span-10 bg-transparent outline-none border-none focus:ring-0 pl-5"
//                             />
//                             <button
//                                 type="submit"
//                                 title="Submit comment"
//                                 disabled={commentBody.body === "" ? true : false}
//                                 className="w-12 h-12 ml-3 col-start-11 col-span-2 rounded-full flex items-center justify-center place-self-center text-blue-600 disabled:opacity-50"
//                             >
//                                 <PaperAirplaneIcon
//                                     alt={false}
//                                     myStyle={"h-6 w-6 transform rotate-90"}
//                                 />
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Post;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    getAllPosts,
    getOlderPosts,
    submitComment,
    submitPost,
    updatePost,
} from "../../../../../actions/post";
import { MessageCircle, Send, RefreshCw, X, Edit, Trash2, ThumbsUp, MoreHorizontal } from 'lucide-react';
import SinglePost from "./singlePost/SinglePost";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../modal/ModalOverlay";
import PostEditModal from "./postModals/PostEditModal";
import PostDeleteModal from "./postModals/PostDeleteModal";
import SingleComment from "./singleComment/SingleComment";
import CommentDeleteModal from "./postModals/CommentDeleteModal";
import Loading from "../../../../loading/Loading";
import RichEditor from "../../../../richEditor/RichEditor";
import SimpleEditor from "../../../../richEditor/SimpleEditor";

// Add this CSS to your stylesheet or create a new one
const cssStyles = `
/* Global Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(30px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
  70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}

/* Modern Card Styling */
.modern-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: slideUp 0.4s ease forwards;
}

.modern-card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Button Styles */
.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  background: linear-gradient(135deg, #a5b4fc, #93c5fd);
  cursor: not-allowed;
}

.btn-icon {
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background-color: rgba(243, 244, 246, 1);
}

/* Input Styles */
.modern-input {
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.modern-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}

/* Comment Input Animation */
.comment-input-container {
  position: sticky;
  bottom: 0;
  z-index: 10;
  background-color: white;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.comment-input-container.hidden {
  max-height: 0;
  opacity: 0;
}

.comment-input-container.visible {
  max-height: 60px;
  opacity: 1;
}

/* Stream update notification */
.stream-update-notification {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.3s ease;
}

.stream-update-notification.visible {
  transform: translateY(0);
  opacity: 1;
}

.stream-update-notification.hidden {
  transform: translateY(-100px);
  opacity: 0;
}

/* Post enter/exit animations */
.post-enter {
  opacity: 0;
  transform: translateY(20px);
}

.post-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.post-exit {
  opacity: 1;
}

.post-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Comment animations */
.comment-enter {
  opacity: 0;
  transform: translateX(20px);
}

.comment-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.comment-exit {
  opacity: 1;
}

.comment-exit-active {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Dark mode support */
.dark-mode .modern-card {
  background-color: #1f2937;
  color: #e5e7eb;
}

.dark-mode .btn-primary {
  background: linear-gradient(135deg, #6366f1, #3b82f6);
}

/* Layout improvements */
.main-layout {
  display: grid;
  height: 100%;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  background: linear-gradient(to bottom right, #EFF6FF, #EEF2FF);
  transition: background-color 0.3s ease;
  overflow-y: auto; 
  overflow-x: hidden;
}

.post-column {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin: 1rem;
  max-height: calc(100vh - 2rem);
  overflow: hidden;
}

.comment-column {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin: 1rem;
  margin-left: 0;
  max-height: calc(100vh - 2rem);
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
  padding: 1rem;
  max-height: calc(100vh - 200px);
}

.scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

/* Header sections */
.section-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  flex-shrink: 0;
}

/* Footer sections */
.section-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: white;
}
`;

const Post = ({ socket, streamUpdated, setStreamUpdated }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isHidden, setIsHidden] = useState(true);
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [disablePost, setDisablePost] = useState(true);
    const [postLoading, setPostLoading] = useState(false);
    const [oldPostLoading, setOldPostLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPostEditModal, setShowPostEditModal] = useState(false);
    const [showPostDeleteModal, setShowPostDeleteModal] = useState(false);
    const [showCommentDeleteModal, setShowCommentDeleteModal] = useState(false);
    
    // Add a state for animation classes
    const [animateNewPost, setAnimateNewPost] = useState(false);

    const postEditModalRef = useRef(null);
    const postDeleteModalRef = useRef(null);
    const commentDeleteModalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        // Inject our CSS styles
        const styleEl = document.createElement('style');
        styleEl.textContent = cssStyles;
        document.head.appendChild(styleEl);
        
        // Fetch posts
        dispatch(getAllPosts(history, 1));
        
        return () => {
            // Clean up our injected styles when component unmounts
            document.head.removeChild(styleEl);
        };
    }, [dispatch, history]);

    const { posts } = useSelector((state) => state.post);
    const { comments } = useSelector((state) => state.post);

    const [postBody, setPostBody] = useState({
        body: "",
        commentEnabled: true,
    });

    const [commentBody, setCommentBody] = useState({
        body: "",
    });

    const scrollPost = useRef();
    const executeScroll = () => {
        scrollPost?.current?.scrollIntoView({
            behavior: "smooth",
        });
        
        // Trigger animation for new post
        setAnimateNewPost(true);
        setTimeout(() => setAnimateNewPost(false), 1000);
    };

    const handleChange = (content) => {
        let text = content.replace(/<[^>]+>/g, "");
        if (text === "") setDisablePost(true);
        else setDisablePost(false);
        setPostBody((prevState) => ({ ...prevState, body: content }));
    };

    const handleToggleCommentDisable = () => {
        setPostBody((prevState) => ({
            ...prevState,
            commentEnabled: !prevState.commentEnabled,
        }));
    };

    const [message, setMessage] = useState('');

    const handlePostSubmit = (e, postId, postContent) => {
        e.preventDefault(); // Prevent form submission default behavior
        
        // Save the current scroll position
        const scrollPosition = window.scrollY;
        
        if (!postId) {
            // Replace executeScroll with a function that doesn't scroll or scrolls where you want
            const noScroll = () => {
                // Either do nothing, or set a specific scroll position
                window.scrollTo(0, scrollPosition);
            };
            
            dispatch(submitPost(history, postBody, socket, noScroll));
            setPostBody({
                body: "",
                commentEnabled: true,
            });
        } else {
            dispatch(updatePost(history, postId, postContent));
            
            // After updating, restore scroll position
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 100);
        }
    };

    const handleCommentChange = (e) => {
        setCommentBody({ ...commentBody, body: e.target.value });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(history, commentBody, executeScrollToComment, selectedPost._id));
        setCommentBody({
            body: "",
        });
    };

    const focusInput = useRef();
    const scrollComment = useRef();
    
    const executeScrollToComment = () => {
        // Add a small delay to ensure DOM updates first
        setTimeout(() => {
            // Use scrollIntoView with different options
            scrollComment?.current?.scrollIntoView({
                behavior: "smooth",
                block: "center", // This centers the element instead of putting it at the top
            });
        }, 100);
    };

    const executeFocusInput = () => {
        // Add a small delay to ensure DOM updates first
        setTimeout(() => {
            focusInput?.current?.focus();
            
            // Allow scrolling back up after focusing
            setTimeout(() => {
                document.body.style.overflow = "auto";
                document.documentElement.style.overflow = "auto";
            }, 300);
        }, 100);
    };

    const handleReplyClick = (postId) => {
        setSelectedPostIndex(posts.findIndex(p => p.postData._id === postId));
        setSelectedPost(posts.find(p => p.postData._id === postId)?.postData);
        setIsHidden(false);
        
        // Important: Don't immediately scroll to the comment input
        // Instead, wait for a user interaction or set a much gentler scroll
        setTimeout(() => {
            executeFocusInput();
            
            // Scroll just enough to show the input field without losing context
            window.scrollTo({
                top: window.scrollY + 200,
                behavior: 'smooth'
            });
        }, 300);
    };

    const [page, setPage] = useState(2);

    const loadOlderPosts = () => {
        setOldPostLoading(true);
        setPage(page + 1);
        dispatch(getOlderPosts(history, page, setOldPostLoading));
    };

    return (
        <div className="main-layout">
            <CSSTransition nodeRef={overlayRef} in={showOverlay} timeout={300} classNames="overlay" unmountOnExit>
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            
            <CSSTransition nodeRef={postEditModalRef} in={showPostEditModal} timeout={300} classNames="modal" unmountOnExit>
                <PostEditModal
                    nodeRef={postEditModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowPostEditModal={setShowPostEditModal}
                    selectedPost={selectedPost}
                    handlePostSubmit={handlePostSubmit}
                />
            </CSSTransition>
            
            <CSSTransition nodeRef={postDeleteModalRef} in={showPostDeleteModal} timeout={300} classNames="modal" unmountOnExit>
                <PostDeleteModal
                    nodeRef={postDeleteModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowPostDeleteModal={setShowPostDeleteModal}
                    id={selectedPost?._id}
                    setSelectedPost={setSelectedPost}
                    setSelectedPostIndex={setSelectedPostIndex}
                />
            </CSSTransition>
            
            <CSSTransition nodeRef={commentDeleteModalRef} in={showCommentDeleteModal} timeout={300} classNames="modal" unmountOnExit>
                <CommentDeleteModal
                    nodeRef={commentDeleteModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowCommentDeleteModal={setShowCommentDeleteModal}
                    id={selectedComment?._id}
                />
            </CSSTransition>

            {/* Stream Update Button */}
            <button
                onClick={() => {
                    setPostLoading(true);
                    setStreamUpdated(false);
                    dispatch(getAllPosts(history, 1, setPostLoading));
                    setSelectedPost(null);
                    setSelectedPostIndex(-1);
                }}
                className={`stream-update-notification fixed z-10 py-2 px-4 text-white rounded-full shadow-lg flex items-center gap-2 left-1/2 transform -translate-x-1/2 top-6 btn-primary ${
                    streamUpdated ? "visible" : "hidden"
                } text-sm`}
            >
                <RefreshCw className="w-4 h-4" />
                New updates available
            </button>

            {/* Main Posts Section */}
            <div className="post-column">
                <div className="section-header">
                    <h2 className="text-lg font-semibold">Posts</h2>
                </div>

                {/* Posts List */}
                <div className="scrollable-content">
                    <div ref={scrollPost}></div>
                    {postLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loading width="40px" height="40px" />
                        </div>
                    ) : (
                        <>
                            {posts
                                .sort((a, b) => (a.postData.createdAt < b.postData.createdAt ? 1 : -1))
                                .map((post, index) => (
                                    <div 
                                        key={post.postData._id} 
                                        className={`modern-card mb-4 overflow-hidden ${index === 0 && animateNewPost ? 'animate-pulse' : ''}`}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            opacity: 0,
                                            animation: `slideUp 0.3s ease forwards ${index * 0.05}s`
                                        }}
                                    >
                                        <SinglePost
                                            post={post.postData}
                                            author={post.authorData}
                                            setShowOverlay={setShowOverlay}
                                            setShowPostEditModal={setShowPostEditModal}
                                            setShowPostDeleteModal={setShowPostDeleteModal}
                                            setSelectedPost={setSelectedPost}
                                            setIsHidden={setIsHidden}
                                            setSelectedPostIndex={setSelectedPostIndex}
                                            selectedPostIndex={selectedPostIndex}
                                            executeFocusInput={executeFocusInput}
                                            setCommentLoading={setCommentLoading}
                                            index={index}
                                        />
                                    </div>
                                ))}
                            
                            {!postLoading && (
                                <div className="flex justify-center py-4">
                                    {oldPostLoading ? (
                                        <Loading alt={true} />
                                    ) : (
                                        <button
                                            onClick={loadOlderPosts}
                                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
                                        >
                                            Load previous posts
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Post Creation Form */}
                <div className="section-footer">
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center space-x-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    onChange={handleToggleCommentDisable}
                                    checked={!postBody.commentEnabled}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Disable comments</span>
                            </label>
                            <button
                                disabled={disablePost}
                                type="submit"
                                className="btn-primary flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Post
                            </button>
                        </div>
                        <div className="min-h-[100px]">
                            <RichEditor
                                contents={postBody.body}
                                handleChange={handleChange}
                                isAutofocus={false}
                                minHeight="120px"
                                height="90%"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Comments Section */}
            <div className="comment-column">
                <div className="section-header">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Comments
                    </h3>
                </div>

                <div className="scrollable-content">
                    <div ref={scrollComment}></div>
                    {selectedPostIndex !== -1 ? (
                        commentLoading ? (
                            <div className="flex justify-center">
                                <Loading myStyle="w-7 h-7" />
                            </div>
                        ) : (
                            <>
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <div 
                                            key={comment.commentData._id}
                                            className="modern-card mb-3 p-4"
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                                opacity: 0,
                                                animation: `slideInRight 0.3s ease forwards ${index * 0.05}s`
                                            }}
                                        >
                                            <SingleComment
                                                author={comment.authorData}
                                                comment={comment.commentData}
                                                setShowCommentDeleteModal={setShowCommentDeleteModal}
                                                setShowOverlay={setShowOverlay}
                                                setSelectedComment={setSelectedComment}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No comments yet. Be the first to comment!
                                    </div>
                                )}
                            </>
                        )
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Select a post to view comments
                        </div>
                    )}
                </div>

                {/* Comment Input */}
                <div className={`section-footer comment-input-container ${isHidden ? 'hidden' : 'visible'}`}>
                    <form onSubmit={handleCommentSubmit} className="w-full">
                        <div className="flex items-center gap-2">
                            <input
                                value={commentBody.body}
                                ref={focusInput}
                                onChange={handleCommentChange}
                                placeholder="Write a comment..."
                                className="modern-input flex-1"
                            />
                            <button
                                type="submit"
                                disabled={!commentBody.body}
                                className="btn-primary p-2 rounded-full"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Post;
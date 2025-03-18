import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  adminBanUser,
  adminGetInteractions,
  adminGetMentorMentee,
} from "../../../../../actions/admin";
import moment from "moment";
import { Chip, Tooltip, Avatar } from "@mui/material";
import {
  Group,
  Person,
  Forum,
  Check,
  Block,
  Link as LinkIcon,
  CalendarMonth,
  Comment,
} from "@mui/icons-material";
// Import the CSS file
import "./adminInteractions.css";

const AdminInteractions = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [selected, setSelected] = useState("mentors");
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  // accessing global state for fetching the list of mentors and mentees
  const {
    mentorMenteeDetails: { mentors, students },
  } = useSelector((state) => state.admin);

  // fetching mentor mentee details
  useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(adminGetMentorMentee(history)),
      dispatch(adminGetInteractions(history, setInteractions)),
    ]).finally(() => {
      setTimeout(() => setLoading(false), 500); // Add slight delay for transition
    });
  }, [dispatch, history]);

  // function to handle the tab selection
  const handleSelection = (tab) => {
    setSelected(tab);
  };

  // function to handle block user
  const blockUser = (userId) => {
    dispatch(adminBanUser(userId));
  };

  const UserCard = ({ user, type }) => (
    <div className="user-card card">
      <div
        className={`user-badge ${
          type === "mentor" ? "mentor-badge" : "mentee-badge"
        }`}
      >
        {type === "mentor" ? (
          <Group style={{ fontSize: 14 }} />
        ) : (
          <Person style={{ fontSize: 14 }} />
        )}
      </div>
      <div className="card-content">
        <div className="user-card-content">
          <img
            className="user-avatar"
            src={
              user.avatar.url === ""
                ? `https://api.dicebear.com/9.x/personas/svg?seed=${user.email}`
                : user.avatar.url
            }
            alt={user.firstName}
          />
          <div className="user-info">
            <h3 className="user-name">
              {`${user.firstName} ${user.middleName || ""} ${user.lastName}`}
            </h3>
            <p className="user-details">{user.email}</p>
            <p className="user-details">{user.phone}</p>
          </div>
        </div>

        <button
          className={`btn ${user.isBanned ? "btn-unblock" : "btn-block"}`}
          onClick={() => blockUser(user._id)}
        >
          {user.isBanned ? (
            <Check fontSize="small" />
          ) : (
            <Block fontSize="small" />
          )}
          {user.isBanned ? "Unblock User" : "Block User"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-interactions">
      <div className="tabs-container">
        <div className="tabs">
          <div
            className={`tab ${selected === "mentors" ? "active" : ""}`}
            onClick={() => handleSelection("mentors")}
          >
            <Group fontSize="small" />
            Mentors
          </div>
          <div
            className={`tab ${selected === "mentees" ? "active" : ""}`}
            onClick={() => handleSelection("mentees")}
          >
            <Person fontSize="small" />
            Mentees
          </div>
          <div
            className={`tab ${selected === "interactions" ? "active" : ""}`}
            onClick={() => handleSelection("interactions")}
          >
            <Forum fontSize="small" />
            Interactions
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tab-content">
          {selected === "mentors" && (
            <div className="users-grid">
              {mentors?.map((mentor) => (
                <UserCard key={mentor._id} user={mentor} type="mentor" />
              ))}
            </div>
          )}

          {selected === "mentees" && (
            <div className="users-grid">
              {students?.map((student) => (
                <UserCard key={student._id} user={student} type="mentee" />
              ))}
            </div>
          )}

          {selected === "interactions" && (
            <div>
              {interactions.map((int, i) => (
                <div key={i} className="card interaction-card">
                  {/* Mentor header */}
                  <div className="card-header">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <img
                        className="user-avatar"
                        src={
                          int?.mentor?.avatar?.url === ""
                            ? `https://api.dicebear.com/9.x/personas/svg?seed=${int?.mentor?.email}`
                            : int?.mentor?.avatar?.url
                        }
                        alt={int?.mentor?.firstName}
                      />
                      <div>
                        <h3 className="user-name">
                          {`${int?.mentor?.firstName} ${
                            int?.mentor?.middleName || ""
                          } ${int?.mentor?.lastName}`}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                          }}
                        >
                          <span className="user-details">
                            {int?.mentor?.email}
                          </span>
                          <span className="user-details">•</span>
                          <span className="user-details">
                            {int?.mentor?.department}
                          </span>
                          <span className="user-details">•</span>
                          <span className="user-details">
                            {int?.mentor?.designation}
                          </span>
                          <span className="user-details">•</span>
                          <span className="user-details">
                            {int?.mentor?.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meetings section */}
                  <div className="card-content">
                    <h3 className="section-title">
                      <CalendarMonth fontSize="small" /> Meetings
                    </h3>
                    <div className="items-grid">
                      {int?.meetings?.map((meet) => (
                        <div key={meet._id} className="card meeting-card">
                          <div className="card-content">
                            <p className="user-details">
                              Created on -{" "}
                              {moment(meet?.createdAt).format("LLL")}
                            </p>
                            <p style={{ margin: "1rem 0" }}>
                              {meet?.description}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginTop: "1rem",
                              }}
                            >
                              <div style={{ maxWidth: "60%" }}>
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  <LinkIcon
                                    fontSize="small"
                                    style={{ marginRight: "0.25rem" }}
                                  />
                                  <a
                                    href={meet?.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="meeting-url"
                                  >
                                    {meet?.url}
                                  </a>
                                </p>
                              </div>
                              <p className="meeting-date">
                                Meeting on:{" "}
                                {moment(meet?.date).format(
                                  "DD/MM/yyyy, h:mm a"
                                )}
                              </p>
                            </div>

                            <div style={{ marginTop: "1rem" }}>
                              <p
                                className="user-details"
                                style={{ marginBottom: "0.5rem" }}
                              >
                                Participants:
                              </p>
                              <div className="participants">
                                {meet?.participants?.map((p, i) => (
                                  <Tooltip
                                    key={i}
                                    arrow
                                    title={`${p?.user?.firstname} ${
                                      p?.user?.middlename || ""
                                    } ${p?.user?.lastname}`}
                                  >
                                    <Chip
                                      size="small"
                                      avatar={
                                        <Avatar
                                          src={
                                            p?.user?.avatar.url === ""
                                              ? `https://api.dicebear.com/9.x/personas/svg`
                                              : p?.user?.avatar.url
                                          }
                                          alt={p?.user?.firstname}
                                        />
                                      }
                                      label={p?.user?.enrollment_no}
                                      className="participant-chip"
                                    />
                                  </Tooltip>
                                ))}
                              </div>
                            </div>

                            {meet?.minutes && (
                              <div className="meeting-minutes">
                                <p
                                  style={{
                                    fontWeight: 500,
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  Meeting Minutes:
                                </p>
                                <p>{meet?.minutes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Posts section */}
                    <h3 className="section-title" style={{ marginTop: "2rem" }}>
                      <Comment fontSize="small" /> Posts
                    </h3>
                    <div className="items-grid">
                      {int?.posts?.map((post) => (
                        <div key={post._id} className="card post-card">
                          <div className="card-content">
                            <p
                              className="user-details"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              Created on -{" "}
                              {moment(post.createdAt).format("LLL")}
                            </p>
                            <div
                              className="a-tag"
                              style={{ margin: "1rem 0" }}
                              dangerouslySetInnerHTML={{
                                __html: `${post.body}`,
                              }}
                            />
                            {post.commentEnabled && (
                              <p className="comments-count">
                                <Comment
                                  fontSize="small"
                                  style={{ marginRight: "0.25rem" }}
                                />
                                {post.commentCount} Comments
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminInteractions;

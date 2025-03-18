import React, { useContext, useRef, useState } from "react";
import DTP from "../dtp/DTP";
import EventIcon from "@mui/icons-material/Event";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";
import { CSSTransition } from "react-transition-group";
import ModalOverlay from "../../../../../modal/ModalOverlay";
import MeetingModal from "../meetingModal/MeetingModal";
import { SocketContext } from "../../../../../../socket/socket";
import "./MeetingForm.css"; // We'll create this CSS file

const MeetingForm = ({ meeting, setMeeting }) => {
    const [isValidDateTime, setIsValidDateTime] = useState(true);
    const [dateProvided, setDateProvided] = useState(true);
    const [focused, setFocused] = useState({
        description: false,
        url: false,
    });

    // function to handle the date change and logic to prevent previous date selection
    const handleDateChange = (newDate) => {
        if (newDate == null) {
            setMeeting({ ...meeting, date: newDate });
            setIsValidDateTime(true);
        } else {
            const curDate = new Date();
            if (newDate.toISOString() < curDate.toISOString()) {
                setIsValidDateTime(false);
                setMeeting({ ...meeting, date: null });
            } else {
                setIsValidDateTime(true);
                setDateProvided(true);
                setMeeting({ ...meeting, date: newDate.toISOString() });
            }
        }
    };

    // function to handle change of the state value of the meeting state obj
    const handleChange = (e) => {
        setMeeting({
            ...meeting,
            [e.target.name]: e.target.value,
        });
    };

    // function to handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (meeting.date == null) {
            setDateProvided(false);
            return;
        }
        setShowMeetingModal(true);
        setShowOverlay(true);
    };

    // state to control the modal show and dont show
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMeetingModal, setShowMeetingModal] = useState(false);

    // node refs for the modals
    const meetingModalRef = useRef(null);
    const overlayRef = useRef(null);

    const socket = useContext(SocketContext);

    return (
        <div className="meeting-form-container">
            <CSSTransition
                nodeRef={overlayRef}
                in={showOverlay}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <ModalOverlay nodeRef={overlayRef} />
            </CSSTransition>
            <CSSTransition
                nodeRef={meetingModalRef}
                in={showMeetingModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <MeetingModal
                    nodeRef={meetingModalRef}
                    setShowOverlay={setShowOverlay}
                    setShowMeetingModal={setShowMeetingModal}
                    setMeeting={setMeeting}
                    meeting={meeting}
                    socket={socket}
                />
            </CSSTransition>
            
            <div className="form-card">
                <h3 className="form-title">Schedule a meeting</h3>
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${meeting.description ? 'has-value' : ''} ${focused.description ? 'focused' : ''}`}>
                        <div className="input-container">
                            <textarea
                                onChange={handleChange}
                                value={meeting.description}
                                required
                                name="description"
                                id="description"
                                rows={4}
                                placeholder="Meeting description"
                                onFocus={() => setFocused({...focused, description: true})}
                                onBlur={() => setFocused({...focused, description: false})}
                            ></textarea>
                            <label htmlFor="description">Meeting description</label>
                        </div>
                    </div>

                    <div className={`form-group ${meeting.url ? 'has-value' : ''} ${focused.url ? 'focused' : ''}`}>
                        <div className="input-container">
                            <input
                                required
                                onChange={handleChange}
                                value={meeting.url}
                                id="url"
                                name="url"
                                type="text"
                                placeholder="Meeting link"
                                onFocus={() => setFocused({...focused, url: true})}
                                onBlur={() => setFocused({...focused, url: false})}
                            />
                            <label htmlFor="url">Meeting URL</label>
                            <div className="input-icon">
                                <LinkIcon />
                            </div>
                        </div>
                    </div>

                    <div className="form-group date-picker">
                        <DTP date={meeting.date} handleDateChange={handleDateChange} />
                        {meeting.date && <label className="date-label">Meeting date and time</label>}
                        {!isValidDateTime && <p className="error-message">Invalid time - Please select a future date</p>}
                        {!dateProvided && <p className="required-message">Please select a date and time</p>}
                    </div>

                    <div className="submit-container">
                        <button type="submit" className="submit-button">
                            <EventIcon fontSize="small" />
                            <span>Schedule Meeting</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MeetingForm;
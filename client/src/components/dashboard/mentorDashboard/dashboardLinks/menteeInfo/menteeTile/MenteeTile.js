import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mentorGetAllMentees, mentorGetAllMenteeSemesters } from "../../../../../../actions/mentor";
import MenteeDetailsTile from "./menteeDetailsTile/MenteeDetailsTile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AnnotationIcon from "../../../../../../assets/icons/AnnotationIcon";
import "./MenteeTile.css"; // We'll create this CSS file for the styled component

const MenteeTile = ({ slno, mentee, history }) => {
    const dispatch = useDispatch();

    // state variable to show the extended details view of the mentee
    const [showDetails, setShowDetails] = useState(false);
    // state variable to store the fetched semesters for the mentee
    const [semesters, setSemesters] = useState([]);

    const handleToggleDetails = () => {
        if (!showDetails) {
            setShowDetails(true);
            dispatch(mentorGetAllMenteeSemesters(history, setSemesters, mentee._id));
            dispatch(mentorGetAllMentees());
        } else {
            setShowDetails(false);
        }
    };

    return (
        <div className="mentee-tile-wrapper">
            <div className="mentee-row">
                <div className="mentee-cell sl-no">{slno}</div>
                
                <div className="mentee-cell name">
                    <div className="mentee-avatar">
                        <img
                            src={
                                mentee.avatar.url === ""
                                    ? `https://api.dicebear.com/9.x/personas/svg`
                                    : mentee.avatar.url
                            }
                            alt={`${mentee.firstName}'s avatar`}
                        />
                    </div>
                    <div className="mentee-name">
                        {`${mentee.firstName} ${mentee.middleName} ${mentee.lastName}`}
                    </div>
                </div>
                
                <div className="mentee-cell roll">{mentee.enrollment_no}</div>
                
                <div className="mentee-cell address">{mentee.address}</div>
                
                <div className="mentee-cell department">{mentee.department}</div>
                
                <div className="mentee-cell semester">{mentee.semester}</div>
                
                <div className="mentee-cell phone">{mentee.phone_no}</div>
                
                <div className="mentee-cell actions">
                    <button className="action-button annotation">
                        <AnnotationIcon alt={true} myStyle={"action-icon"} />
                    </button>
                    
                    <button 
                        className="action-button toggle"
                        onClick={handleToggleDetails}
                    >
                        {showDetails ? (
                            <KeyboardArrowUpIcon fontSize="small" />
                        ) : (
                            <KeyboardArrowDownIcon fontSize="small" />
                        )}
                    </button>
                </div>
            </div>
            
            {showDetails && (
                <div className="mentee-details-container">
                    <MenteeDetailsTile mentee={mentee} semesters={semesters} />
                </div>
            )}
        </div>
    );
};

export default MenteeTile;
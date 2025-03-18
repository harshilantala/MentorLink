import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MenteeTile from "./menteeTile/MenteeTile";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import "./MenteeInfo.css"; // We'll create this CSS file for our styles

const MenteeInfo = () => {
    const history = useHistory();
    const [tempList, setTempList] = useState([]);
    const [term, setTerm] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const { mentees } = useSelector((state) => state.mentor);
    
    // Initialize tempList with mentees when component mounts
    useEffect(() => {
        setTempList([...mentees]);
    }, [mentees]);

    const handleSearch = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchValue(value);
        
        if (value === "") {
            setTempList([...mentees]);
            return;
        }
        
        // Transition effect for filtering
        setIsTransitioning(true);
        setTimeout(() => {
            const temp = mentees.filter(mentee => 
                mentee.firstName.toString().toLowerCase().includes(value) ||
                mentee.lastName.toString().toLowerCase().includes(value) ||
                mentee.address.toString().toLowerCase().includes(value) ||
                mentee.enrollment_no.toString().toLowerCase().includes(value) ||
                mentee.department.toString().toLowerCase().includes(value) ||
                mentee.semester.toString().toLowerCase().includes(value)
            );
            
            setTempList(temp);
            setIsTransitioning(false);
        }, 300);
    };

    const sortBasedOnTerm = (e) => {
        const selTerm = e.target.name;
        let temp = [...(tempList.length > 0 ? tempList : mentees)];
        
        // Transition effect for sorting
        setIsTransitioning(true);
        setTimeout(() => {
            if (term === selTerm) {
                temp.reverse();
            } else if (selTerm === "roll") {
                temp.sort((a, b) => a.enrollment_no.toLowerCase() > b.enrollment_no.toLowerCase() ? 1 : -1);
                setTerm(selTerm);
            } else if (selTerm === "semester") {
                temp.sort((a, b) => a.semester.toLowerCase() > b.semester.toLowerCase() ? 1 : -1);
                setTerm(selTerm);
            } else if (selTerm === "name") {
                temp.sort((a, b) => {
                    const aName = `${a.firstName} ${a.lastName}`.toLowerCase();
                    const bName = `${b.firstName} ${b.lastName}`.toLowerCase();
                    return aName > bName ? 1 : -1;
                });
                setTerm(selTerm);
            }
            
            setTempList([...temp]);
            setIsTransitioning(false);
        }, 300);
    };

    return (
        <div className="mentee-info-container">
            <div className="mentee-info-content">
                <div className="mentee-header">
                    <div className="mentee-title">
                        <h2>Mentee Information</h2>
                        <div className="mentee-count">
                            <span className="count">{mentees.length}</span> mentees found
                        </div>
                    </div>
                    <div className="search-container">
                        <input
                            onChange={handleSearch}
                            value={searchValue}
                            type="text"
                            className="search-input"
                            placeholder="Search anything..."
                        />
                        <div className="search-icon">
                            <SearchIcon alt={true} myStyle={"search-icon"} />
                        </div>
                    </div>
                </div>
                
                <div className="table-container">
                    <div className="table-header">
                        <div className="header-cell sl-no">Sl No.</div>
                        <div className="header-cell">
                            <button
                                name="name"
                                onClick={sortBasedOnTerm}
                                className={`sort-button ${term === "name" ? "active" : ""}`}
                            >
                                Name
                                <span className="sort-icon"></span>
                            </button>
                        </div>
                        <div className="header-cell">
                            <button
                                name="roll"
                                onClick={sortBasedOnTerm}
                                className={`sort-button ${term === "roll" ? "active" : ""}`}
                            >
                                Roll No.
                                <span className="sort-icon"></span>
                            </button>
                        </div>
                        <div className="header-cell address">Address</div>
                        <div className="header-cell">Department</div>
                        <div className="header-cell">
                            <button
                                name="semester"
                                onClick={sortBasedOnTerm}
                                className={`sort-button ${term === "semester" ? "active" : ""}`}
                            >
                                Semester
                                <span className="sort-icon"></span>
                            </button>
                        </div>
                        <div className="header-cell">Mobile No.</div>
                        <div className="header-cell">Actions</div>
                    </div>
                    
                    <div className={`table-body ${isTransitioning ? 'transitioning' : ''}`}>
                        {mentees.length === 0 ? (
                            <div className="no-mentees">No mentees found</div>
                        ) : tempList.length === 0 ? (
                            mentees.map((mentee, index) => (
                                <MenteeTile
                                    key={mentee.id || index}
                                    slno={index + 1}
                                    mentee={mentee}
                                    history={history}
                                />
                            ))
                        ) : (
                            tempList.map((mentee, index) => (
                                <MenteeTile
                                    key={mentee.id || index}
                                    slno={index + 1}
                                    mentee={mentee}
                                    history={history}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteeInfo;
import React from "react";
import DotIcon from "../../../../../assets/icons/DotIcon";
import { Abbreviate } from "../../../../../utility";

const MenteeTile = ({ mentee, handleChange }) => {
    return (
        <div className="flex flex-shrink-0 items-center justify-between p-3 border border-gray-200 rounded-lg w-full sm:w-64 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 hover-lift-sm">
            <div className="flex items-center justify-start flex-1">
                <div className="relative mr-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
                        src={
                            mentee.avatar.url === ""
                              ? `https://api.dicebear.com/9.x/personas/svg?seed=${mentee.email}`
                              : mentee.avatar.url
                          }
                        alt={`${mentee.firstName} ${mentee.lastName}`}
                    />
                </div>
                <div className="flex flex-col">
                    <h5 className="font-medium text-gray-800 mb-1">{`${mentee.firstName} ${mentee.middleName} ${mentee.lastName}`}</h5>
                    <div className="flex items-center justify-start gap-x-1 text-gray-500 text-sm">
                        <span>{mentee.enrollment_no}</span>
                        <DotIcon alt={true} myStyle={"h-1 w-1 text-gray-500"} />
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                            {mentee.department ? Abbreviate(mentee.department) : "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="form-check ml-3">
                <input
                    className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer focus:ring-2 focus:ring-blue-200 focus:ring-offset-0 scale-on-hover"
                    type="checkbox"
                    value=""
                    id={mentee._id}
                    onChange={handleChange}
                />
                <label className="sr-only" htmlFor={mentee._id}>
                    Select {mentee.firstName}
                </label>
            </div>
        </div>
    );
};

export default MenteeTile;
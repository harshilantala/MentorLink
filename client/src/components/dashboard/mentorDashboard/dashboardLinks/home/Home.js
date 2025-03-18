// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { getStats } from "../../../../../actions/stats";
// import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
// import AnnotationIcon from "../../../../../assets/icons/AnnotationIcon";
// import ChatAltIcon from "../../../../../assets/icons/ChatAltIcon";
// import ChartData from "./chartData/ChartData";

// import InfoCards from "./InfoCards";
// import RecentActivities from "./recentActivities/RecentActivities";
// import UpcomingMeetings from "./UpcomingMeetings";

// const Home = ({ name }) => {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     // state for stats
//     const [stats, setStats] = useState({
//         posts: 0,
//         comments: 0,
//         mentees: 0,
//     });

//     useEffect(() => {
//         dispatch(getStats(history, setStats));
//     }, []);

//     return (
//         <div className="h-full relative overflow-y-auto">
//             <div className={`w-full h-full px-36 py-10 grid grid-cols-5 gap-4`}>
//                 <div className="w-full col-span-3 flex flex-col justify-start gap-y-10">
//                     <h1 className="">Welcome back, {name}!</h1>
//                     <div className="flex items-center justify-between">
//                         <InfoCards
//                             myStyle={"p-4 bg-rose-500 rounded-md bg-right-top w-48 shadow-md"}
//                             total={stats.mentees}
//                             text={"Total Mentees"}
//                         >
//                             <AcademicCapIcon alt={true} myStyle={"w-6 h-6 text-white"} />
//                         </InfoCards>
//                         <InfoCards
//                             myStyle={"p-4 bg-purple-500 rounded-md bg-right-top w-48 shadow-md"}
//                             total={stats.posts}
//                             text={"Total Posts"}
//                         >
//                             <AnnotationIcon alt={true} myStyle={"w-6 h-6 text-white"} />
//                         </InfoCards>
//                         <InfoCards
//                             myStyle={"p-4 bg-cyan-500 rounded-md bg-right-top w-48 shadow-md"}
//                             total={stats.comments}
//                             text={"Total Comments"}
//                         >
//                             <ChatAltIcon alt={true} myStyle={"w-6 h-6 text-white"} />
//                         </InfoCards>
//                     </div>
//                     <div className="w-full bg-white h-64 rounded-md px-4 py-2">
//                         <ChartData />
//                     </div>
//                     <div className="w-full bg-white h-60 rounded-md overflow-y-auto px-4 py-2">
//                         <h4 className="mb-3">Activities last 7 days</h4>
//                         <RecentActivities />
//                     </div>
//                 </div>
//                 <div className="col-span-2 py-4 flex items-start justify-end h-full">
//                     <UpcomingMeetings />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStats } from "../../../../../actions/stats";
import AcademicCapIcon from "../../../../../assets/icons/AcademicCapIcon";
import AnnotationIcon from "../../../../../assets/icons/AnnotationIcon";
import ChatAltIcon from "../../../../../assets/icons/ChatAltIcon";
import InfoCards from "./InfoCards";
import RecentActivities from "./recentActivities/RecentActivities";
import UpcomingMeetings from "./UpcomingMeetings";

const Home = ({ name }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [stats, setStats] = useState({
        posts: 0,
        comments: 0,
        mentees: 0,
    });

    useEffect(() => {
        dispatch(getStats(history, setStats));
    }, []);

    // Function to wrap each letter with a span for animation
    const animateText = (text) => {
        return text.split("").map((char, index) => (
            <span 
                key={index} 
                className="text-fade-in" 
                style={{ animationDelay: `${index * 0.05}s`, whiteSpace: "pre" }} 
            >
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-16 animate-fade-in">
                {/* Welcome Header */}
                <div className="bg-white rounded-3xl shadow p-8 backdrop-blur-sm bg-white/80 border border-slate-100 transition-all duration-500 ease-in-out animate-slide-up">
                    <h1 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                        {animateText(`Welcome back, ${name}! ✨`)}
                    </h1>
                    <p className="mt-3 text-slate-500 font-medium">Here's what's happening with your mentorship journey today.</p>
                </div>

                {/* Info Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <div className="p-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <InfoCards
                            total={stats.mentees}
                            text={"Active Mentees"}
                        >
                            <AcademicCapIcon alt={true} myStyle={"w-10 h-10 text-white opacity-90"} />
                        </InfoCards>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ animationDelay: "0.2s" }}>
                        <InfoCards
                            total={stats.posts}
                            text={"Published Posts"}
                        >
                            <AnnotationIcon alt={true} myStyle={"w-10 h-10 text-white opacity-90"} />
                        </InfoCards>
                    </div>
                    <div className="p-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl" style={{ animationDelay: "0.3s" }}>
                        <InfoCards
                            total={stats.comments}
                            text={"Community Interactions"}
                        >
                            <ChatAltIcon alt={true} myStyle={"w-10 h-10 text-white opacity-90"} />
                        </InfoCards>
                    </div>
                </div>

                {/* Recent Activities and Upcoming Meetings Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    {/* Recent Activities Section */}
                    <div className="bg-white rounded-3xl shadow p-8 backdrop-blur-sm bg-white/80 border border-slate-100 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                            <span className="mr-3 bg-amber-100 text-amber-600 p-2 rounded-lg">🔔</span> 
                            Recent Activities
                        </h2>
                        <div className="h-80 overflow-y-auto custom-scrollbar pr-2">
                            <RecentActivities />
                        </div>
                    </div>

                    {/* Upcoming Meetings Section */}
                    <div className="bg-white rounded-3xl shadow p-8 backdrop-blur-sm bg-white/80 border border-slate-100 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                            <span className="mr-3 bg-green-100 text-green-600 p-2 rounded-lg">📅</span> 
                            Upcoming Meetings
                        </h2>
                        <div className="h-80 overflow-y-auto custom-scrollbar pr-2">
                            <UpcomingMeetings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// CSS Animation
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes textFade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

.text-fade-in {
  display: inline-block;
  opacity: 0;
  animation: textFade 0.4s ease-out forwards;
}
`;

// Injecting global styles
const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Home;

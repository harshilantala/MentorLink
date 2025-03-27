// import React from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Auth from "./components/auth/Auth";
// import Main from "./components/Main";
// import MentorDashboard from "./components/dashboard/mentorDashboard/MentorDashboard";
// import { SocketContext, socket } from "./socket/socket";
// import Home from "./components/Home";
// import AdminAuth from "./components/auth/AdminAuth";
// import MentorAuth from "./components/auth/MentorAuth";
// import MenteeAuth from "./components/auth/MenteeAuth";

// const App = () => {
//     const user = JSON.parse(localStorage.getItem("authData")); 

//     return (
//         <React.StrictMode>
//             <BrowserRouter>
//                 <Switch>
//                     <Route path="/" exact component={Home} />
//                     <Route path="/main" exact component={Main} />
//                     <Route
//                         path="/auth/admin"
//                         exact
//                         component={AdminAuth}
//                     />
//                     <Route
//                         path="/auth/mentor"
//                         exact
//                         component={MentorAuth}
//                     />
//                     <Route
//                         path="/auth/mentee"
//                         exact
//                         component={MenteeAuth}
//                     />
//                     <SocketContext.Provider value={socket}>
//                         {/* Dashboard Routes */}
//                         <Route
//                             path="/admin/dashboard"
//                             exact
//                             render={() =>
//                                 user && user.role === "ADMIN" ? (
//                                     <MentorDashboard />
//                                 ) : (
//                                     <Redirect to="/main" />
//                                 )
//                             }
//                         />
//                         <Route
//                             path="/mentor/dashboard"
//                             exact
//                             render={() =>
//                                 user && user.role === "MENTOR" ? (
//                                     <MentorDashboard />
//                                 ) : (
//                                     <Redirect to="/main" />
//                                 )
//                             }
//                         />
//                         <Route
//                             path="/mentee/dashboard"
//                             exact
//                             render={() =>
//                                 user && user.role === "STUDENT" ? (
//                                     <MentorDashboard />
//                                 ) : (
//                                     <Redirect to="/main" />
//                                 )
//                             }
//                         />
//                     </SocketContext.Provider>
//                 </Switch>
//             </BrowserRouter>
//         </React.StrictMode>
//     );
// };

// export default App;


import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Main from "./components/Main";
import MentorDashboard from "./components/dashboard/mentorDashboard/MentorDashboard";

import { SocketContext, socket } from "./socket/socket";
import Home from "./components/Home";

const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/main" exact component={Main} />
                    <Route path="/admin" exact component={Auth} />
                    <Route path="/mentor" exact component={Auth} />
                    <Route path="/mentee" exact component={Auth} />
                    <SocketContext.Provider value={socket}>
                        <Route path="/admin/dashboard" exact component={MentorDashboard} />
                        <Route path="/mentor/dashboard" exact component={MentorDashboard} />
                        <Route path="/mentee/dashboard" exact component={MentorDashboard} />
                    </SocketContext.Provider>
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default App;


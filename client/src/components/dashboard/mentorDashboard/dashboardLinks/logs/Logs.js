import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminFetchLogs } from "../../../../../actions/admin";
import RefreshIcon from "../../../../../assets/icons/RefreshIcon";
import "./logs.css";

// Additional CSS for animations and transitions
const styles = {
  fadeIn: {
    animation: "fadeIn 0.5s ease-in-out"
  },
  slideIn: {
    animation: "slideIn 0.4s ease-out"
  },
  refreshRotate: {
    transition: "transform 0.5s ease-in-out"
  },
  tableRow: {
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  tableHeader: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backdropFilter: "blur(8px)",
  }
};

const Logs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { logs } = useSelector((state) => state.admin);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [activeSort, setActiveSort] = useState({ field: 'createdAt', direction: 'desc' });

  // Handle logs filtering based on search term
  useEffect(() => {
    if (!logs) return;
    
    const filtered = logs.filter(log => {
      const searchString = searchTerm.toLowerCase();
      return (
        `${log?.user?.firstName} ${log?.user?.middleName} ${log?.user?.lastName}`.toLowerCase().includes(searchString) ||
        log?.user?.email.toLowerCase().includes(searchString) ||
        log?.event_type.toLowerCase().includes(searchString) ||
        log?.event_detail.toLowerCase().includes(searchString) ||
        log?.ip.toLowerCase().includes(searchString)
      );
    });
    
    setFilteredLogs(filtered);
  }, [searchTerm, logs]);

  // Function to reload the logs with animation
  const handleReload = () => {
    setIsRefreshing(true);
    dispatch(adminFetchLogs(history));
    
    // Reset refresh animation after completion
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Sort the logs by a selected field
  const handleSort = (field) => {
    const direction = activeSort.field === field && activeSort.direction === 'asc' ? 'desc' : 'asc';
    setActiveSort({ field, direction });
  };

  // Apply sorting to the logs
  const sortedLogs = [...(filteredLogs.length ? filteredLogs : logs)].sort((a, b) => {
    let compareA, compareB;
    
    // Handle different field types for sorting
    switch (activeSort.field) {
      case 'name':
        compareA = `${a?.user?.firstName} ${a?.user?.lastName}`.toLowerCase();
        compareB = `${b?.user?.firstName} ${b?.user?.lastName}`.toLowerCase();
        break;
      case 'email':
        compareA = a?.user?.email.toLowerCase();
        compareB = b?.user?.email.toLowerCase();
        break;
      case 'event_type':
        compareA = a?.event_type.toLowerCase();
        compareB = b?.event_type.toLowerCase();
        break;
      default:
        compareA = a[activeSort.field];
        compareB = b[activeSort.field];
    }
    
    if (compareA < compareB) return activeSort.direction === 'asc' ? -1 : 1;
    if (compareA > compareB) return activeSort.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-hidden rounded-lg shadow-sm" style={styles.fadeIn}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">System Logs</h1>
          <p className="text-gray-500 text-sm">Monitoring system activity and user actions</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <button
            onClick={handleReload}
            title="Reload logs"
            className="flex items-center justify-between py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white shadow-md hover:shadow-lg"
          >
            <div 
              className="h-5 w-5 mr-2" 
              style={{ 
                ...styles.refreshRotate, 
                transform: isRefreshing ? 'rotate(180deg)' : 'rotate(0deg)' 
              }}
            >
              <RefreshIcon alt={true} myStyle="h-5 w-5" />
            </div>
            Refresh
          </button>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm flex justify-between items-center" style={styles.slideIn}>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Logs</p>
            <p className="text-xl font-semibold">{logs?.length || 0}</p>
          </div>
        </div>
        
        <div className="hidden md:flex text-sm text-gray-500">
          {logs?.length > 0 && (
            <span>Latest entry: {moment(logs[0]?.createdAt).format("MMMM Do YYYY, h:mm a")}</span>
          )}
        </div>
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={styles.fadeIn}>
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white" style={styles.tableHeader}>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  User
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('event_type')}
                >
                  <div className="flex items-center">
                    Action
                    {activeSort.field === 'event_type' && (
                      <span className="ml-1">{activeSort.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  IP Address
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Time
                    {activeSort.field === 'createdAt' && (
                      <span className="ml-1">{activeSort.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedLogs && sortedLogs.length > 0 ? (
                sortedLogs.map((log, index) => (
                  <tr 
                    key={log._id} 
                    style={{
                      ...styles.tableRow,
                      animation: `fadeIn 0.3s ease-in-out forwards ${index * 0.05}s`
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                            src={
                              log?.user?.avatar?.url === ""
                                ? `https://api.dicebear.com/9.x/personas/svg?seed=${log?.user?.email}`
                                : log?.user?.avatar?.url
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {`${log?.user?.firstName} ${log?.user?.middleName || ''} ${log?.user?.lastName || ''}`}
                          </div>
                          <div className="text-sm text-gray-500">{log?.user?.email}</div>
                          <div className="text-xs text-gray-400">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {log?.userModel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${log?.event_type.includes('CREATE') ? 'bg-green-100 text-green-800' : 
                          log?.event_type.includes('DELETE') ? 'bg-red-100 text-red-800' : 
                          log?.event_type.includes('UPDATE') ? 'bg-yellow-100 text-yellow-800' : 
                          log?.event_type.includes('LOGIN') ? 'bg-blue-100 text-blue-800' : 
                          'bg-purple-100 text-purple-800'}`}
                      >
                        {log?.event_type.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {log?.event_detail || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log?.ip || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {moment(log?.createdAt).format("MMM D, YYYY · h:mm a")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    {logs?.length === 0 ? "No logs available" : "No matching logs found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// CSS for animations that should be added to your CSS file or style tag
const cssToAdd = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;

export default Logs;
import React, { useState, useEffect } from "react";

const InfoCards = ({ total, text, children }) => {
    const [count, setCount] = useState(0);
    
    // Simple counter effect
    useEffect(() => {
        if (count < total) {
            const timeout = setTimeout(() => {
                setCount(prev => Math.min(prev + Math.ceil(total / 20), total));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [count, total]);

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Card Content */}
            <div className="flex flex-col h-full justify-between">
                {/* Top Section */}
                <div className="mb-6">
                    {/* Icon Container */}
                    <div className="inline-flex p-3 rounded-full bg-white/25 mb-4 shadow-inner transition-all duration-300 hover:rotate-3">
                        {children}
                    </div>
                    
                    {/* Label */}
                    <h2 className="text-white text-lg font-medium opacity-90 tracking-wide">
                        {text}
                    </h2>
                </div>
                
                {/* Bottom Section */}
                <div className="flex items-end justify-between">
                    {/* Number */}
                    <div className="relative">
                        <span className="text-white text-5xl font-bold leading-none">
                            {count}
                        </span>
                        <div className="absolute h-1 bg-white/50 w-full bottom-0 rounded-full transform translate-y-2"></div>
                    </div>
                    
                    {/* Decorative Arrow */}
                    <div className="opacity-75 transition-transform duration-300 hover:translate-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl transform translate-x-16 -translate-y-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-md transform -translate-x-12 translate-y-6 pointer-events-none"></div>
            
            {/* Bottom Line Decoration */}
            <div className="absolute bottom-0 left-0 right-0 flex space-x-1">
                <div className="h-1 w-3/12 bg-white/40 rounded-full"></div>
                <div className="h-1 w-1/12 bg-white/30 rounded-full"></div>
                <div className="h-1 w-1/6 bg-white/20 rounded-full"></div>
            </div>
        </div>
    );
};

export default InfoCards;
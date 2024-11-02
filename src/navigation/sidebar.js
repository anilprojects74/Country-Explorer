import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleResize = () => {
    if (window.innerWidth >= 640) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: isExpanded ? 300 : 70}}
      transition={{ type: 'spring', stiffness: 240 }}
      className="bg-gray-700 text-white h-full overflow-hidden flex content-center"
    >
      <nav className="h-full w-full flex flex-col items-center justify-between space-y-6">
        <div className="w-full p-4 pb-2 flex justify-between items-center">
          {isExpanded && 
            <img
              src="https://img.logoipsum.com/238.svg"
              alt="Logo"
            />}
          <button
            className={`p-1.5 rounded-lg text-gray-100 hover:bg-gray-600 transition duration-200`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ isExpanded }}>
          <ul className="w-full flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Anil+Kumar&background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${isExpanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Anil</h4>
              <span className="text-xs text-gray-100">prattipati1234@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export { Sidebar, SidebarContext}  ;

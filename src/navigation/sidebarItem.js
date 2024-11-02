import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { SidebarContext } from "./sidebar"

export default function SidebarItem({ icon, text, active, alert, link }) {

  const { isExpanded } = useContext(SidebarContext)

  return (
    <Link to={link}>
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-gray-800"
              : "hover:bg-indigo-50 hover:text-gray-800"
          }
        `}
      >
        <span className={`text-gray-100 ${active ? "text-gray-800" : "text-gray-100"} transition-colors group-hover:text-gray-800`}>
          {icon}
        </span>
        <span
          className={`overflow-hidden transition-all ${
            isExpanded ? "w-52 ml-3" : "w-0"
          } ${active ? "text-gray-800" : "text-gray-100"} group-hover:text-gray-800`
        }
        >
          {text}
        </span>
        {active && isExpanded && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              isExpanded ? "" : "top-2"
            }`}
          />
        )}
        
        {!isExpanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-800
            `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>

  )
}
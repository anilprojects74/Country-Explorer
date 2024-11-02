import { motion } from "framer-motion";
import { HiOutlineTableCells } from "react-icons/hi2";
import { CiBoxList } from "react-icons/ci";

const TOGGLE_CLASSES =
  "text-lg font-medium flex items-center gap-3 px-2 py-2 transition-colors relative z-10 rounded-lg w-36"; 

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center border border-gray-800 rounded-lg">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "list" ? "text-white bg-violet-600" : "text-slate-800"
        }`}
        onClick={() => setSelected("list")}
        aria-pressed={selected === "list"}
      >
        <CiBoxList className="relative z-10 text-2xl font-bold" />
        <span className="relative z-10">List</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "table" ? "text-white bg-violet-600" : "text-slate-800"
        }`}
        onClick={() => setSelected("table")}
        aria-pressed={selected === "table"}
      >
        <HiOutlineTableCells className="relative z-10 text-2xl font-bold" />
        <span className="relative z-10">Tabular</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "table" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "tween", damping: 12, stiffness: 200 }}
          className="h-full w-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg"
        />
      </div>
    </div>
  );
};

export default SliderToggle;

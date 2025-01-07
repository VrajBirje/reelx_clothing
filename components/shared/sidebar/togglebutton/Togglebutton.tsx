import React from 'react';
import { motion } from 'framer-motion';

interface ToggleButtonProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean; // Add open prop here
}

export const Togglebutton: React.FC<ToggleButtonProps> = ({ setOpen, open }) => {
  return (
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="cursor-pointer border-none bg-transparent"
      aria-label="Toggle Menu"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          className="1"
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          initial="closed"
          animate={open ? "open" : "closed"} // Use the open prop for animation
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path strokeWidth="3" stroke="black" strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }} />
        <motion.path
          className="3"
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};

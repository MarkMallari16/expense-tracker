import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter } from 'lucide-react'; // Import icons

// DropdownMenu component
const DropdownMenu = ({ iconType, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconType === 'download' ? Download : Filter; // Dynamically choose icon
  const dropdownRef = useRef(); // Ref to help in detecting outside clicks

  const containerVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { stiffness: 20 },
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: { stiffness: 20 },
    },
  };

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Icon size={24} className="cursor-pointer" onClick={toggleDropdown} />
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={containerVariants}
        className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-2 z-10"
        style={{ transform: 'translateX(-50%)' }} // Keep the dropdown centered under the icon
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DropdownMenu;

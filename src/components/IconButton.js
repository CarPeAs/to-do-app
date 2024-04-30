import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ icon, onClick, className }) => {
  return (
    <button onClick={onClick} className={`p-2 rounded hover:bg-gray-200 ${className}`}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;

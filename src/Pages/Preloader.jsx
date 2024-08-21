import React from 'react';
import loadingImage from '../assets/load.png'; // Make sure to add your loading image to the assets folder

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <img 
        src={loadingImage} 
        alt="Loading..." 
        className="animate-spin"
        style={{ width: '100px', height: '100px' }} 
      />
    </div>
  );
};

export default Preloader

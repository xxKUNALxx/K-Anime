import React from 'react';

const Card = ({ title, image, onClick }) => {
  return (
    <div className="text-white text-center" onClick={onClick}>
      <div className="w-58 h-96 bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="mt-2 font-semibold text-lg">{title}</p>
    </div>
  );
};

export default Card;

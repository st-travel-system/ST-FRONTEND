'use client';
import React, { useState } from 'react';
import "../styles/base.css";

export default function SearchBar({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSearchTerm(e.target.value.toLowerCase()); // Convertir a minúsculas para una búsqueda sin distinción de mayúsculas
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex items-center bg-white shadow-md rounded-full w-full max-w-4xl">
        <input
          type="text"
          placeholder="Destino"
          className="flex-grow px-4 py-2 text-gray-600 outline-none"
          value={inputValue}
          onChange={handleInputChange} // Capturar texto y actualizar búsqueda
        />
        <button className="bg-primary text-white px-6 py-3 flex items-center gap-2 rounded-full text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.7-5.4a7.8 7.8 0 11-15.6 0 7.8 7.8 0 0115.6 0z"
            />
          </svg>
          Buscar
        </button>
      </div>
    </div>
  );
}

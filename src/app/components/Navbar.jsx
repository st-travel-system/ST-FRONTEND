'use client';
import React, { useState } from 'react';
import { CircleHelp, User, MoreVertical } from "lucide-react";  // Usamos MoreVertical para los tres puntos
import { DOMAIN_FRONT } from '../../../env';
import '../styles/base.css';
import '../styles/navbar.css';

const Navbar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú desplegable

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSearchTerm(e.target.value.toLowerCase()); // Convertir a minúsculas para una búsqueda sin distinción de mayúsculas
  };

  const handleSearch = () => {
    setSearchTerm(inputValue.toLowerCase());
    if (window.location.pathname !== "/") {
      localStorage.setItem("redirectSearch", inputValue.toLowerCase());
      window.location.href = "/";
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar el estado del menú desplegable
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="container mx-auto px-5">
        <div className="h-24 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href={DOMAIN_FRONT}>
              <img
                src="/logo.png"
                alt="ST Travel Shop"
                className="h-16 md:h-20 object-contain brightness-0 invert"
              />
            </a>
          </div>

          {/* SEARCHBAR */}
          <div className="flex justify-center items-center w-2/3 md:w-1/2 mx-auto">
              <div className="flex items-center bg-white shadow-lg rounded-full w-full max-w-4xl">
              <input
                type="text"
                placeholder="Destino"
                      className="flex-grow px-4 py-2 text-gray-600 outline-none rounded-full"
                value={inputValue}
                onChange={handleInputChange} // Capturar texto y actualizar búsqueda
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button className="bg-black text-white px-6 py-4 flex items-center gap-2 rounded-r-full text-xs hidden md:block"
              onClick={handleSearch}
              >
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
                {/* Buscar */}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Menú desplegable en móvil */}
            <button 
              onClick={toggleMenu} 
              className="text-white hover:bg-white/10 md:hidden flex items-center justify-center"
            >
              <MoreVertical className="h-7 w-7" />
            </button>

            {/* Menú desplegable */}
            {isMenuOpen && (
              <div className="absolute top-20 right-5 bg-white shadow-lg rounded-lg p-3 md:hidden">
                <a href={DOMAIN_FRONT + 'faqs'} variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200 block py-2 px-4 rounded-lg">
                  <CircleHelp className="h-6 w-6" />
                </a>
                {/* <a href={'#'} variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-200 block py-2 px-4 rounded-lg">
                  <User className="h-6 w-6" />
                  Perfil
                </a> */}
              </div>
            )}

            {/* Opciones de acciones para pantallas grandes */}
            <a href={DOMAIN_FRONT + 'faqs'} variant="ghost" size="icon" className="text-white hover:bg-white/10 hidden md:block">
              <CircleHelp className="h-7 w-7" />
            </a>
            {/* <a href={'#'} variant="ghost" size="icon" className="text-white hover:bg-white/10 hidden md:block">
              <User className="h-7 w-7" />
            </a> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

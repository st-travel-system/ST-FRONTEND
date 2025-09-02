'use client';
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale"; // Importar el idioma español
import { addDays } from "date-fns"; // Importar función para agregar días
import "react-day-picker/style.css";

export default function MyDatePicker({ fechas_inicio = [],onDateSelect }) {
    const [selected, setSelected] = useState<Date>();

    // 🔹 Convertir las fechas en formato ISO a objetos Date, agregar 1 día y filtrar solo las vigentes
    // Se agrega 1 día para corregir el desfase entre las fechas de la base de datos y la visualización en el frontend
    const today = new Date();
    const availableDates = Array.isArray(fechas_inicio) 
        ? fechas_inicio
            .map(date => {
                const dateObj = new Date(date);
                return addDays(dateObj, 1); // Agrega 1 día a cada fecha para corregir el desfase
            })
            .filter(date => !isNaN(date.getTime()) && date >= today) 
        : [];

        const handleDateSelect = (date) => {
            setSelected(date);
            if (onDateSelect) {
                onDateSelect(date); // Envía la fecha al componente padre (TourPricing)
            }
        };


    return (
        <center> 
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleDateSelect} 
                locale={es} // 👈 Cambia el idioma del calendario a español
                modifiers={{ available: availableDates }}
                modifiersStyles={{
                    available: { 
                        background: "linear-gradient(135deg, #2d0a44, #2d0a44)", 
                        color: "white", 
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        fontWeight: "bold"
                    },
                    selected: { 
                        backgroundColor: "#FF9800",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        boxShadow: "0 4px 15px rgba(255, 152, 0, 0.5)"
                    }
                }}
            />
        </center>
    );
}

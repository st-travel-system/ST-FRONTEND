'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CircularProgress, TextField } from '@mui/material';
import { DOMAIN_BACK } from "../../../../env";
import { useDropzone,Accept } from 'react-dropzone'; // Importamos la librería para arrastrar y soltar

export default function Filtros() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Contraseña hardcodeada (misma que en la página principal)
  const ADMIN_PASSWORD = "sttravel2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(null);
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  useEffect(() => {
    // Verificar si ya está autenticado
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Función para manejar el archivo arrastrado o seleccionado
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);  // Asumimos que solo se sube un archivo
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    }
  });

  // Función para enviar el archivo a la API
  const handleFileUpload = async () => {
    if (!file) {
      setError("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append('archivo', file);

    setLoading(true);
    setError(null);
    setUploadSuccess(null);

    try {
      const response = await fetch(`${DOMAIN_BACK}/subir_filtros`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir el archivo. Inténtalo nuevamente.");
      }

      const data = await response.json();

      // Verificar si la respuesta es correcta según la estructura proporcionada
      if (data.ok) {
        setUploadSuccess(true);  // Establece el estado como exitoso
      } else {
        setError(data.mensaje || "Error al procesar el archivo.");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setError("No se pudo completar la carga. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Si no está autenticado, mostrar el formulario de login
  if (!isAuthenticated) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}>
        <Card sx={{ maxWidth: 400, width: '100%', p: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h1" gutterBottom align="center">
              Acceso Administrativo
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!authError}
                helperText={authError}
                margin="normal"
              />
              <Button 
                fullWidth 
                variant="contained" 
                type="submit"
                sx={{ mt: 2 }}
              >
                Acceder
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Subir archivo de filtros tours (*Importante: Se tiene que colocar todos los tours a subir)
        </Typography>
        <Button 
          variant="outlined" 
          color="error"
          onClick={() => {
            setIsAuthenticated(false);
            sessionStorage.removeItem('isAuthenticated');
          }}
        >
          Cerrar Sesión
        </Button>
      </Box>

      {/* Card que contiene el campo para subir archivo */}
      <Card>
        <CardContent>
          {/* Área de arrastrar y soltar */}
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #5B2C7C',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              marginTop: '20px',
              marginBottom: '20px',
              cursor: 'pointer',
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body2" color="#5B2C7C">
              Arrastra y suelta imágenes aquí o haz clic para seleccionar.
            </Typography>
          </Box>

          {/* Mostrar nombre del archivo seleccionado */}
          {file && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Archivo seleccionado: {file.name}
            </Typography>
          )}

          {/* Mensaje de éxito o error */}
          {uploadSuccess === true && (
            <Typography variant="body2" color="green" sx={{ mb: 2 }}>
              Archivo cargado exitosamente: {file?.name}
            </Typography>
          )}
          {uploadSuccess === false && (
            <Typography variant="body2" color="red" sx={{ mb: 2 }}>
              Hubo un error al procesar el archivo.
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="red" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Botón para enviar el archivo */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Subir archivo"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

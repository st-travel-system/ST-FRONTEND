'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel, TablePagination, Card, CardContent, SelectChangeEvent, TextField } from '@mui/material'; // Importa TextField para la búsqueda
import { DOMAIN_FRONT, DOMAIN_BACK } from "../../../env";

interface Tour_F {
  id_tour: number;
  fecha_inicio: string;
  fecha_fin: string;
  nombre_categoria: string;
  nombre_tour: string;
  titulo: string;
  tipo_tour: string;
  precio: number;
  publicado: number;
  foto_portada: string;
  fotos_galeria: string;
  descriptions: { titulo: string; descripcion: string }[];
}

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState('todos');
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(10); // Número de filas por página
  const [loading, setLoading] = useState(true);
  const [toursPublicados, setTours] = useState<Tour_F[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Contraseña hardcodeada (en producción deberías usar un sistema más seguro)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sttravel2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError(null);
      // Guardar en sessionStorage para mantener la sesión
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  useEffect(() => {
    // Verificar si ya está autenticado
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    let retryCount = 0;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      while (retryCount < 3) {
        try {
          const response = await fetch(`${DOMAIN_BACK}/obtener_tours_base`);
          if (!response.ok) throw new Error("Error en la respuesta del servidor");

          const data = await response.json();
          setTours(data.toursUnicos);
          setLoading(false);
          return; // Salir del bucle si la petición es exitosa
        } catch (error) {
          retryCount++;
          console.error(`Intento ${retryCount}: Error al obtener tours`, error);
        }
      }
      setError("No se pudieron cargar los tours. Inténtelo más tarde.");
      setLoading(false);
    };

    fetchData();
  }, [isAuthenticated]);

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
                error={!!error}
                helperText={error}
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

  const manejarCambioFiltro = (event: SelectChangeEvent<string>) => {  // Cambiar tipo de evento
    setFiltro(event.target.value);
  };

  // Filtramos los tours según el estado seleccionado y también por el término de búsqueda
  const toursFiltrados = toursPublicados.filter((tour) => {
    const searchMatch = 
      tour.nombre_tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.nombre_categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.tipo_tour.toLowerCase().includes(searchTerm.toLowerCase());

    if (filtro === 'todos' && searchMatch) return true;
    if (filtro === 'publicados' && tour.publicado === 1 && searchMatch) return true;
    if (filtro === 'no_publicados' && tour.publicado === 0 && searchMatch) return true;
    return false;
  });

  // Maneja el cambio de página
  const manejarCambioPagina = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Maneja el cambio de número de filas por página
  const manejarCambioFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagina los tours
  const toursPaginados = toursFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Función para manejar el cambio del término de búsqueda
  const manejarCambioBusqueda = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Lista de Tours</Typography>
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

      {/* Filtro de Estado */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="filtro-label">Filtrar por Estado</InputLabel>
        <Select
          labelId="filtro-label"
          value={filtro}
          label="Filtrar por Estado"
          onChange={manejarCambioFiltro}
        >
          <MenuItem value="todos">Todos los Tours</MenuItem>
          <MenuItem value="publicados">Tours Publicados</MenuItem>
          <MenuItem value="no_publicados">Tours No Publicados</MenuItem>
        </Select>
      </FormControl>

      {/* Campo de búsqueda */}
      <TextField
        fullWidth
        label="Buscar por nombre de tour, categoría o tipo"
        value={searchTerm}
        onChange={manejarCambioBusqueda}
        sx={{ mb: 3 }}
      />

      {/* Card que contiene la tabla */}
      <Card>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nombre Tour</strong></TableCell>
                    <TableCell><strong>Categoria</strong></TableCell>
                    <TableCell><strong>Estado</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toursPaginados.map((tour) => (
                    <TableRow key={tour.id_tour}>
                      <TableCell>{tour.nombre_tour}</TableCell>
                      <TableCell>{tour.nombre_categoria}</TableCell>
                      <TableCell>{tour.publicado === 1 ? 'Publicado' : 'No Publicado'}</TableCell>
                      <TableCell>
                        <a
                          href={DOMAIN_FRONT + 'acceso/tour/' + tour.id_tour}
                          color="primary"
                        >
                          Ver Tour
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={toursFiltrados.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={manejarCambioPagina}
        onRowsPerPageChange={manejarCambioFilasPorPagina}
      />
    </Box>
  );
}

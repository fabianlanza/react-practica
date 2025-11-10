import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  MenuItem,
  Box,
  Container,
  Paper,
  Divider,
  Chip,
  CircularProgress
} from "@mui/material";

export default function Divisa() {
  const [cantidad, setCantidad] = useState(""); //Lo que el usuario ingresa
  const [resultado, setResultado] = useState(0); //El resultado de la conversión
  const [modo, setModo] = useState("usdToLps");
  const [tasaCambio, setTasaCambio] = useState(26.23); // Valor por defecto
  const [cargando, setCargando] = useState(false);

  const API_KEY = "b2185bdace75fd85292492d0";

  // Llamar API cada vez que cambia el modo de conversión
  useEffect(() => {
    const fetchTasaCambio = async () => {
      setCargando(true);
      try {
        // Selecciona la API según el modo
        const url = modo === "usdToLps" 
          ? `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/HNL`
          : `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/HNL/USD`;
        
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        if (datos.result === "success") {
          setTasaCambio(datos.conversion_rate);
          console.log("Tasa de cambio obtenida:", datos.conversion_rate);
          // Reconvertir si ya hay una cantidad ingresada
          const numero = parseFloat(cantidad);
          if (!isNaN(numero) && numero > 0) {
            setResultado(numero * datos.conversion_rate);
          }
        }
      } catch (error) {
        console.error("Error al obtener la tasa de cambio:", error);
      } finally {
        setCargando(false);
      }
    };
    
    fetchTasaCambio();
  }, [modo]); // Se ejecuta cada vez que cambia el modo



  // Función para convertir la moneda
  const convertir = (valor) => {
    setResultado(valor * tasaCambio);
  };

  // Maneja el cambio en el campo de cantidad
  const handleChangeCantidad = (e) => {
    const valor = e.target.value;
    setCantidad(valor);

    const numero = parseFloat(valor);
    if (!isNaN(numero) && numero > 0) {
      convertir(numero);
    } else {
      setResultado(0);
    }
  };

  // Función que se llama cada vez que el usuario cambia el tipo de conversión
  const handleChangeModo = (e) => {
    const nuevoModo = e.target.value;
    setModo(nuevoModo); // Esto dispara el useEffect que obtiene la nueva tasa
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper 
        elevation={8}
        sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        }}
      >
        {/* Header con gradiente */}
        <Box sx={{ p: 3, textAlign: 'center', color: 'white' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
           💵 Conversor de Divisas
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Tipos de cambio actualizados en tiempo real
          </Typography>
        </Box>

        {/* Contenido principal */}
        <CardContent sx={{ bgcolor: 'white', p: 4 }}>
          {/* Selector de tipo de conversión */}
          <TextField
            select
            label="Tipo de conversión"
            value={modo}
            onChange={handleChangeModo}
            fullWidth
            variant="outlined"
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          >
            <MenuItem value="usdToLps">Dólares → Lempiras</MenuItem>
            <MenuItem value="lpsToUsd">Lempiras → Dólares</MenuItem>
          </TextField>

          {/* Campo de cantidad */}
          <TextField
            label={modo === "usdToLps" ? "Cantidad en USD" : "Cantidad en HNL"}
            type="number"
            fullWidth
            variant="outlined"
            value={cantidad}
            onChange={handleChangeCantidad}
            disabled={cargando}
            placeholder="0.00"
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: '1.2rem',
              }
            }}
            InputProps={{
              startAdornment: (
                <Typography sx={{ mr: 1, color: 'text.secondary', fontWeight: 'bold' }}>
                  {modo === "usdToLps" ? "$" : "L"}
                </Typography>
              ),
            }}
          />

          <Divider sx={{ my: 3 }}>
            <Chip 
              label="Resultado" 
              color="primary" 
              sx={{ fontWeight: 'bold' }}
            />
          </Divider>

          {/* Resultado */}
          <Box 
            sx={{ 
              bgcolor: 'grey.50', 
              p: 3, 
              borderRadius: 3,
              textAlign: 'center',
              minHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '2px solid',
              borderColor: 'primary.light',
            }}
          >
            {cargando ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={24} />
                <Typography color="text.secondary">
                  Cargando tasa de cambio...
                </Typography>
              </Box>
            ) : cantidad ? (
              <>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  color="primary"
                  sx={{ mb: 1 }}
                >
                  {modo === "usdToLps" ? "L " : "$ "}
                  {resultado.toLocaleString('es-HN', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {modo === "usdToLps" ? "Lempiras" : "Dólares"}
                </Typography>
              </>
            ) : (
              <Typography color="text.secondary" variant="h6">
                Ingrese una cantidad
              </Typography>
            )}
          </Box>

          {/* Tasa de cambio */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                bgcolor: 'grey.100', 
                py: 1.5, 
                px: 2, 
                borderRadius: 2,
                display: 'inline-block'
              }}
            >
              {cargando ? (
                "Actualizando..."
              ) : modo === "usdToLps" ? (
                <>
                  📊 <strong>1 USD</strong> = <strong>{tasaCambio.toFixed(4)} HNL</strong>
                </>
              ) : (
                <>
                  📊 <strong>1 HNL</strong> = <strong>{tasaCambio.toFixed(6)} USD</strong>
                </>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Paper>
    </Container>
  );
}
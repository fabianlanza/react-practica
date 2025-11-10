import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, MenuItem } from "@mui/material";

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
    <Card sx={{ maxWidth: 450, mx: "auto", mt: 5, p: 2, borderRadius: 5, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Conversor de Divisa
        </Typography>

        <TextField
          select
          label="Tipo de conversión"
          value={modo}
          onChange={handleChangeModo}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="usdToLps">Dólares → Lempiras</MenuItem>
          <MenuItem value="lpsToUsd">Lempiras → Dólares</MenuItem>
        </TextField>

        <TextField
          label="Cantidad"
          type="number"
          fullWidth
          variant="outlined"
          value={cantidad}
          onChange={handleChangeCantidad}
          disabled={cargando}
          sx={{ mb: 2 }}
        />

        {/* toLocaleString es para formatear el número según la configuración regional */}
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          {cargando ? (
            "Cargando tasa de cambio..."
          ) : cantidad ? (
            `Resultado: ${resultado.toLocaleString('es-HN', { minimumFractionDigits: 2 })} ${
                modo === "usdToLps" ? "Lps" : "USD"
              }`
          ) : (
            "Ingrese una cantidad"
          )}
        </Typography>

        <Typography color="text.secondary" align="center" sx={{ mt: 1 }}>
          {cargando ? (
            "Actualizando..."
          ) : modo === "usdToLps" ? (
            `Tipo de cambio: 1 USD = ${tasaCambio.toFixed(4)} Lps`
          ) : (
            `Tipo de cambio: 1 Lps = ${tasaCambio.toFixed(6)} USD`
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, MenuItem } from "@mui/material";

export default function Divisa() {
  const [cantidad, setCantidad] = useState(""); //Lo que el usuario ingresa
  const [resultado, setResultado] = useState(0); //El resultado de la conversión
  const [modo, setModo] = useState("usdToLps");
//   Cambiar fijo por valor de API
  const valorDolar = 26.23;

  // Función para convertir la moneda
  const convertir = (valor, modoActual) => {
    if (modoActual === "usdToLps") {
      setResultado(valor * valorDolar);
    } else {
      setResultado(valor / valorDolar);
    }
  };

  // Maneja el cambio en el campo de cantidad
  const handleChangeCantidad = (e) => {
    const valor = e.target.value;
    setCantidad(valor);

    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      convertir(numero, modo);
    } else {
      setResultado(0);
    }
  };

  // Función que se llama cada vez que el usuario cambia el tipo de conversión
  const handleChangeModo = (e) => {
    const nuevoModo = e.target.value; // Guardamos el modo seleccionado
    setModo(nuevoModo); // Actualizamos el estado "modo"

    // parseFloat convierte la cadena a número decimal
    const numero = parseFloat(cantidad);
    // Si el valor es un número válido, realiza la conversión
    if (!isNaN(numero)) {
      convertir(numero, nuevoModo);
    } else {
      setResultado(0);
    }
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
          sx={{ mb: 2 }}
        />

        {/* toLocaleString es para formatear el número según la configuración regional */}
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          {cantidad
            ? `Resultado: ${resultado.toLocaleString('es-HN', { minimumFractionDigits: 2 })} ${
                modo === "usdToLps" ? "Lps" : "USD"
              }`
            : "Ingrese una cantidad"}
        </Typography>

        <Typography color="text.secondary" align="center" sx={{ mt: 1 }}>
          Tipo de cambio: 1 USD = {valorDolar} Lps
        </Typography>
      </CardContent>
    </Card>
  );
}
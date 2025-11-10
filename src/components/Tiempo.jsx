import { useEffect, useState } from "react"
import './Tiempo.css'

export function Tiempo(){

    const [datosTiempo, setDatosTiempo] = useState(null);
    const [error, setError] = useState (null);
    const [buscar, setBuscar] = useState("La Ceiba");
    const [cargando, setCargando] = useState (true);

        const controladorInput = (evento) =>{
        if (evento.key === "Enter") {
            setBuscar(evento.target.value);
        }
    }
    
    useEffect(()=>{
        
        const miTiempo = async () => {
            setCargando(true);
            try {
                const responder = await fetch (`https://api.weatherapi.com/v1/current.json?key=9c8a160bfd394a3cabd53731252810&q=${buscar}&aqi=no`);
                const datosJson = await responder.json();
                setDatosTiempo(datosJson);
                console.log(datosJson);
            } catch (error) {
                setError(error.message)
            } finally {
                setCargando(false);
            }
            
        }
        miTiempo();
    },[buscar]);



    if (cargando) {
        return <div>Cargando...</div>;
    }
    return(
        <div className="contenedorTiempo">

                <input

                    className='inputBuscar'    
                    type = "text"
                    placeholder="Buscar Ciudad..."
                    onKeyDown={(e)=>controladorInput(e)}
                />

            <div className='tarjeta' >
                <img
                    src={datosTiempo.current.condition.icon}
                    // className="card-img-top"
                    alt={datosTiempo.current.condition.text}
                    // style={{width:'90px', margin:'auto'}}
                />
                <div className="cuerpoTarjeta">
                    <h1>{datosTiempo.current.temp_c} °C</h1>
                    <p className="lugar">{datosTiempo.location.name}, {datosTiempo.location.country}</p>
                    <p>{datosTiempo.current.condition.text}</p>
                </div>


            </div>
        </div>
    )
}

export default Tiempo;
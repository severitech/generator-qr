import { useRef, useState } from "react";

function Generator() {
    const [url, setUrl] = useState(""); // Estado para la URL
    const qrRef = useRef(null); // Referencia para el contenedor del QR
    const qrCodeInstance = useRef(null); // Referencia para la instancia del QR
  
    // Función para manejar cambios en el input
    const handleInputChange = (event) => {
      setUrl(event.target.value);
    };
  
    // Función para generar el código QR
    const generateQRCode = (event) => {
      event.preventDefault(); // Evita el comportamiento por defecto del formulario
  
      if (url.trim() === "") {
        // Si la URL está vacía, limpiamos el QR y mostramos una alerta
        if (qrCodeInstance.current) {
          qrCodeInstance.current.clear(); // Limpiar el código QR actual
        }
        // Limpiar el contenido del div
        if (qrRef.current) {
          qrRef.current.innerHTML = "";
        }
        alert("Por favor, introduzca una URL");
        return;
      }
  
      // Configura la URL de redirección con un mensaje específico
      const qrContent = url;
  
      // Cargar el script de CDN dinámicamente si aún no está cargado
      if (!qrCodeInstance.current) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
        script.onload = () => {
          qrCodeInstance.current = new window.QRCode(qrRef.current, {
            text: qrContent,
            width: 128,
            height: 128,
          });
        };
        document.body.appendChild(script);
      } else {
        // Si ya existe una instancia, actualizamos el QR
        qrCodeInstance.current.clear(); // Limpiar el código QR actual
        qrCodeInstance.current.makeCode(qrContent); // Crear un nuevo código QR con la URL actualizada
      }
    };
  
    return (
      <div className=" text-slate-300" >
        <h1 className="text-6xl">Generador de QR sin anuncios</h1>
        <form className = "content-center"onSubmit={generateQRCode}>
          <input className=" rounded-md " 
            type="text" 
            placeholder="Introducir URL" 
            value={url} 
            onChange={handleInputChange} 
          />
          <button type="submit">Generar QR</button>
        </form>
        <div id="QR" ref={qrRef}></div>  
      </div>
    );
}

export default Generator;

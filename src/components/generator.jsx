import { useRef, useState } from "react";
import Download from "./Download"; // Asegúrate de que la ruta sea correcta

function Generator() {
  const [url, setUrl] = useState("");
  const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);
  const [IsQRGenerated, setIsQRGenerated] = useState(false);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const generateQRCode = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    if (url.trim() === "") {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.clear();
      }
      // Limpiar el contenido del div
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
      }
      alert("Por favor, introduzca una URL");
      setIsQRGenerated(false);
      return;
    }

    // Configura la URL de redirección con un mensaje específico
    const qrContent = url;

    // Cargar el script de CDN dinámicamente si aún no está cargado
    if (!qrCodeInstance.current) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
      script.onload = () => {
        qrCodeInstance.current = new window.QRCode(qrRef.current, {
          text: qrContent,
          width: 256,
          height: 256,
        });
        setIsQRGenerated(true);
      };
      document.body.appendChild(script);
    } else {
      // Si ya existe una instancia, actualizamos el QR
      qrCodeInstance.current.clear(); // Limpiar el código QR actual
      qrCodeInstance.current.makeCode(qrContent); // Crear un nuevo código QR con la URL actualizada
    }
  };

  return (
    <div className="text-gray-300 bg-gradient-to-br from-gray-800 via-gray-900 to-black m-10 p-7 h-auto w-fit rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold text-gray-100 text-center">
        Insertar el link para generar el QR
      </h1>
      <form className="m-7" onSubmit={generateQRCode}>
        <textarea
          className="rounded-md w-full p-4 text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Introducir URL"
          value={url}
          onChange={handleInputChange}
        />
        <button
          className="mt-5 h-10 bg-teal-600 rounded-2xl w-full font-semibold hover:bg-teal-500 transition-all duration-300"
          type="submit"
        >
          Generar QR
        </button>
        <div className="flex justify-center pt-10">
          <div className="h-56 w-56" id="QR" ref={qrRef}></div>
        </div>
        {IsQRGenerated && <Download qrRef={qrRef} />}
      </form>
    </div>
  );
}

export default Generator;

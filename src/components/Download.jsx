
function Download({qrRef}) {
  const downloadQRCode = () => {
    const qrCanvas = qrRef.current.querySelector("canvas");
    if (qrCanvas) {
      // Convertir el canvas a una imagen en formato PNG
      const imageUrl = qrCanvas.toDataURL("image/png");

      // Crear un enlace temporal para descargar la imagen
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "codigo_qr.png"; // Nombre de la imagen descargada

      // Simular un clic en el enlace para iniciar la descarga
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Limpiar el enlace temporal
    } else {
      alert("No hay código QR generado para descargar.");
    }
  };

  return (
    <button
      onClick={downloadQRCode}
      className="mt-5 h-10 bg-teal-700 rounded-2xl w-full font-semibold hover:bg-teal-600 transition-all duration-300"
    >
      Descargar imagen
    </button>
  );
}

export default Download;


import Footer from "./components/Footer";
import Generator from "./components/generator";
export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <h1 className="mt-10 text-6xl text-gray-100 font-bold text-center drop-shadow-lg">
        Generador de QR sin anuncios
      </h1>
      <Generator />
      <Footer />
    </div>
  );
}

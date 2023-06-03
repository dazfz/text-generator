import GenForm from "./GenForm";
import "../app.css";

function App() {
  return (
    <>
      <h2 className="font-bold text-4xl text-gray-800 leading-tight max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        Generador de texto
      </h2>
      <main className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <GenForm></GenForm>
        </div>
      </main>
    </>
  );
}

export default App;

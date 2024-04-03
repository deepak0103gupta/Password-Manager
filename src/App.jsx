import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <Navbar />

        <div className="min-h-[87vh]">      
          <Manager />
        </div>

      <Footer />
    </>
  );
}

export default App;

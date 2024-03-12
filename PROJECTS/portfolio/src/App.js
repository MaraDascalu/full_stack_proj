import Footer from "./components/Footer/Footer.js";
import Header from "./components/Header/Header.js";
import Navbar from "./components/Navbar/Navbar.js";
import Services from "./components/Services/Services.js";
import Works from "./components/Works/Works.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Services />
      <Works />
      <Footer />
    </div>
  );
}

export default App;

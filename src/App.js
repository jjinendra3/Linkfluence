import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppState from "./context/AppState";

function App() {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
        <Navbar />
        <ToastContainer />
      </Router>
    </AppState>
  );
}

export default App;

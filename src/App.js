import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppState from "./context/AppState";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import Event from "./pages/Event";
import CompanyProduct from "./pages/CompanyProduct";
import Influencer from "./pages/Influencer";

function App() {
  return (
    <AppState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/posts" element={<Posts/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/event/:id" element={<Event/>} />
          <Route exact path="/company/:id" element={<CompanyProduct/>} />
          <Route exact path="/influencer/:id" element={<Influencer/>} />
        </Routes>
        <Navbar />
        <ToastContainer />
      </Router>
    </AppState>
  );
}

export default App;

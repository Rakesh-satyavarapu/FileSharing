import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import FileDownload from "./pages/FileDownload";
import Fileupload from "./pages/Fileupload";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">SecureShare</div>

        <nav className="nav">
          <NavLink to="/upload" className="nav-item">
            Upload
          </NavLink>

          <NavLink to="/download" className="nav-item">
            Download
          </NavLink>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Fileupload />} />
          <Route path="/upload" element={<Fileupload />} />
          <Route path="/download" element={<FileDownload />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        SecureShare © {new Date().getFullYear()}
      </footer>

    </div>
  );
}

export default App;
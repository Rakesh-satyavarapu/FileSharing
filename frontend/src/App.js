import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import FileDownload from "./pages/FileDownload";
import FileUpload from "./pages/Fileupload";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="logo">
          Share<span className="logo-accent">File</span>
        </div>

        <nav className="nav">
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Upload
          </NavLink>

          <NavLink
            to="/download"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Download
          </NavLink>
        </nav>

      </header>

      {/* MAIN CONTENT */}
      <main className="main">

        <div className="content">

          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/download" element={<FileDownload />} />
          </Routes>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        Easy File Sharing  © {new Date().getFullYear()}
      </footer>

    </div>
  );
}

export default App;
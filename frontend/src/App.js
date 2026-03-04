import './App.css';
import { Routes,Route,Link } from 'react-router-dom';
import FileDownload from './pages/FileDownload';
import Fileupload from './pages/Fileupload';

function App() {
  return (
    <div className="App">
    <Link to='/upload'>Upload</Link>
    <Link to='/download'>Download</Link>
    <Routes>
      <Route path='/upload' element={<Fileupload/>}/>
      <Route path='/download' element={<FileDownload/>}/>
    </Routes>
    </div>
  );
}

export default App;

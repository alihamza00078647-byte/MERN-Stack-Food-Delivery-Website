import './App.css'
import Navbar from './components/Navbar/navbar';
import Sidebar from './components/Sidebar/sidebar';

function App() {

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
      </div>
    </div>
  )
}

export default App;

import './App.css';
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ManageTasks from './components/ManageTasks';
import UpdateTasks from './components/updateTasks';

function App() {
  return (
    <div>
    <Router>
    
    <Routes>
      <Route exact path ="/" element={<Login/>}></Route>
      <Route exact path ="/addTasks" element={<ManageTasks/>}></Route>
      <Route exact path ="/signup" element={<Signup/>}></Route>
      <Route exact path ="/dashboard" element={<Dashboard/>}></Route>
      <Route exact path ="/updateTask/:id" element={<UpdateTasks/>}/>
    </Routes>
  </Router>
  </div>
  );
}

export default App;

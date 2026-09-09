import Navbar from "./components/navbar";
import Startcard from "./components/startcard";
import Welcome from "./components/welcome";
import TaskCard from "./components/taskcard"; import Dashboard from "./components/dashboard"; 
import './App.css';



function App() {
  return (
    <div>
      
      <Navbar />
      <Welcome /> 
      <Dashboard />
      
      

    </div>
  );


}
export default App;
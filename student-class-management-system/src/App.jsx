import "./App.css";

import Navbar from "./components/navbar";
import Welcome from "./components/welcome";
import Dashboard from "./components/dashboard";
import {Routes, Route} from "react-router-dom"
import Tasks from "./components/tasks";
import TaskDetails from "./components/taskdetails";
import { useState, useEffect } from "react";
function App(){

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/tasks")
    .then((response)=>response.json())
    .then((data)=>{
      setTasks(data);
    });
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks" element={<Tasks tasks={tasks} />} />
        <Route path="/tasks/:id" 
               element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;
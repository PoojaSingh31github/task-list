import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    // Fetch tasks when the component mounts
    getTasks();
  }, [search, refreshData]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token'), // Fix the typo here (change 'bearer' to 'Bearer')
    },
  };

  // get Tasks
  const getTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allTasks`); // Update the endpoint as needed
      console.log(response);
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error('Invalid data format received from the server:', response.data);
      }
    } catch (error) {
      console.error("Error in fetching tasks", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      // Delete task
      const response = await axios.delete(`${API_BASE_URL}/deleteTask/${id}`, config);
      console.log(response.data);
      toast.success(response.data.message);

      // Fetch updated tasks
      getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error(error.response.data.message);
    }
  };

  console.log(search);
  return (
    <>
      <Header setTasks={setTasks} tasks={tasks} setRefreshData={setRefreshData} refreshData={refreshData}/>
      <div className='dashboard-container'>
        <a href='/addTasks'>
          <button className="dashboard-button2">
            <div className="button__int">
              <span className="button__span">Add More Tasks</span>
            </div>
          </button></a>


        {tasks && tasks.map((task, index) => (
          <button key={index} className="dashboard-btn" type="button">
            <div>
              <strong>{task.title}  </strong>
              <p>{task.description}</p>
              <strong>Due Date: {task.dueDate}</strong>
            </div>

            <div id="dashboard-container-stars">
              <div id="dashboard-stars"></div>
            </div>
            <div id="dashboard-glow">
              <div className="dashboard-circle"></div>
              <div className="dashboard-circle"></div>
            </div>
            {/* task delete button */}

            <div className='Button-container'>
              <button className="Delete-Tasks-button" onClick={() => deleteTask(task._id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
              <Link to={`/updateTask/${task._id}`}><button className="Delete-Tasks-button">
                <i className="fa-solid fa-pen-to-square"></i>
              </button></Link>
            </div>
          </button>
        ))}
        <ToastContainer />
      </div>
    </>
  );
};

export default Dashboard;

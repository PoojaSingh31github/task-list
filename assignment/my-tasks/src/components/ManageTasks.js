import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';


const ManageTasks = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token'), // Fix the typo here (change 'bearer' to 'Bearer')
    },
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/addTask`, {title: taskData.title, description:taskData.description, dueDate:taskData.dueDate}, config);
      console.log(response.data);

      // Reset the form and loading state
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
      });
      setLoading(false);
      toast.success(response.data.message);
      if(response.data){
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
    <Header/>
    <div className="Manage_container">
    <div className="mainContainer">
      <div className="signupContainer">
        <div className="heading">add Tasks</div>
        <form action="" className="form" onSubmit={submithandler}>
          <input
            required
            className="input"
            type="text"
            name="title"
            id="name"
            placeholder="Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
          <input
            required
            className="input"
            type="text"
            name="title"
            id="name"
            placeholder="description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          />
          <input
            required
            className="input"
            type="date"
            name="title"
            id="name"
            placeholder="Due Date"
            value={taskData.dueDate}
            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
          />
          <input className="login-button" type="submit" value="Submit" />
          {loading ? (
            <div>
              {' '}
              <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </section>{' '}
            </div>
          ) : (
            ''
          )}
        </form>
        <ToastContainer />
      </div>
      
    </div>
    <a href='/dashboard'>
      <button className="ManageButton">
  See Tasks
</button></a>
    </div>
    </>
  );
};

export default ManageTasks;

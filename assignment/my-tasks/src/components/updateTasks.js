import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';


const UpdateTasks = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const { id } = useParams();
  console.log(id)

  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token'), // Fix the typo here (change 'bearer' to 'Bearer')
    },
  };

  const updateProduct = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/updateTask/${id}`, {title:taskData.title, description:taskData.description, dueDate:taskData.dueDate}, config);
      console.log(response);
      // Reset the form and loading state
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
      });
      setLoading(false);
      toast.success('Task updated successfully');
        window.location.href = "/dashboard";
    } catch (error) {
      console.error('Error in updating task:', error);
      setLoading(false);
      toast.error('Error updating task');
    }
  };

  return (
    <>
    <Header/>
    <div className="Manage_container">
    <div className="mainContainer">
      <div className="signupContainer">
        <div className="heading">Update Tasks</div>
        <form action="" className="form">
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
          <button className='login-button' onClick={() => updateProduct(id)}>
                            Update Product
                        </button>
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

export default UpdateTasks;

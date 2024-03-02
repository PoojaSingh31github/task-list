import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Header = ({ setTasks, tasks, refreshData, setRefreshData }) => {


  console.log(tasks, "task is here in header");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout successful!');
    navigate('/');
  };

  return (
    <>
      <div className="Header-button-container">
        {localStorage.getItem('token') ? (
          <>
            <button className="header-button">
              <a href='/dashboard'><i class="fa-solid fa-house"></i></a>
            </button>
            <button className="header-button">
              <div class="group">
                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input placeholder="Search" type="search" class="input" onChange={(e) => {
                const data = [...tasks];
                if (e.target.value === '') {
                  setRefreshData(!refreshData);
                } else {
                  const filtered = data.filter((coupon) =>
                    coupon.title.toLowerCase().includes(e.target.value.toLowerCase()),
                  );
                  setTasks(filtered);
                }
              }}  />
              </div>
            </button>

            <button className="header-button" onClick={handleLogout}>
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </>
        ) : (
          <>
            <button className="header-button"> <a href='/signup'>
              <i class="fa-solid fa-user-plus"></i>
            </a> </button>

            <button className="header-button">
              <a href='/'> <i class="fa-solid fa-right-to-bracket"></i></a>
            </button>
          </>
        )}

      </div>
      <ToastContainer />
    </>
  )
}

export default Header;
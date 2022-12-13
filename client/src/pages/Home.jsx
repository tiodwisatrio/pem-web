import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {


  const navigate = useNavigate();

  //  Fungsi untuk mengecek apakah ada user-info di local storage, jika tidak ada maka akan di redirect ke halaman login
  const clearLocalStorage = () => {
    if (!localStorage.getItem("user-info")) {
      navigate("/");
    }
  };

  // Jalankan fungsi clearLocalStorage ketika component di tampilkan pertama kali
  useEffect(() => {
    clearLocalStorage();
  }, []);

  // Fungsi untuk menghapus user-info di local storage dan redirect ke halaman login (logout)
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-10">
        <h1 className="text-center">Home</h1>
        <button onClick={handleLogout} className="bg-rose-500 text-center">
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;

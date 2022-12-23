import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    setData(response.data);
  };

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
    loadData();
  }, []);

  // Fungsi untuk menghapus user-info di local storage dan redirect ke halaman login (logout)
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fungsi untuk menghapus data user berdasarkan id
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      axios.delete(`http://localhost:8080/api/delete/${id}`);
      setTimeout(() => navigate(), 100);
    } else {
      setTimeout(() => navigate(), 100);
    }
  }

  return (
    <>
      <div className="flex items-center flex-row justify-between mx-24 my-16">
        <h1 className="text-center">Welcome back👋</h1>
        <button
          onClick={handleLogout}
          className="bg-rose-500 text-center px-6 py-2 text-white font-medium rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-4">
        <div className="flex justify-center items-center mt-10">
          <div className="-translate-y-6">
            <h1 className="mb-4 font-bold">Data Tabel Users</h1>
            <table>
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="text-start px-10 py-2">No</th>
                  <th className="text-start px-10 py-2">Nama Lengkap</th>
                  <th className="text-start px-10 py-2">Tanggal Lahir</th>
                  <th className="text-start px-10 py-2">Username</th>
                  <th className="text-center px-10 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={item.id} className="border border-gray-300">
                      <td className="text-start px-10 py-5" scope="row">
                        {index + 1}
                      </td>
                      <td className="text-start px-10 py-5 border border-gray-300">
                        {item.nama}
                      </td>
                      <td className="text-start px-10 py-5 border border-gray-300">
                        {item.tanggal_lahir}
                      </td>
                      <td className="text-start px-10 py-5 border border-gray-300">
                        {item.username}
                      </td>
                      <td className="text-start px-10 py-5 border border-gray-300">
                        <Link
                          to={`/update/${item.id}`}
                          className="bg-orange-600 text-white rounded px-5 py-3 border-none"
                        >
                          Edit
                        </Link>
                        <span className="mx-2"></span>
                        <Link
                          to={`/delete/${item.id}`}
                          onClick={() => handleDelete(item.id)}
                          className="bg-rose-600 text-white rounded px-5 py-3 border-none"
                        >
                          Delete
                        </Link>
                        <span className="mx-2"></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  nama: "",
  tangga_lahir: "",
  username: "",
  password: "",
};

const Update = () => {
  const [state, setState] = useState(initialState);
  const { nama, tanggal_lahir, username, password } = state;
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/get/${id}`).then((response) => {
      setState({ ...response.data[0] });
    });
  }, []);

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/update/${id}`, {
      nama,
      tanggal_lahir,
      username,
      password,
    });
    setTimeout(() => {
      alert("Data berhasil diupdate");
      navigate("/home");
    }, 1000);
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col w-full h-full">
        <h1 className="text-center m-6 text-2xl font-bold text-teal-600">
          Update Data User
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-80 md:w-96 h-full p-6 md:p-8 gap-y-6 rounded-lg bg-white shadow-xl"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[14px] mb-1 text-left">
              Nama Lengkap
            </label>
            <input
              required
              type="text"
              autoComplete="off"
              placeholder="contoh : Tio Dwi Satrio"
              onChange={handleChange}
              name="nama"
              value={nama || ""}
              className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[14px] mb-1 text-left">
              Tanggal Lahir
            </label>
            <input
              required
              type="text"
              autoComplete="off"
              placeholder="contoh : 27 Juni 2002"
              onChange={handleChange}
              name="tanggal_lahir"
              value={tanggal_lahir || ""}
              className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[14px] mb-1 text-left">
              Username
            </label>
            <input
              required
              type="text"
              autoComplete="off"
              placeholder="contoh : tiodwisatrio"
              onChange={handleChange}
              name="username"
              value={username || ""}
              className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[14px] mb-1 text-left">
              Password
            </label>
            <input
              required
              type="password"
              autoComplete="off"
              placeholder="password..."
              onChange={handleChange}
              name="password"
              value={password || ""}
              className="placeholder:text-[13px] text-[13px] px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-teal-600 px-3 py-2 text-[14px] text-white font-semibold rounded cursor-pointer hover:bg-teal-700 transition-all"
          >
            Update
          </button>
          <div className="flex items-center justify-center gap-x-1">
            <span className="text-center text-sm">
              Tidak jadi mengubah data?{" "}
            </span>
            <Link to={"/home"}>
              <p className="text-sm text-teal-600 font-medium">Kembali</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;

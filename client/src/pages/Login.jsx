import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/home");
    }
  })

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:8080/api/login", inputs);
    localStorage.setItem("user-info", JSON.stringify(data));
    navigate("/home");

  }

  // console.log(inputs);

  return (
    <>
      <div className="flex items-center justify-center flex-col w-full h-full">
        <h1 className="text-center m-10 text-2xl font-bold text-teal-600">
          Login
        </h1>
        <form className="flex flex-col justify-center w-80 md:w-96 h-full p-6 md:p-8 gap-y-6 rounded-lg bg-white shadow-xl mt-3">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[14px] mb-1 text-left">
              Username
            </label>
            <input
              required
              name="username"
              onChange={handleChange}
              type="text"
              autoComplete="off"
              placeholder="username..."
              className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[14px] mb-1 text-left">
              Password
            </label>
            <input
              required
              name="password"
              onChange={handleChange}
              type="password"
              autoComplete="off"
              placeholder="password..."
              className="placeholder:text-[13px] text-[13px] px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-teal-600 px-3 py-2 text-[14px] text-white font-semibold rounded cursor-pointer hover:bg-teal-700 transition-all"
          >
            Login
          </button>

          <div className="flex items-center justify-center gap-x-1">
            <span className="text-center text-sm">Belum punya akun? </span>
            <Link to={"/register"}>
              <p className="text-sm text-teal-600 font-medium">Register</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/apiClient";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await apiFetch(`/auth/login`, {
        method: "POST",
        // headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.jwtToken);

      console.log("JWT Token stored in localStorage");

      const userResponse = await apiFetch('/auth/profile');
      const userData = await userResponse.json();

      setUser(userData);

      console.log("Logged in user:", userData);
      console.log("logged in");

      navigate("/dashboard");
      console.log("Navigated to dashboard");
    }
    catch (error) {
      if (error.message === "AUTH_EXPIRED") {
      return;
    }
    if (error.message === "INVALID_CREDENTIALS") {
      alert("Invalid email or password");
      return;
    }
    alert("Something went wrong. Please try again.");
    console.error(error);
  }

  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen">
      <img src="src/assets/ck.png" alt="CloudKeeper_Logo" className="w-56" />
      
      <form className="flex flex-col justify-center gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-2">
          <label className="text-gray-600 font-medium">Email</label>
          <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-500 p-2 rounder w-110"
              />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <label className="text-gray-600 font-medium">Password</label>
          <input
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
              className="border border-gray-500 p-2 rounder w-110"
            />
          <h3 className="text-sky-600 text-right font-semibold">Forgot password?</h3>
        </div>
        <button className="bg-sky-600 text-white font-bold p-3 rounded w-110" type="submit">LOGIN</button>
      </form>
    </div>
  );
}

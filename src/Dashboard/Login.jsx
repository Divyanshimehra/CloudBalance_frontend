import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("role");
  if (isLoggedIn) {
    return <Navigate to="/dashboard/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents page refresh

    // mock login for now
    localStorage.setItem("role", "admin");
    // localStorage.setItem("role", "readonly");
    // localStorage.setItem("role", "customer");


    navigate("/dashboard/");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 min-h-screen">
      <img src="src/assets/ck.png" alt="CloudKeeper_Logo" className="w-56" />
      
      <form className="flex flex-col justify-center gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-2">
          <label className="text-gray-600 font-medium">Email</label>
          <input className="border border-gray-500 p-2 rounder w-110" type="email" name="email" required/>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <label className="text-gray-600 font-medium">Password</label>
          <input className="border border-gray-500 p-2 rounder w-110" type="password" name="password" required />
          <h3 className="text-sky-600 text-right font-semibold">Forgot password?</h3>
        </div>
        <button className="bg-sky-600 text-white font-bold p-3 rounded w-110" type="submit">LOGIN</button>
      </form>
    </div>
  );
}

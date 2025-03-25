import React from "react";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router";
import NavBar from "../../components/navbar/NavBar";
export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formRegister));
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      formRegister.reset();
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      formRegister.reset();
      navigate("/");
    }
  };
  return (
    <>
      <NavBar />
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="signup-container">
          <h2 className="signup-title">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control-signup rounded p-2  w-100"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control-signup rounded p-2  w-100"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn signup-btn">
              Sign In
            </button>
          </form>
          <p className="login-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </>
  );
}

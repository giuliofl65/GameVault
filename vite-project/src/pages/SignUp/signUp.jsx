import React from "react";
import supabase from "../../supabase/client";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router";
import NavBar from "../../components/navbar/NavBar";
export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { first_name, last_name, username, email, password } = Object.fromEntries(new FormData(formRegister));
    let { error } = await supabase.auth.signUp({
      email,
      password,
      options : {
        data: {
          first_name,
          last_name,
          username,
        }
      }
    });
    if (error) {
      formRegister.reset();
      toast.error(error.message);
    } else {
      toast.success("Account created successfully");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      formRegister.reset();
      navigate("/");
    }
  };
  return (
    <>
      <NavBar />
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="signup-container  ">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="first_name"
                className="form-control-signup rounded p-2 w-100"
                placeholder="FirstName" id="first_name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="last_name"
                className="form-control-signup rounded p-2 w-100"
                placeholder="LastName" id="last_name"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className="form-control-signup rounded p-2 w-100"
                placeholder="Username" id="username"
                required
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link href="/signin">Sign In</Link>
          </p>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </>
  );
}

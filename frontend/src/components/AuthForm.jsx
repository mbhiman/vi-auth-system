import { useState, useContext } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import SocialButton from "./SocialButton";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


export default function AuthForm() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    const [isSignup, setIsSignup] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        login({ email: form.email });
        navigate("/");
    }


    return (
        <div className="auth-form">

            <h2>{isSignup ? "Create your account" : "Welcome to Vi Solution"}</h2>

            <SocialButton icon={<FaGoogle />} text="Continue with Google" />
            <SocialButton icon={<FaGithub />} text="Continue with GitHub" />

            <div className="divider">or</div>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button className="primary-btn">
                    {isSignup ? "Sign up" : "Sign in"}
                </button>
            </form>

            <p className="toggle">
                {isSignup ? "Already have an account?" : "Don't have an account?"}
                <span onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? " Sign in" : " Sign up"}
                </span>
            </p>
        </div>
    );
}

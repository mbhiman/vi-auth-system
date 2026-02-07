import AuthForm from "../../components/AuthForm";
import Footer from "../../components/Footer";
import vi_logo from "../../assets/images/vi_logo.png"
import "./auth.css";

export default function AuthPage() {
    return (
        <div className="auth-wrapper">
            <main className="auth-main">
                <div className="auth-left">
                    <img src={vi_logo} alt="Vi Solution Logo" className="big-logo" />
                </div>

                <div className="auth-right">
                    <AuthForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}

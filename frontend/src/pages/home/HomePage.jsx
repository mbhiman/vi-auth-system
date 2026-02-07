import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

export default function HomePage() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#000",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <h1>Welcome{user?.email ? `, ${user.email}` : ""}</h1>

            <button
                onClick={logout}
                style={{
                    padding: "10px 20px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#1d9bf0",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </div>
    );
}

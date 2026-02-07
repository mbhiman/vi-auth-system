export default function SocialButton({ icon, text, onClick }) {
    return (
        <button className="social-btn" onClick={onClick}>
            <span className="icon">{icon}</span>
            {text}
        </button>
    );
}

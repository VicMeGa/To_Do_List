import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login yeah");
            navigate("/home"); // Navega a la página de inicio ( To Do List)
        } catch (error) {
            alert("Error: " + error.message);
        }
    };
    const goToRegister = () => {
        navigate("/Register"); // Navega a la página de registro
    };
    return (
        <div className="todo-list">
            <form onSubmit={handleLogin}>
                <h1>To Do List</h1>
                <h2>Member Login</h2>
                <input
                    type="email"
                    className="login-text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="login-text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br/>
                <button className="button-blue" type="submit">Login</button>
                <br />
                <br />
                <button className="button-blue" type="button" onClick={goToRegister}>
                    Create an account
                </button>
            </form>
        </div>
    );
};

export default Login;

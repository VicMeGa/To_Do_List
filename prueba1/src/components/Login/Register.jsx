import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Correct sign up");
            navigate("/");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="todo-list">
        <form onSubmit={handleRegister}>
            <h2>Create an account</h2>
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
                <br />
            <br/>
            <button className="button-blue" type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default Register;
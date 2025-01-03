//import React from "react";
import { useState } from "react";
import { auth } from "./Firebase/firebaseConfig"; 
import { db } from "./Firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";
const FormTodo = props => {
    const { handleAddItem } = props;
    const [description, setDescription] = useState("");
    const handleSubmit = e => {
        e.preventDefault(); //(E)
        // Crear nueva tarea en Firebase
        const user = auth.currentUser;
        const userId = user.uid;
        if (!userId) {
            console.error("El usuario no está autenticado.");
            return;
        }

        const tasksRef = ref(db, `users/${userId}/Tasks`);
        const newTaskRef = push(tasksRef);
        set(newTaskRef, {
            id: newTaskRef.key,
            description,
            done: false
        });

        setDescription("");
    }
    return (
        <form onSubmit={handleSubmit}>
            {/*{D}*/}
            <div className="todo-list">
                <div className="file-input">
                    <input type="text" className="text" value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <button className="button-pink" disabled={description ? "" : "disable"}>
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormTodo;
// import React from "react
import { useState, useEffect } from "react";
import FormTodo from "./FormTodo.jsx"
import TaskList from "./TaskList.jsx"
import Titulo from "./Titulo.jsx"
import { auth } from "./Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Container = () => {
    const [list, setList] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleAddItem = addItem => {
        setList([...list, addItem]);
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, []);


    const handleSignOut = () => {
        signOut(auth).then(() => {
            // El usuario se ha desconectado exitosamente
            console.log('Usuario desconectado');
            // Aquí puedes actualizar el estado de autenticación localmente
            setIsAuthenticated(false);
            // Puedes redirigir al usuario a la página de inicio o login
            navigate('/');
        }).catch((error) => {
            console.error('Error al desconectar:', error);
        });
    };

    return (
        <div className="container">
            <Titulo />
            <FormTodo handleAddItem={handleAddItem} />
            <TaskList list={list} setList={setList} />
            <button className="button-blue"  onClick={handleSignOut}>Log Out</button>
        </div>
    );
};

export default Container;
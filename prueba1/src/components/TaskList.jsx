import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, update, remove } from "firebase/database";
import Checkbox from "./Checkbox";
import { auth, db } from "./Firebase/firebaseConfig";

const TaskList = ({ list, setList }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Fetch tasks when user is authenticated
    useEffect(() => {
        if (!user) return;

        setIsDataLoading(true); //Cargando datos
        const tasksRef = ref(db, `users/${user.uid}/Tasks`);
        const unsubscribe = onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            const tasks = data
                ? Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }))
                : [];
            setList(tasks);
            setIsDataLoading(false); // Datos cargados
        });

        return () => unsubscribe();
    }, [user, setList]);

    const onChangeStatus = (e) => {
        const { name, checked } = e.target;
        if (!user) return;

        const taskRef = ref(db, `users/${user.uid}/Tasks/${name}`);
        update(taskRef, { done: checked });
    };

    const onClickRemoveItem = () => {
        if (!user) return;

        list.forEach((item) => {
            if (item.done) {
                const taskRef = ref(db, `users/${user.uid}/Tasks/${item.id}`);
                remove(taskRef);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="cargando">
                {/* flex justify-center items-center */ }
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!user) {
        return <div>Please log in to view tasks</div>;
    }

    const chk = list.map(item => (
        <Checkbox key={item.id} data={item} onChange={onChangeStatus} />
    ));

    return (
        <div className="todo-list">
            {/* Mostrar loading mientras se cargan los datos */}
            {isDataLoading ? (
                <div className="text-center py-4">
                    Cargando tareas<span className="loading-dots"></span>
                </div>
            ) : (
                <>
                    {/*(A-1) */}
                    {list.length ? chk : "No task"}
                    {/*(B) */}
                    {list.length ? (
                        <p>
                            <button className="button-blue" onClick={onClickRemoveItem}>
                                Delete selected
                            </button>
                        </p>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default TaskList;
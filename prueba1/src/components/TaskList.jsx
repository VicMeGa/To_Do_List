//import React from "react";
// import { useState } from "react";
import { useEffect } from "react";
import Checkbox from "./Checkbox";
import { auth } from "./Firebase/firebaseConfig";
import { db } from "./Firebase/firebaseConfig";
import { ref, onValue, update, remove } from "firebase/database";

const TaskList = ({ list, setList }) => {
    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const tasksRef = ref(db, `users/${userId}/Tasks`);
        onValue(tasksRef, snapshot => {
            const data = snapshot.val();
            const tasks = data
                ? Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }))
                : [];
            setList(tasks);
        });
    }, [setList]);
    //(D)
    const onChangeStatus = e => {
        const { name, checked } = e.target;
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const taskRef = ref(db, `users/${userId}/Tasks/${name}`);
        update(taskRef, { done: checked });
    };


    const onClickRemoveItem = () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        list.forEach(item => {
            if (item.done) {
                const taskRef = ref(db, `users/${ userId }/Tasks/${item.id}`);
                remove(taskRef);
            }
        });
    };
    //(A-2)
    const chk = list.map(item => (
        <Checkbox key={item.id} data={item} onChange={onChangeStatus} />
    ));

    return (
        <div className="todo-list">
            {/*(A-1) */}

            {list.length ? chk : "No task"}

            {/*(B) */}
            {list.length ? (
                <p>
                    <button className="button-blue" onClick={onClickRemoveItem }>
                        Delete selected
                    </button>
                </p>
            ):null}
        </div>
    )
}

export default TaskList;
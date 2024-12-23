// import React from "react
import { useState } from "react";
import FormTodo from "./FormTodo.jsx"
import TaskList from "./TaskList.jsx"

const Container = () => {
    const [list, setList] = useState([]);

    const handleAddItem = addItem => {
        setList([...list, addItem]);
    };
    return (
        <div>
            <FormTodo handleAddItem={handleAddItem} />
            <TaskList list={list} setList={setList} />
        </div>
    );
};

export default Container;
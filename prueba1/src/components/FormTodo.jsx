//import React from "react";
import { useState } from "react";

const FormTodo = props => {
    const { handleAddItem } = props;
    const [description, setDescription] = useState("");
    const handleSubmit = e => {
        e.preventDefault(); //(E)
        handleAddItem({
            done: false,
            id: (+new Date()).toString(),
            description
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
                    <button className="button pink" disabled={description ? "" : "disable"}>
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormTodo;
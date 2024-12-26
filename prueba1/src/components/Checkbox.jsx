// import React from "react";
import { Fragment } from "react";


const Checkbox = props => {
    const {
        onChange,
        data: { id, description, done }
    } = props;
    return (
        <Fragment>
            {/**/ }
            <label className="todo new-item">
                <input className="todo-state" name={id} type="Checkbox"
                    defaultChecked={done} onChange={onChange} label={description}/>
                <div className="todo-text">{description}</div>
            </label>
        </Fragment>
    )
}

export default Checkbox;
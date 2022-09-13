import React from "react"
import * as Icon from 'react-bootstrap-icons'

export default function Item(props) {

    let itemStyle = {
        backgroundColor: props.category === "personal" ? "#cfd2ff" : props.category === "work" ? "#cfffd3" : "#f4d4fa"
    }

    const categoryCaption = props.category[0].toUpperCase() + props.category.slice(1)


    return (
            <div className="card" style={itemStyle}>
                <div className="card-body">
                    <div>
                        {props.edit ?
                            <input value={props.editData.title} onChange={props.editChange} name="title" className="form-control editInput" /> :
                            <h2 className="todoTitle">{props.title}</h2>}

                        {props.edit ?
                            <textarea value={props.editData.desc} onChange={props.editChange} name="desc" className="form-control editTextArea" /> :
                            <p className="todoDesc">{props.desc}</p>}

                        {props.edit ?
                            <div className="spacer">
                                <select value={props.editData.category} onChange={props.editChange} name="category" className="form-select editSelection">
                                    <option value="personal">Personal</option>
                                    <option value="work">Work</option>
                                    <option value="other">Other</option>
                                </select>
                            </div> :
                            ""}
                    </div>

                    <div className="itemBottom">

                        {props.edit ?
                            <button type="button" className="btn btn-success delBtn littleBtn" onClick={(e) => props.editSubmit(e, props.id)}><Icon.CheckLg /></button> :
                            <button type="button" className="btn btn-primary delBtn littleBtn" onClick={(e) => props.pinItem(e, props.title, props.desc, props.category, props.id)}><Icon.Pin /></button>
                        }

                        {props.editMode ?
                            "" :
                            <button type="button" className="btn btn-light littleBtn editBtn" onClick={(e) => props.toggleEditOn(e, props.id)}><Icon.Pencil /></button>}


                        {props.edit ?
                            <button type="button" className="btn btn-secondary delBtn" onClick={(e) => props.toggleEditOff(e, props.id)}><Icon.XLg /></button> :
                            <button type="button" className="btn btn-danger delBtn" onClick={(e) => props.deleteItem(e, props.id)}><Icon.Trash /></button>}

                        {props.edit ? "" : <p className="bottomCaption">{categoryCaption}</p>}


                    </div>
                </div>
            </div>
    )
}
import React from "react"
import * as Icon from 'react-bootstrap-icons'

export default function Item(props) {

    const itemStyle = {
        backgroundColor: props.category === "personal" ? "#cfd2ff" : "#cfffd3"
    }

    return (
        <div className="card" style={itemStyle}>
            <div className="card-body">
                <div>
                    <h2 className="todoTitle">{props.title}</h2>
                    <p className="todoDesc">{props.desc}</p>
                </div>
                <div>
                    <button type="button" className="btn btn-primary delBtn littleBtn" onClick={(e) => props.pinItem(e, props.title, props.desc, props.category, props.id)}><Icon.Pin /></button>
                    <button type="button" className="btn btn-danger delBtn" onClick={(e) => props.deleteItem(e, props.id)}><Icon.Trash /></button>
                </div>
            </div>
        </div>
    )
}
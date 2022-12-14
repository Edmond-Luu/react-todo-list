import React from "react"
import * as Icon from 'react-bootstrap-icons'

export default function PinnedItem(props) {
    let itemStyle = {
        backgroundColor: props.category === "personal" ? "#cfd2ff" : props.category === "work" ? "#cfffd3" : "#f4d4fa"
    }

    const categoryCaption = props.category[0].toUpperCase() + props.category.slice(1)

    return (
        <div className="card pinnedCard" style={itemStyle}>
            <div className="card-body">
                <div>
                    <h2 className="todoTitle">{props.title}</h2>
                    <p className="todoDesc">{props.desc}</p>
                </div>
                <div className="itemBottom">
                    <button type="button" className="btn btn-warning delBtn littleBtn" onClick={(e) => props.unpinItem(e, props.title, props.desc, props.category, props.id)}><Icon.PinAngle /></button>
                    <button type="button" className="btn btn-danger delBtn" onClick={(e) => props.deletePinnedItem(e, props.id)}><Icon.Trash /></button>
                    <p className="bottomCaption">{categoryCaption}</p>
                </div>
            </div>
        </div>
    )
}

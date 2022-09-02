import React from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function SubmissionForm(props) {

    return (
        <div>
            <form>
                <h1>React - Todo List</h1>
                {/* <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" onChange={props.handleChange} name="title" value={props.listData.title} />
                    <label htmlFor="floatingInput">Title (Required)</label>
                </div> */}

                <FloatingLabel label="Title (Required)" className="form-floating">
                    <Form.Control type="text" placeholder="" id="floatingInput" onChange={props.handleChange} name="title" value={props.listData.title} />
                </FloatingLabel>


                {/* <div className="form-floating">
                    <textarea className="form-control" id="floatingTextarea2" onChange={props.handleChange} name="desc" value={props.listData.desc} />
                    <label htmlFor="floatingTextarea2">Description</label>
                </div> */}

                <FloatingLabel controlId="floatingTextarea2" label="Description">
                    <Form.Control as="textarea" placeholder="" id="floatingTextarea2" onChange={props.handleChange} name="desc" value={props.listData.desc} />
                </FloatingLabel>

                {/* <div className="form-floating">
                    <select className="form-select form-control" id="floatingSelect" name="category" onChange={props.handleChange} value={props.listData.category}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="floatingSelect">Category</label>
                </div> */}

                <FloatingLabel controlId="floatingSelect" label="Category" className="form-floating">
                    <Form.Select className="form-select form-control" id="floatingSelect" name="category" onChange={props.handleChange} value={props.listData.category}>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </FloatingLabel>

                <div className="formButton">
                    <button type="button" className="btn btn-success formButton" onClick={props.handleClick} disabled={props.listData.title === '' ? true : false}>Submit</button>
                    <button type="button" className="btn btn-danger formButton" onClick={props.handleClear} disabled={props.listData.title === '' && props.listData.desc === '' ? true : false}>Clear</button>
                </div>
            </form>
        </div>
    )
}





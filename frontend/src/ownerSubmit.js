import React from "react";
import DatePicker from "react-datepicker";
import { MonToNum, MonToStr } from './Components/monthConvert.js'
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, Col, Form } from 'react-bootstrap/dist/react-bootstrap.js'
import axios from "axios";
const scFunctions = require("./Components/scFunctions"); 
// what this class will do is a direct submit to smart contract
class OwnerSubmit extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validated: false
        }
    }

    handlePropertySubmit = event => {
        event.preventDefault()
 
        var prop = {
            status: 0,
            location: event.target.elements.location.value,
            rentee: "empty",
            company: "empty",
            price: parseInt(event.target.elements.price.value,10),
            start: 0,
            end: 0,
            image: "./images/99.jpg"
        }
        if (event.target.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true }); 
        if (event.target.checkValidity() === true) {
            axios.post("http://localhost:3001/api/property", {
                property: prop
            });
        }
    }
    render() {
        return (
            <Container style= {{ marginTop: 30 }}> 
                <Form noValidate validated={this.state.validated} onSubmit={e=> this.handlePropertySubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} md="3" style={{marginRight:50}}>
                            <Form.Label> First Name</Form.Label>
                            <Form.Control
                            id="firstName"
                            type="text"
                            placeholder="Lev"
                            required
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                            id="lastName"
                            type="text"
                            placeholder="Myshkin the Prince"
                             />
                        </Form.Group>
                    </Form.Row> 
                    <Form.Row>
                        <Form.Group as={Col} md="7" > 
                            <Form.Control type="text" placeholder="Location" id="location" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter a location.
                            </Form.Control.Feedback>
                            </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="3" style={{marginRight:50}}> 
                            <Form.Control type="text" pattern="[0-9]*" placeholder="Company" id="company" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter where the property was rented. 
                            </Form.Control.Feedback>
                        </Form.Group> 
                        <Form.Group as={Col} md="3"> 
                            <Form.Control type="text" pattern="[0-9]*" placeholder="Price" id="price" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter a price for the property. 
                            </Form.Control.Feedback>
                        </Form.Group> 
                    </Form.Row>
                    <Button type="submit">Submit Property</Button>
                </Form> 
            </Container>
    )
    }
}

export default OwnerSubmit; 
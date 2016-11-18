/**
 * Created by Grant on 11/10/16.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Jumbotron, Button, FormControl, FormGroup, InputGroup, Form } from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render () {
        return jumbotronInstance(this);
    }
}

const jumbotronInstance = (props) => (
    <div>
        <Jumbotron>
            <h1>Nintex URl Shortener</h1>
            <p>This is a simple URL shortening service.</p>
            <p>It will take a regular URL and shorten it or take a already shortened URL and give you the regular. </p>
            <Form inline onSubmit={props.handleSubmit}>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" placeholder="Paste Link" onChange={props.handleChange}/>
                        <InputGroup.Button>
                            <Button bsStyle="primary" type="submit">Shorten</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Form>
        </Jumbotron>
    </div>
);


export default App;

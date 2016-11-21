/**
 * Created by Grant on 11/10/16.
 */
import React from 'react';
import hitch from './base/hitch';
import { Jumbotron, Button, FormControl, FormGroup, InputGroup, Form, Modal } from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            value: '',
            shortUrlObject: {},
            showModal: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    submitUrlForShortening() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/create', true);

        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = hitch(this, function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                var shortUrlObject = JSON.parse(xhr.response),
                    shortMessage = 'Your shortened URL is: ',
                    longMessage = 'Your original URL is: ';

                if (shortUrlObject && shortUrlObject.ShortUrl) {
                    this.setState({
                        shortUrlObject: shortUrlObject,
                        modalHeader: (shortUrlObject.ShortUrlAsPartitionKey ? longMessage : shortMessage),
                        message: (shortUrlObject.ShortUrlAsPartitionKey ? shortUrlObject.Url : shortUrlObject.ShortUrl),
                        showModal: true
                    });
                }
            }
        });

        xhr.send(JSON.stringify({url: this.state.value}));
    }

    closeModal(event) {
        this.setState({
            showModal: false,
            value: ''
        });
    }

    handleSubmit(event) {
        this.submitUrlForShortening();
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value.trim() });
    }

    render () {
        return jumbotronInstance(this);
    }
}

const jumbotronInstance = (props) => (
    <div style={{width: "800px", margin: "auto"}}>
        <Jumbotron style={{padding: "20px"}}>
            <h1>GLHBit URl Shortener</h1>
            <p>This is a simple URL shortening service.</p>
            <p>It will take a regular URL and shorten it or take a already shortened URL and give you the regular. </p>
            <Form inline onSubmit={props.handleSubmit}>
                <FormGroup style={{width: "100%"}}>
                    <InputGroup style={{width: "100%"}}>
                        <FormControl value= {props.state.value} ref= "linkInput" type="text" placeholder="Paste Link" onChange={props.handleChange}/>
                        <InputGroup.Button>
                            <Button ref="submitButton" bsStyle="primary" type="submit">Shorten</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
                {props.state.showMessage ? <p>{props.state.message}</p> : null}
            </Form>
        </Jumbotron>
        <Modal show={props.state.showModal} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.state.modalHeader}</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>{props.state.message}</p></Modal.Body>
            <Modal.Footer>
                <Button onClick={props.closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
);


export default App;

// QueryDetails.jsx
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { db } from "../firebase";

class QueryDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    constructor(props) {
        super(props);
        console.log(String(this.props.designNumber))
        this.ref = db.collection('design').where('DESIGN_NO', '==', String(this.props.designNumber));
        this.unsubscribe = null;
        this.state = {
          options: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const options = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            //const { title, description, author } = doc.data();
            options.push({
                key: doc.id,
                //doc, // DocumentSnapshot
                text: doc.data().DESIGN_NO,
                value: doc.data().DESIGN_NO,
            });
        });
        this.setState({
            options
        });
        console.log(options);
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render(){
        const { values } = this.props;
        return(
            <Form>
                <h1 className="ui centered">Enter Input Details</h1>
                <Form.Group widths='equal'>
                    <Form.Select
                        fluid
                        label='Design No'
                        options={this.state.options}
                        placeholder='Design No'
                        onChange={this.handleDropdownChange} 
                        //value = {this.state.dropdown}
                    />
                    <Form.Input fluid label='Brand' placeholder='Brand' />
                    <Form.Input fluid label='Account No' placeholder='เลขที่เอกสาร' />
                    <Form.Input fluid label='โรงทอ' placeholder='โรงทอ' />
                    
                </Form.Group>
                <Form.Group inline>

                </Form.Group>
                <Form.Group inline>
                
                </Form.Group>
                <Button onClick={this.back}>Back {this.props.designNumber}</Button>
                <Button onClick={this.saveAndContinue}>Confirm</Button>
            </Form>
        )
    }
}

export default QueryDetails;
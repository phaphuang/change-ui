// UserDetails.jsx
import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import { db } from "../firebase";

const options = []

db.collection("design")
.get()
.then(querySnapshot => {
  const data = querySnapshot.docs.map(doc => doc.data());
  //console.log(data); // array of cities objects

  querySnapshot.forEach(function(doc){
      options.push({
          key: doc.data().SEQ,
          text: doc.data().DESIGN_NO,
          value: doc.data().DESIGN_NO
      })
  })

  console.log(options)
});

// const options = [
//     { key: 'm', text: 'Male', value: 'male' },
//     { key: 'f', text: 'Female', value: 'female' },
//     { key: 'o', text: 'Other', value: 'other' },
// ]

class SpecDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
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
                        options={options}
                        placeholder='Design No'
                    />
                    <Form.Input fluid label='Brand' placeholder='Brand' />
                    <Form.Input fluid label='Account No' placeholder='เลขที่เอกสาร' />
                    <Form.Input fluid label='โรงทอ' placeholder='โรงทอ' />
                    
                </Form.Group>
                <Form.Group inline>

                </Form.Group>
                <Form.Group inline>
                
                </Form.Group>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default SpecDetails;
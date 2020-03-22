// MainForm.jsx
import React, { Component } from 'react';
import SpecDetails from './SpecDetails';
import QueryDetails from './QueryDetails';
import Success from './Success';

class MainForm extends Component {
    state = {
        step: 1,
        designNumber: '',
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    render(){
        const {step} = this.state;
        const { designNumber } = this.state;
        const values = { designNumber };
        switch(step) {
        case 1:
            return <SpecDetails
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 2:
            return <QueryDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 3:
            return <Success />
        }
    }
}

export default MainForm;
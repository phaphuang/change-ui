// UserDetails.jsx
import React, { Component } from 'react';
import { Form, Button, Dropdown, Label, Image } from 'semantic-ui-react';
import { db } from "../firebase";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class SpecDetails extends Component{

    constructor(props) {
        super(props);
        this.ref = db.collection('design');
        this.unsubscribe = null;
        this.state = {
          options: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const options = [];
        querySnapshot.forEach((doc) => {
            //const { title, description, author } = doc.data();
            options.push({
                key: doc.id,
                //doc, // DocumentSnapshot
                text: doc.data().DESIGN_NO,
                value: doc.data().DESIGN_NO,
            });
        });
        this.setState({
            options: options
        });
        console.log(options)
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    nextPage = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    handleDropdownChange = (e,{value}) => {
        const state = this.state
        this.setState({designNumber: value})
    }

    handleClick(compName, e){
        //console.log(compName);
        this.setState({render:compName});        
    }

    _renderSubComp(){
        //console.log(this.state.designNumber)
        switch(this.state.render){
            case 'querydetails': return <QueryDetails designNumber={this.state.designNumber}/>
        }
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
                        //value = {this.state.designNumber}
                    />
                </Form.Group>
                <Button onClick={this.handleClick.bind(this, 'querydetails')}>Query {this.state.designNumber}</Button>
                {this._renderSubComp()}
            </Form>
        )
    }
}

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
        this.state = {
          options: [],
          keys: []
        };
    }

    state = {
        startDate: new Date()
      };
    
    handleChange = date => {
    this.setState({
        startDate: date
    });
    };

    async componentDidMount() {
        //https://stackoverflow.com/questions/56285556/react-how-to-set-state-when-there-is-more-than-one-field-to-populate

        console.log(String(this.props.designNumber))

        const options = [];
        const keys = [];

        await db.collection('design').where('DESIGN_NO', '==', String(this.props.designNumber)).get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc){
                //console.log(doc.id, " => ", doc.data());
                options.push({
                    key: doc.id,
                    //doc, // DocumentSnapshot
                    text: doc.data().DESIGN_NO,
                    value: doc.data().DESIGN_NO,
                    brand: doc.data().BRAND,
                    product: doc.data().PRODUCT,
                    glw: doc.data().GLW,
                    gup: doc.data().GUP,
                    collection: doc.data().COLLECTION,
                    wlw: doc.data().wlw,
                    wup: doc.data().wup, 
                    composition: doc.data().COMPOSITION,
                    yarn: doc.data().YARN_NO,
                    structure: doc.data().STRUCTURE,
                    finishing: doc.data().FINISHING,
                    gauge: doc.data().GAUGE
                });
            });
        });

        await db.collection('key').where('DESIGN_NO', '==', String(this.props.designNumber)).get()
        .then(function(querySnapshot) { 
            querySnapshot.forEach(function(doc){
                console.log(doc.id, " => ", doc.data());
                keys.push({
                    key: doc.id,
                    //doc, // DocumentSnapshot
                    text: doc.data().DESIGN_NO,
                    value: doc.data().DESIGN_NO,
                    plant: doc.data().KNIT_PLANT
                });
            });
        });

        console.log(keys)

        this.setState({
            options,
            keys
        });
    }

    _exportPdf = () => {

        // src: https://stackoverflow.com/questions/48471887/how-to-set-size-of-rendered-image
        html2canvas(document.querySelector("#capture"), { width: 1200, height: 1100, useCORS: true })
        .then(canvas => {
            //document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('l', 'pt', "a4");
            //pdf.addImage(imgData, 'JPEG', 0, -80);
            //pdf.save("download.pdf");
            const ratio = canvas.height / canvas.width;

            //const pdf = new jsPDF("l");
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 10, -160, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
       });
   
    }

    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result.replace('text/xml', 'image/png')
          });
        }
    
        reader.readAsDataURL(file)
      }

    // https://www.freecodecamp.org/forum/t/react-js-help-mapping-2-different-array-at-the-same-instance-in-1-component/80597/2
    render(){
        const { values } = this.props;
        const { options, keys } = this.state;

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<Image src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return(
            <Form>
                <br />
                <div id = "capture">
                    <h1 className="ui centered">ใบลาย</h1>
                    {options.map((val, index) =>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Brand' value={val.brand} />
                            <Form.Input fluid label='เลขที่เอกสาร' value='10187546' />
                            <Form.Input fluid label='โรงทอ' />
                        </Form.Group>
                    )}
                    {options.map((val, index) =>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Product' value={val.product} />
                            <Form.Input fluid label='ทอน้ำหนัก' value={String(val.glw) + "-" + String(val.gup) + " G/SM"} />
                            <div class='field' style={{textAlign : "right" }}><label>วันที่เขียนใบสั่ง</label><div class="fluid"><DatePicker selected={this.state.startDate} onChange={this.handleChange} /></div></div>
                        </Form.Group>
                    )}

                    <div id="imgInput">
                        <input className="fileInput" 
                            type="file" 
                            onChange={(e)=>this._handleImageChange(e)} />                
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                    </div>
                </div>

                <Button onClick={this._exportPdf}>Export PDF</Button>
            </Form>
        )
    }
}

export default SpecDetails;
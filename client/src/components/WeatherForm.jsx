import React from 'react';

import { Button, Form, Label, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './WeatherForm.css';

export default class WeatherForm extends React.Component{
    static getUnitString(unit) {
        if(unit === "metric") return "C";
        else return "F";
    }
    constructor(props){
        super(props);
        //this.inputEl = null;
        this.state = {
            weatherform_unit: props.unit, /* props.unit only for initialize */
            inputValue: props.city,
            buttontoggle: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonToggle = this.handleButtonToggle.bind(this);
        this.handleClickMetric = this.handleClickMetric.bind(this);
        this.handleClickImperial = this.handleClickImperial.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return(
            <div className="weather-form container">
                <Form className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
                    {/* <Label className="text-danger" for="city">City:&nbsp;</Label> */}
                    <Input type="text" name="City" placeholder="City Name" value={this.state.inputValue} onChange={this.handleInputChange}/>&nbsp;
                    <ButtonDropdown type="button" isOpen={this.state.buttontoggle} toggle={this.handleButtonToggle}>
                        <DropdownToggle type="button" caret>
                            &ordm; {WeatherForm.getUnitString(this.state.weatherform_unit)}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type="button" onClick={this.handleClickMetric}>&ordm;C</DropdownItem>
                            <DropdownItem type="button" onClick={this.handleClickImperial}>&ordm;F</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>&nbsp;
                    <Button color="primary">Check</Button>
                </Form>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputValue: nextProps.city
        });
    }
    handleInputChange(e) {
        // console.log(e.target.value);
        this.setState({
            inputValue: e.target.value
        });
    }

    handleClickMetric(e) {
        //console.log("handleClickMetric");
        this.setState({
            weatherform_unit: "metric"
        });
    }

    handleClickImperial(e) {
        //console.log("handleClickImperial");
        this.setState({
            weatherform_unit: "imperial"
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        //this.inputEl.blur();
        console.log("handleSubmit:" + this.state.weatherform_unit);
        if(this.state.inputValue.trim() && this.state.inputValue){
            //console.log("handleSubmit:" + this.state.inputValue);
            this.props.onQuery(this.state.inputValue, this.state.weatherform_unit);
        }else{
            this.setState({
                inputValue: this.props.city
            })
        }
    }

    handleButtonToggle(e) {
        this.setState((prevState, props) => ({
            buttontoggle : !prevState.buttontoggle
        }));
    }
}
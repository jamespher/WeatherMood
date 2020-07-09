import React from 'react';
import { Button, Form, Label, Input} from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {getMoodIcon} from 'utilities/getmood.js';
import './PostForm.css';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            mood: "Happy",
            buttontoggle: false
        };
        this.handleButtonToggle = this.handleButtonToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickMood = this.handleClickMood.bind(this);
    }

    render() {
        return (
        <div className="post-form container mt-4">
            <Form className="form-inline justify-content-around alert-info" onSubmit={this.handleSubmit}>
                <ButtonDropdown type="button" isOpen={this.state.buttontoggle} toggle={this.handleButtonToggle}>
                    <DropdownToggle type="button" caret>
                        <i className={`${getMoodIcon(this.state.mood)}`} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{this.state.mood}&nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem type="button" onClick={() => {this.handleClickMood("Happy")}}><i className="fa fa-smile-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Happy&nbsp;</DropdownItem>
                        <DropdownItem type="button" onClick={() => {this.handleClickMood("Soso")}}><i className="fa fa-meh-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Soso&nbsp;</DropdownItem>
                        <DropdownItem type="button" onClick={() => {this.handleClickMood("Sad")}}><i className="fa fa-frown-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Sad&nbsp;</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <Input type="textarea" placeholder="What's on your mind ?" className="InputArea" value={this.state.inputValue} onChange={this.handleInputChange}/>
                <Button color="info" className="btn-lg">Post</Button>
            </Form>
        </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.inputValue) return;
        this.props.onPost(this.state.mood, this.state.inputValue);
         this.setState({
            inputValue: '',
            mood: 'Happy'
        });
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleClickMood(_mood) {
        this.setState({
            mood: _mood
        });
    }

    handleButtonToggle() {
        this.setState((prevState, props) => ({
            buttontoggle: !prevState.buttontoggle
        }))
    }
}

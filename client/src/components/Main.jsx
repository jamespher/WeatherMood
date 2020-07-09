import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';  

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import './Main.css';


export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            unit: "metric",
            navbartoggler: false
        }
        this.handleNavBarToggle = this.handleNavBarToggle.bind(this);
        this.handleMainUnitChange = this.handleMainUnitChange.bind(this);
    }
    render(){
        return (
            <Router>
                <div className="main bg-faded">
                    <div className="container">
                        <Navbar color="faded" light expand="md">
                            <NavbarBrand className="text-primary" href='/'>WeatherMood</NavbarBrand>  
                            <NavbarToggler onClick={this.handleNavBarToggle}/>
                            <Collapse isOpen={this.state.navbartoggler} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink tag={Link} to='/'>Today</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                </NavItem>
                            </Nav>
                            <NavbarText className="ml-auto">Meng-Hsiu Wu</NavbarText>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path = '/' render = {() => (<Today unit={this.state.unit}  onUnitMainChange={this.handleMainUnitChange}/>)} ></Route>
                    <Route exact path = '/forecast' render = {() => (<Forecast unit={this.state.unit}  onUnitMainChange={this.handleMainUnitChange}/>)} ></Route>
                    <div className='footer'>
                        Meng-Hsiu Wu.
                    </div>
                </div>
            </Router>
        );
    }

    handleMainUnitChange(_unit) {
        //console.log("handleMainUnitChange");
        this.setState({
            unit: _unit
        });
    }

    handleNavBarToggle(e) {
        this.setState((prevState, props) => ({
            navbartoggler: !prevState.navbartoggler
        }));
    }
}
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

import Item from './Item'

import logo from '../assets/svg-logo.svg.png';

import '../App.css'


const logoStyle = {
    height: "50px",
    width: "50px",
    float: "left",
    marginRight: "5em"
  };

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu_class: '',
        }
    }

    setToggleTopMenuClass = () => {
        if (this.state.menu_class === '') {
            this.setState({
                menu_class: 'toggled',
            })
        } else {
            this.setState({
                menu_class: '',
            })
        }
    }


    render = () => {
        let top_menu_class = `top-menu ${this.state.menu_class}`
        return (
            <div>
                <div className={top_menu_class} >
                    <img className ="logo" src={logo} style={logoStyle} alt="logo"/>
                    <div className='left'>
                        <Item text='Odkaz 1'/>
                        <Item text='Odkaz 2'/>
                        <Item text='Odkaz 3'/>
                        <Item text='Odkaz 4'/>
                    </div>
                    
                     <FontAwesomeIcon icon={faBars} className='top-menu-icon' onClick={this.setToggleTopMenuClass}/>
                    <div className='clear-fix' />
                </div>
            </div>
        )
    }
}

export default Header;
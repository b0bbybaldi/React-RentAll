import React, { Component } from "react";
import "./style.css";

import { Navbar, Nav, NavItem } from 'react-bootstrap';

// helper functions
import API from "../../utils/API";

import Popup from '../Popup';
import PostForm from '../PostForm';

class Navigation extends React.Component {
	state = {
		selectedBtn: "",
		modalShow: false
	}

	// conditional rendering of navigation items
	// if a user is logged vs if a user is not logged in
	renderNavItems(){
		// if a user is not logged in show limited nav items
		// in addition show login or sign up
		// signup and signin trigger modal
		if(this.props.isLoggedIn === false){
			return(
				<Nav>
					<NavItem onClick={this.handleClickChoice.bind(this)}>
						signup
					</NavItem>
					<NavItem onClick={this.handleClickChoice.bind(this)}>
						signin
					</NavItem>
					<NavItem href="/search">
						search
					</NavItem>
					<NavItem href="/about">
						about
					</NavItem>
				</Nav>
	      	);
		}
		// if a user is logged in show all nav items
		// in addition to logout
		else if(this.props.isLoggedIn === true) {
			return(
				<Nav>
					<NavItem onClick={this.handlelogout.bind(this)}>
						logout
					</NavItem>
					<NavItem href="/account">
						account
					</NavItem>
					<NavItem href="/search">
						search
					</NavItem>
					<NavItem onClick={this.handleClickChoice.bind(this)}>
						post
					</NavItem>
					<NavItem href="/about">
						help
					</NavItem>
				</Nav>
			);
		}
	}

	// logout user and update app.js state for islogged in
	handlelogout(){
	    API.handlelogout()
	    .then(data => {return data.json()})
	    .then(json=>{
	      // console.log(json);
	    	this.props.isAuthenicated();
	    })
	    .catch(err=> console.log("err",err))
  	}

  	// collect users choice for signin or sign up
  	// assign value to state
  	// show modal
	handleClickChoice(e) {
		this.setState({
			selectedBtn:e.target.textContent.toLowerCase(),
			modalShow: true
		});
	}

	// get the value of the button clicked in the modal form
	// get the values from the form inputs
	// check the value of the clicked form button
	// if signin call signin API function
	// else call signup API function
	handleLoginSubmit(e){

		e.preventDefault();

		const selectedSubmit = e.target.textContent.toLowerCase();

	    const user = {
	      email: document.getElementById("user-email").value,
	      local_pw: document.getElementById("user-pw").value
	    }

	    if(selectedSubmit === "signup"){
	    	// call helper funtion that talks to server
			this.handleLoginSignUp(API.signup, user)

	    }
	    else if(selectedSubmit === "signin"){
	    	// call helper funtion that talks to server
			this.handleLoginSignUp(API.signin, user)
	    }
	}


	handleLoginSignUp(apiType, user){
		apiType(user)
		.then(data => {return data.json()})
		.then(json=>{
			// close modal
			this.handleClose();
			// update app.js state for islogged in
			this.props.isAuthenicated();
		})
      	.catch(err=> console.log("err",err));
	}

	// checks the value of selectedBtn state
	// returns a form for which state it is
	// signup send modal signup form
	// else send modal signin form
	renderForm(){
		if(this.state.selectedBtn === "signup"){
			return(<form>
				<h2>SIGNUP NOW!</h2>
				<input type="email" placeholder="your@email.com" id="user-email"/>
				<input type="password" placeholder="input 6 character password" id="user-pw"/>
				<button onClick={this.handleLoginSubmit.bind(this)}>Signup</button>
			</form>);
		}
		else if(this.state.selectedBtn === "signin"){
			return(<form>
				<h2>SIGNIN NOW!</h2>
				<input type="email" placeholder="your@email.com" id="user-email"/>
				<input type="password" placeholder="input 6 character password" id="user-pw"/>
				<button onClick={this.handleLoginSubmit.bind(this)}>SignIn</button>
			</form>);
		}else if(this.state.selectedBtn === "post") {
			return(<PostForm/>)
		}
	}

	// update state for modalShow to false
	// this will hide the modal from the page
  	handleClose() {
   		this.setState({ modalShow: false });
  	}

  	// rending of the navigation bar
	render(){
		return(
			<div>
			<Navbar collapseOnSelect>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="/">RENTALL</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>

			    {this.renderNavItems()}

			  </Navbar.Collapse>
			</Navbar>
				<Popup modalShow={this.state.modalShow} handleClose={this.handleClose.bind(this)}>
					{this.renderForm()}
				</ Popup>
			</div>

		)
	}

}

export default Navigation;




/*
		if state  prop from parent is true (user is logged in)
		then all navigation options are available to the user
		logout/search item /home/help/account/post item




		else
		the navication should only show
		sign/ signup/search item /home/about

			// if they are on the home page
			// signup and signin






	----------
		on click of signup or sign in will render modal with form

	*/
	/*




	      <NavItem eventKey={2} href="#">
	        Link
	      </NavItem>
	    </Nav>

	*/
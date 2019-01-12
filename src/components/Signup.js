import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
class Signup extends Component{
   
    state = {
        name: null,
        email: null,
        mobile: null,
        password: null,
        city: null,
        country: null,
        error: null
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password,
            city: this.state.city,
            country: this.state.country
        } 
        axios.post('http://localhost:3001/user/signup/', params)
        .then(res => {
           if(res.status === 200)
           {
             this.props.updateUserDetails(res.data.user.id, true);
             this.props.history.push('/home');
           }
            
        })
        .catch(err => {
            console.log(err.response);
            this.setState({
                error: err.response.data.error
            });
        })
    }
    render () {
        const errorMessage = (this.state.error) ? <div className="red">{this.state.error}</div> : null;
       return (
        <div className="container">
            <div className="card center" id="signup-card">
                <div className="card-content">
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" type="text" onChange={this.handleChange} />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="mobile" type="text" onChange={this.handleChange} />
                                    <label htmlFor="mobile">Mobile</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" type="text" onChange={this.handleChange} />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" type="password" onChange={this.handleChange} />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="city" type="text" onChange={this.handleChange} />
                                    <label htmlFor="city">City</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="country" type="text" onChange={this.handleChange} />
                                    <label htmlFor="country">Country</label>
                                </div>
                            </div>
                            <button className="waves-effect waves-light btn">Signup</button>
                        </form>
                    </div>
                    <Link to="/login">Already have an account ? Login</Link>
                    <div>{errorMessage}</div>
                </div>
            </div>
        </div>
       ) 
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        updateUserDetails: (userId, loggedIn) => {dispatch({type:'UPDATE_USER_DETAILS', userId: userId, loggedIn: loggedIn})}
    }
}

export default connect(null, mapDispatchToProps)(Signup)
import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Login extends Component{
    //props.history.push('/about')
    state = {
        email: null,
        password: null,
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
            email: this.state.email,
            password: this.state.password
        } 
        axios.post('http://localhost:3001/user/login/', params)
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
            <div className="card center" id="login-card">
                <div className="card-content">
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
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
                            <button className="waves-effect waves-light btn">Login</button>
                        </form>
                    </div>
                    <Link to="/signup">Don't have an account ? Signup</Link>
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

export default connect(null,mapDispatchToProps)(Login)
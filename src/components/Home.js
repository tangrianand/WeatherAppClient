import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'


class Home extends Component{
   state = {
       user_id: null,
       location: null,
       lat: null,
       long: null,
       error: null
   }
   handleChange = (e) => {
       this.setState({
           [e.target.id]: e.target.value,
           user_id: this.props.userId
       })
   }
   handleSubmit = (e) => {
       e.preventDefault(); 
       axios.post('http://localhost:3001/weather/search/', this.state)
           .then(res => {
              console.log(res);
              if(res.status === 200)
               {
                  this.props.updateWeatherDetails(res.data.weather.temperature, res.data.weather.humidity, res.data.weather.wind_speed, res.data.weather.place, res.data.weather.id, res.data.weather.condition);
                  this.props.history.push('/weather');
               }
               
           })
           .catch(err => {
               console.log(err.response);
               this.setState({
                  error: err.response.data.error
               });
           })
   }
   handleSubmitGeo = (e) => {
      e.preventDefault(); 
      let params = {
         lat: this.state.lat,
         long: this.state.long,
         user_id: this.state.user_id
      }
      console.log(params);
      axios.post('http://localhost:3001/weather/search/geo/', params)
          .then(res => {
             if(res.status === 200)
              {
                 this.props.updateWeatherDetails(res.data.weather.temperature, res.data.weather.humidity, res.data.weather.wind_speed, res.data.weather.place, res.data.weather.id, res.data.weather.condition);
                 this.props.history.push('/weather');
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
                       {errorMessage}
                     </div>
                     <div className="row">
                           <form className="col s12" onSubmit={this.handleSubmit}>
                              <div className="row">
                                 <div className="input-field col s12">
                                       <input id="location" type="text" onChange={this.handleChange} />
                                       <label htmlFor="location">Enter any city name to get the current weather conditions for that area.</label>
                                 </div>
                              </div>
                              <button className="waves-effect waves-light btn">Enter</button>
                           </form>
                     </div>
                     <div className="row">
                        <p>OR</p>
                        <span>Add lat/lng</span>
                     </div>
                     <div className="row">
                           <form className="col s12" onSubmit={this.handleSubmitGeo}>
                              <div className="row">
                                 <div className="input-field col s6">
                                       <input id="lat" type="text" onChange={this.handleChange} />
                                       <label htmlFor="lat">Latitude</label>
                                 </div>
                                 <div className="input-field col s6">
                                       <input id="long" type="text" onChange={this.handleChange} />
                                       <label htmlFor="long">Longitude</label>
                                 </div>
                              </div>
                              <button className="waves-effect waves-light btn">Enter</button>
                           </form>
                     </div>
                  </div>
               </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
       userId: state.userId
   }
}

const mapDispatchToProps = (dispatch)=> {
   return {
       updateWeatherDetails: (temperature, humidity, windSpeed, place, id, condition) => {dispatch({type:'UPDATE_WEATHER_DETAILS', temperature: temperature, humidity: humidity, 
       windSpeed: windSpeed, place:place, id:id, condition:condition})}
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
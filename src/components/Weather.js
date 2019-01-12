import React, { Component } from 'react';
import {connect} from 'react-redux'

class Weather extends Component {
	state = {
        isLoading: true,
        temperature: '',
        humidity: '',
        windSpeed: '',
        id: '',
        weatherIcon: '',
        place: '',
        condition: ''
	}

	componentDidMount() {
        this.setState({
            id: Number(this.props.id)
        });

        // Determine weather icon
        let weatherIcon = this.setWeatherIcon(this.props.id);
        
        this.setState({
            temperature: this.props.temperature + ' °F',
            humidity: this.props.humidity + '%',
            windSpeed: this.props.windSpeed + ' mph',
            place: this.props.place,
            weatherIcon: weatherIcon,
            condition: this.props.condition
        });
    }
    
    setWeatherIcon = (id) => {    
        if(id < 233) {
            return "https://img.icons8.com/color/48/000000/cloud-lighting.png" ;
        } else if(id > 299 && id < 532) {
            return "https://img.icons8.com/color/48/000000/rainy-weather.png" ;
        } else if(id > 599 && id < 623 ) {
            return "https://img.icons8.com/color/48/000000/winter.png" ;
        } else if(id > 700 && id < 723) {
            return "https://img.icons8.com/color/48/000000/dust.png" ;
        } else if(id === 800) {
            return "https://img.icons8.com/color/48/000000/sun.png" ;
        } else if(id > 800 && id < 805) {
            return "https://img.icons8.com/color/48/000000/partly-cloudy-day.png" ;
        }
    }

	render() {
		const WeatherConditions = (
			<div className="container">
                <div className="card center" id="login-card">
                    <div className="card-content">
                        <div className="row">
                            <div className='weatherCardContainer'>
                                <div className='weatherCard'>
                                <img src={this.state.weatherIcon} alt='Weather icon'/>
                                <div className='conditionsOverview'>
                                    <p>{this.state.temperature}</p>
                                    <p>{this.state.condition}</p>
                                </div>
                                <div className='conditionDetails'>
                                    <p id="humidity">Humidity: {this.state.humidity} </p>
                                    <p id="wind-speed">Wind Speed: {this.state.windSpeed} </p>
                                </div>
                                </div> 
                                <h5> Location | {this.state.place} </h5>
                            </div>
			            </div>
                    </div>
                </div>
            </div>
		)

		return (
		   <div>
	             { WeatherConditions }
		   </div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        temperature: state.temperature,
        humidity: state.humidity,
        windSpeed: state.windSpeed,
        id: state.id,
        place: state.place,
        condition: state.condition
    }
}

export default connect(mapStateToProps)(Weather);
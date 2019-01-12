import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class History extends Component{
    state = {
        history: []
    }
    componentDidMount() {
        axios.get('http://localhost:3001/weather/search/history/' + this.props.userId)
            .then(res => {
               console.log(res);
               if(res.status === 200)
               {
                   this.setState({
                        history: res.data.history
                   });
               }
                
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    render () {
        const {history} = this.state;
        const historyList = history.length ? (
            history.map(entry => {
                return (
                    <div className="post card" key={entry.id}>
                        <div className="card-content">
                            <span className="card-title">{entry.location}</span>
                            <p id="weather-details">{entry.weather}</p>
                        </div>
                    </div>
                )
            })
        ) : (<div className="center">No history yet</div>)
       return (
        <div className="container">
            <h4 className="center">
                {historyList}
            </h4>
        </div>
       ) 
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(History)
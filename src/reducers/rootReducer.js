const initState = {
    loggedIn: false,
    userId: null,
    temperature: null,
    humidity: null,
    windSpeed: null,
    id: null,
    place: null,
    condition: null
}
const rootReducer = (state = initState, action) => {
    if(action.type === 'UPDATE_USER_DETAILS')
    {
        let newUser = {};
        newUser.loggedIn = action.loggedIn;
        newUser.userId = action.userId;

        return {
            ...state,
            loggedIn: newUser.loggedIn,
            userId: newUser.userId
        }
    }
    if(action.type === 'UPDATE_WEATHER_DETAILS')
    {
        let weather = {};
        weather.temperature = action.temperature;
        weather.humidity = action.humidity;
        weather.windSpeed = action.windSpeed;
        weather.place = action.place;
        weather.id = action.id;
        weather.condition = action.condition

        return {
            ...state,
            temperature: weather.temperature,
            humidity: weather.humidity,
            windSpeed: weather.windSpeed,
            place: weather.place,
            id: weather.id,
            condition: weather.condition
        }
    }
    return state;
}

export default rootReducer;
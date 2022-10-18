import axios from 'axios';

const baseURL = "https://statsapi.web.nhl.com/api/v1";

export const fetchStandings = () => {
    return function(dispatch) {
        dispatch({ type: "FETCH_STANDINGS"})
        axios.get(`${baseURL}/standings/byConference`)
            .then((response) => {
                dispatch({
                    type: "FETCH_STANDINGS_FULFILLED",
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_STANDINGS_REJECTED",
                    payload: err
                })
            })
    }
};
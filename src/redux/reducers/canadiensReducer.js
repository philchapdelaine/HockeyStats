const INITIAL_STATE = {
	players: [],
    fetching: false,
    fetched: false,
    error: null
}

const canadiensReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "FETCH_STATS": {
            return {
                ...state,
                fetching: true
            }
        }
        case "FETCH_STATS_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "FETCH_STATS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                players: action.payload
            }
        }
        default: return state;
    }
};

export default canadiensReducer;
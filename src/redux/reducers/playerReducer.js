const INITIAL_STATE = {
	players: [],
    fetching: false,
    fetched: false,
    error: null
}

const playerReducer = (state = INITIAL_STATE, action) => {
    console.log("fetching players");
    switch(action.type) {
        case "FETCH_PLAYER_STATS": {
            return {
                ...state,
                fetching: true
            }
        }
        case "FETCH_PLAYER_STATS_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "FETCH_PLAYER_STATS_FULFILLED": {
            let allPlayers = [...state.players];
            for (let i = 0; i < action.payload.length; i++) {
                allPlayers.push(action.payload[i]);
            }
            console.log(allPlayers);
            return {
                ...state,
                fetching: false,
                fetched: true,
                players: allPlayers
            }
        }
        default: return state;
    }
};

export default playerReducer;
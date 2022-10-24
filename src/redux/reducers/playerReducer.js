const INITIAL_STATE = {
	players: [],
    goalValue: 6,
    assistValue: 4,
    ppgValue: 2,
    ppaValue: 2,
    shgValue: 3,
    shaValue: 1,
    gwgValue: 3,
    shotValue: 1.5,
    hitValue: 0.5,
    blockValue: 0.5,
    winValue: 5,
    goalsAgainstValue: -2,
    saveValue: 0.5,
    shutoutValue: 5,
    fetching: false,
    fetched: false,
    error: null
}

const playerReducer = (state = INITIAL_STATE, action) => {
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
            for (let i = 0; i < allPlayers.length; i++) {
                let curr = allPlayers[i];
                curr.fantasyPTS = (
                    (
                        curr.goals * state.goalValue +
                        curr.assists * state.assistValue +
                        curr.powerPlayGoals * state.ppgValue +
                        curr.powerPlayAssists * state.ppaValue +
                        curr.hits * state.hitValue +
                        curr.shots * state.shotValue +
                        curr.gameWinningGoals * state.gwgValue +
                        curr.blocks * state.blockValue +
                        curr.shortHandedGoals * state.shgValue +
                        curr.shortHandedAssists * state.shaValue
                        ) || 0
                    );
                curr.fantasyPTSPerGame = curr.fantasyPTS / curr.games || 0;
            }
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
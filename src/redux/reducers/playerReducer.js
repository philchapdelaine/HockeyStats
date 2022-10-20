const INITIAL_STATE = {
	players: [],
    goalValue: 6,
    assistValue: 4,
    ppg: 2,
    ppa: 2,
    shg: 3,
    sha: 1,
    gwg: 3,
    shots: 1.5,
    hits: 0.5,
    blocks: 0.5,
    wins: 5,
    goalsAgainst: -2,
    saves: 0.5,
    shutouts: 5,
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
            for (let i = 0; i < allPlayers.length; i++) {
                let curr = allPlayers[i];
                curr.fantasyPTS = (
                    (
                        curr.goals * state.goalValue +
                        curr.assists * state.assistValue +
                        curr.powerPlayGoals * state.ppg +
                        curr.powerPlayAssists * state.ppa +
                        curr.hits * state.hits +
                        curr.shots * state.shots +
                        curr.gameWinningGoals * state.gwg +
                        curr.blocks * state.blocks +
                        curr.shortHandedGoals * state.shg +
                        curr.shortHandedAssists * state.sha
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
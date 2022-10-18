const INITIAL_STATE = {
	eastern: [],
    western: [],
    fetching: false,
    fetched: false,
    error: null
};

const parseJSON = (data) => {
    let resArray = [];
    data.teamRecords.forEach((teamObject, i) => {
        let teamName = teamObject.team.name;
        let teamGP = teamObject.gamesPlayed;
        let teamWins = teamObject.leagueRecord.wins
        let teamLosses = teamObject.leagueRecord.losses
        let teamOTLS = teamObject.leagueRecord.ot
        let teamPoints = teamObject.points

        resArray[i] = {
            id: i,
            name: teamName,
            gp: teamGP,
            wins: teamWins,
            losses: teamLosses,
            otls: teamOTLS,
            points: teamPoints
        };
    });
    return(resArray);
};

const standingsReducer = (state = INITIAL_STATE, action) => {
    console.log("fetching standings");
    switch(action.type) {
        case "FETCH_STANDINGS": {
            return {
                ...state,
                fetching: true
            }
        }
        case "FETCH_STANDINGS_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        case "FETCH_STANDINGS_FULFILLED": {
            let parsedEasternConference = parseJSON(action.payload.records[0]);
            let parsedWesternConference = parseJSON(action.payload.records[1]);
            return {
                ...state,
                fetching: false,
                fetched: true,
                eastern: parsedEasternConference,
                western: parsedWesternConference,
            }
        }
        default: return state;
    }
};

export default standingsReducer;
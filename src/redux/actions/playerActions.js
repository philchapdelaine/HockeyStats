import axios from 'axios';

const baseURL = "https://statsapi.web.nhl.com";
const year = '20222023';
// no 27, then skip to 53
const teamIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,53,54,55];

function time2dec(tIn) {
    try {
        if(tIn == '') 
            return 0;
        if(tIn.indexOf('h') >= 0 || tIn.indexOf(':') >= 0)
            return hm2dec(tIn.split(/[h:]/));
        if(tIn.indexOf('m') >= 0)
            return hm2dec([0,tIn.replace('m','')]);
        if(tIn.indexOf(',') >= 0)
            return parseFloat(tIn.split(',').join('.')).toFixed(2);
        if(tIn.indexOf('.') >= 0)
            return parseFloat(tIn);
        return parseInt(tIn, 10);
    }
    catch(err){
    };
}

function hm2dec(hoursMinutes) {
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return (hours + minutes / 60).toFixed(2);
}

const getStats = (data) => {
    let resArray = [];
    const roster = data.roster;
    roster.forEach((player, i) => {
        let playerID = player.person.id;
        let playerName = player.person.fullName;
        let playerLink = player.person.link;
        let playerPos = player.position.abbreviation;

        let playerObject = {
            id: playerID,
            name: playerName,
            position: playerPos
        };

        axios.get(`${baseURL}${playerLink}/stats?stats=statsSingleSeason&season=${year}`)
            .then((res) => {
            const playerStats = res.data;
            if (playerStats.stats[0].splits.length == 0) {
                playerObject.games = 0;
                playerObject.goals = 0;
                playerObject.assists = 0;
                playerObject.points = 0;
                playerObject.pointsPerGame = 0;
                playerObject.plusMinus = 0;
                playerObject.powerPlayGoals = 0;
                playerObject.powerPlayPoints = 0;
                playerObject.powerPlayPointsPer60 = 0;
                playerObject.plusMinus = 0;
                playerObject.gamescore = 0;
                playerObject.timeOnIce = 0;
                playerObject.shots = 0;
                playerObject.shootingpercentage = 0;
                playerObject.faceoffPercentage = 0;

            } else {
                const singlePlayer = playerStats.stats[0].splits[0].stat;

                playerObject.games = singlePlayer.games || 0;
                playerObject.goals = singlePlayer.goals || 0;
                playerObject.assists = singlePlayer.assists || 0;
                playerObject.points = singlePlayer.points || 0;
                playerObject.pointsPerGame = singlePlayer.points / singlePlayer.games || 0;
                playerObject.timeOnIce = singlePlayer.timeOnIcePerGame || 0;
                playerObject.plusMinus = singlePlayer.plusMinus || 0;
                playerObject.powerPlayGoals = singlePlayer.powerPlayGoals || 0;
                playerObject.powerPlayPoints = singlePlayer.powerPlayPoints || 0;
                playerObject.powerPlayPointsPer60 = ((
                    singlePlayer.powerPlayPoints / time2dec(singlePlayer.powerPlayTimeOnIce)
                    ) * 60 ).toFixed(2) || 0;
                
                if (isNaN(playerObject.powerPlayPointsPer60)) {
                    playerObject.powerPlayPointsPer60 = 0.00;
                }
                playerObject.plusMinus = singlePlayer.plusMinus || 0;
                playerObject.shots = singlePlayer.shots;
                playerObject.shootingpercentage = singlePlayer.shotPct;
                playerObject.faceoffPercentage = singlePlayer.faceOffPct;

                playerObject.gamescore = ((
                    (0.75 * singlePlayer.goals) +
                    (0.635 * singlePlayer.assists) + 
                    (0.075 * singlePlayer.shots) + 
                    (0.05 * singlePlayer.blocked) -
                    (0.15 * singlePlayer.penaltyMinutes)
                ) / singlePlayer.games).toFixed(2) || 0;

                if (isNaN(playerObject.gamescore)) {
                    playerObject.gamescore = 0.00;
                }
            }
        });
        resArray[i] = playerObject;

    }); 
    return(resArray);
}

// export const fetchPlayerStats = () => {
//     return function(dispatch) {
//         dispatch({ type: "FETCH_PLAYER_STATS"});
//         axios.get(`${baseURL}/api/v1/teams/8/roster`)
//             .then((response) => {
//                 const parsed = getStats(response.data);
//                 dispatch({
//                     type: "FETCH_STATS_FULFILLED",
//                     payload: parsed
//                 })
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: "FETCH_STATS_REJECTED",
//                     payload: err
//                 })
//             })
//     }
// };

export const fetchPlayerStats = () => {
    return function(dispatch) {
        dispatch({ type: "FETCH_PLAYER_STATS"});
        for (let teamID in teamIDs) {
            axios.get(`${baseURL}/api/v1/teams/${teamID}/roster`)
             .then((response) => {
                const parsed = getStats(response.data);
                dispatch({
                    type: "FETCH_PLAYER_STATS_FULFILLED",
                    payload: parsed
                })
            })
            .catch((err) => {
                dispatch({
                    type: "FETCH_PLAYER_STATS_REJECTED",
                    payload: err
                })
            })
        }
    }
};
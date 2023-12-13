// import React, { useEffect, useState } from 'react';

// function DraftSim({ players, remainingPlayers, setRemainingPlayers }) {
//   const [draftedPlayers, setDraftedPlayers] = useState([]);
//   const [userPick, setUserPick] = useState(null);
//   const [numTeams, setTeams] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//   const [ongoingPicks, setOngoingPicks] = useState([]);
//   const rankings = {};

//   players?.forEach((player) => {
//     rankings[player.name] = player.rank;
//   });

//   const selectPlayer = (players, rankings, draftedPlayers) => {
//     const availablePlayers = players.filter(
//       (player) => !draftedPlayers.find((draftedPlayer) => draftedPlayer.player.id === player.id)
//     );
//     const rankedPlayers = availablePlayers.sort(
//       (player1, player2) => rankings[player1.name] - rankings[player2.name]
//     );

//     return rankedPlayers;
//   };

//   const simulateDraft = async () => {
//     let round = 1;
//     const allPicks = [];

//     while (round <= 10) {
//       let i = round % 2 === 0 ? 10 : 1;

//       while (i >= 1 && i <= 10) {
//         const selectedPlayer = i === userPick
//           ? selectPlayer(remainingPlayers, rankings, draftedPlayers)
//           : selectPlayer(remainingPlayers, rankings, draftedPlayers)[0];

//         const pick = { round, team: i === userPick ? 'User' : 'Computer', player: selectedPlayers.length > 0 ? selectedPlayers[0] : null };
//         allPicks.push(pick);

//         if (i === userPick) {
//           const chosenPlayers = draftedPlayers;
//           chosenPlayers.push({ team: 'User', player: selectedPlayer[0] });
//           setDraftedPlayers(chosenPlayers);
//           setRemainingPlayers((prevRemainingPlayers) =>
//             prevRemainingPlayers.filter((player) => player.id !== selectedPlayer[0].id)
//           );
//           setUserPick(null); // Reset userPick after making the user pick
//         } else {
//           const chosenPlayers = draftedPlayers;
//           chosenPlayers.push({ team: 'Computer', player: selectedPlayer[0] });
//           setDraftedPlayers(chosenPlayers);
//           setRemainingPlayers((prevRemainingPlayers) =>
//             prevRemainingPlayers.filter((player) => player.id !== selectedPlayer[0].id)
//           );
//         }

//         setOngoingPicks(allPicks);
//         i = round % 2 === 0 ? i - 1 : i + 1;
//       }

//       round++;
//     }
//   };

//   const handleUserPick = (event) => {
//     const selectedTeam = parseInt(event.target.value, 10);
//     setUserPick(selectedTeam);
//   };

//   const myTeam = draftedPlayers.filter(({ team }) => team === 'User');

//   return (
//     <>
//       <button onClick={simulateDraft} className="Sim-Draft">
//         Simulate Draft
//       </button>
//       <div>
//         <label htmlFor="userPick">Select your team:</label>
//         <select id="userPick" value={userPick || 'computer'} onChange={handleUserPick}>
//           <option value="computer">Select Team</option>
//           {[...Array(10)].map((_, index) => (
//             <option key={index + 1} value={index + 1}>
//               Team {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="draft">
//         <div>
//           {draftedPlayers.map(({ team, player }, index) => (
//             <div key={player.name}>
//               Pick {index + 1}: Team {team} selects {player.name}
//             </div>
//           ))}
//         </div>
//         <div>
//           <h4 className="my-team">My Team:</h4>
//           <div>{myTeam.map(({ player }) => <div key={player.id}>{player.name}</div>)}</div>
//         </div>
//       </div>
//       <div className="ongoing-picks">
//         <h4>Ongoing Picks:</h4>
//         {ongoingPicks.map((pick, index) => (
//           <div key={index}>
//             Round {pick.round}: Team {pick.team} selects {pick.player.name}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default DraftSim;

import React, { useEffect, useState } from 'react';

function DraftSim({ players, remainingPlayers, setRemainingPlayers }) {
    const [draftedPlayers, setDraftedPlayers] = useState([]);
    const [userPick, setUserPick] = useState("computer"); 
    const [numTeams, setTeams] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const rankings = {}
    players?.map(player => {
        rankings[player.name] = player.rank
    })

    const selectPlayer = (players, rankings, draftedPlayers) => {

        const availablePlayers = players.filter(
            (player) => !draftedPlayers.find((draftedPlayer) => draftedPlayer.player.id === player.id)
        )
        const rankedPlayers = availablePlayers.sort(
            (player1, player2) => rankings[player1.name] - rankings[player2.name]
        );

        return rankedPlayers;
    };

    //This selectPlayer function filters out the players who have already been drafted and then sorts the available players based on their rankings
    //The function then returns the sorted list of available players

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        setTeams(array)
    }

    useEffect(() => {
        shuffle(numTeams)
    }, [])


    function helper1(i) {
        const selectedPlayer = selectPlayer(remainingPlayers, rankings, draftedPlayers);
                    getUserSelection(selectedPlayer,
                        selectedPlayer[0].name, selectedPlayer[1].name, selectedPlayer[2].name,
                         (userSelectedPlayer) => {
                        const chosenPlayers = draftedPlayers
                        chosenPlayers.push({ team: userPick, player: userSelectedPlayer })
                        setDraftedPlayers(chosenPlayers);
                        setRemainingPlayers((prevRemainingPlayers) =>
                            prevRemainingPlayers.filter((player) => player.id !== userSelectedPlayer.id)
                        );
                    });

    }

    //This helper1 function is called when it's the user turn to pick and it invokes `getUserSelection` to get the user's pick

    function helper2(i) {
        const selectedPlayer = selectPlayer(remainingPlayers, rankings, draftedPlayers);
                    const chosenPlayers = draftedPlayers
                    chosenPlayers.push({ team: 'Computer', player: selectedPlayer[0] })
                    setDraftedPlayers(chosenPlayers)
                    setRemainingPlayers((prevRemainingPlayers) =>
                        prevRemainingPlayers.filter((player) => player.id !== selectedPlayer[0].id)
                    );

    }

    //This helper2 function is called when it's the computer's turn to pick and it automatically selects the top-ranked available player

    async function simulateDraft() {
        let round = 1
        while (round <= 10) {
            if (round % 2 === 0) {
            let i = 10
            while (i >= 1) {
                if (i === userPick) {
                    helper1(i)
                    i--
                } else {
                    helper2(i)
                    i--
                }
            }
            round++
            }
            else {
            let i = 1
            while (i <= 10) {
                if (i === userPick) {
                    helper1(i)
                    i++
                } else {
                    helper2(i)
                    i++
                }
            }
            round++
            }

        }
    }

    //This simulateDraftFunction simulates the entire draft with 10 rounds
    //It alternates between even and odd rounds to simulate the snake-style draft (1-10, 10-1, 1-10, and so on)
    //Calls helper1 for the user's turn and helper2 for the computer's turn


    async function getUserSelection(availablePlayers, p1, p2, p3, callback) {
        let userInput = window.prompt(`Your up! Here are the 3 best available players:
         ${p1} 
         ${p2}
         ${p3}`)
        const selectedPlayer = availablePlayers.find(player => player.name === userInput)
        console.log('player!!!!!!',selectedPlayer)
        if (selectedPlayer === undefined) {
            userInput = window.prompt(`That player doesn't exist! Select a player ${p1},${p2},${p3}):`)
        } else {
            callback(selectedPlayer)
        }
    }

    //This function prompts the user to select a player from a list of the three best available players
    //It uses the window.prompt method to get user input
    //The selected player is passed to the provided callback function



    const handleUserPick = (event) => {
        const selectedTeam = parseInt(event.target.value);
        setUserPick(selectedTeam);
    }

    //This function is called when the user selects their team from the dropdown
    //It updates the userPick state with the selected team


    const myTeam =  draftedPlayers.filter(({ team }) => team !== 'Computer')

    return (
        <>

            <button onClick={simulateDraft} className = "Sim-Draft">Simulate Draft</button>
            <div>
                <label htmlFor="userPick">Select your team:</label>
                <select id="userPick" value={userPick || 'computer'} onChange={handleUserPick}>
                    <option value="computer">Select Team</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                            Team {index + 1}
                        </option>
                    ))}
                </select>
            </div>
        
        <div className="draft">
        
            <div>
            {draftedPlayers.map(({ team, player }, index) => (
                <div key={player.name}>
                    Pick {index + 1}: Team {team} selects {player.name}
                </div>
            ))}
            </div>
            <div>
            <h4 className="my-team">My Team:</h4>
           <div>{myTeam.map(({  player }) => <div>{player.name}</div>)}</div>
           </div>
        </div>
        </>
    );
}

//The render method returns JSX that includes a button to simulate the draft, a dropdown for the user to select their team, and a display of drafted players

export default DraftSim;



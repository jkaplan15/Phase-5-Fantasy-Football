

import React, { useEffect, useState } from 'react';

function DraftSim({ players, remainingPlayers, setRemainingPlayers }) {
    const [draftedPlayers, setDraftedPlayers] = useState([]);
    const [numRound, setNumRound] = useState(1)
    const [userPick, setUserPick] = useState("computer"); // User's pick in each round

    const [numTeams, setTeams] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const rankings = {}
    players?.map(player => {
        rankings[player.name] = player.rank
    })

    //   console.log(rankings)


    const selectPlayer = (players, rankings, draftedPlayers) => {

        // console.log('❌❌❌', draftedPlayers)
        // console.log('❌', remainingPlayers)
        const availablePlayers = players.filter(
            (player) => !draftedPlayers.find((draftedPlayer) => draftedPlayer.player.id === player.id)
        )
        // console.log('👀', availablePlayers)
        // console.log('players available',availablePlayers)
        // console.log(draftedPlayer.player)
        const rankedPlayers = availablePlayers.sort(
            (player1, player2) => rankings[player1.name] - rankings[player2.name]
        );

        return rankedPlayers;
    };

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

    async function simulateDraft() {
        let round = 1
        while (round <= 10) {
            let i = 1
            // console.log(numRound)
            while (i <= 10) {
                console.log(draftedPlayers)
                console.log(i, round)
                if (i === userPick) {
                    const selectedPlayer = selectPlayer(remainingPlayers, rankings, draftedPlayers);
                    console.log(selectedPlayer[0].name, selectedPlayer[1].name, selectedPlayer[2].name)
                    // allow user to chose player from available players
                    getUserSelection(selectedPlayer,
                        selectedPlayer[0].name, selectedPlayer[1].name, selectedPlayer[2].name,
                         (userSelectedPlayer) => {
                        // console.log(`User selects ${userSelectedPlayer.name}`)
                        const chosenPlayers = draftedPlayers
                        chosenPlayers.push({ team: userPick, player: userSelectedPlayer })
                        setDraftedPlayers(chosenPlayers);
                        setRemainingPlayers((prevRemainingPlayers) =>
                            prevRemainingPlayers.filter((player) => player.id !== userSelectedPlayer.id)
                        );
                    });
                    i++
                } else {
                    const selectedPlayer = selectPlayer(remainingPlayers, rankings, draftedPlayers);
                    // simulate choose player
                    // grab random player from available players
                    // const chosenPlayers = [...draftedPlayers, ];
                    const chosenPlayers = draftedPlayers
                    chosenPlayers.push({ team: 'Computer', player: selectedPlayer[0] })
                    setDraftedPlayers(chosenPlayers)
                    setRemainingPlayers((prevRemainingPlayers) =>
                        prevRemainingPlayers.filter((player) => player.id !== selectedPlayer[0].id)
                    );
                    i++
                }
            }
            round++
        }
    }


    async function getUserSelection(availablePlayers, p1, p2, p3, callback) {
        // Implement logic to get user input here
        let userInput = window.prompt(`Your up! Here are the 3 best available players:

         ${p1} 
         ${p2}
         ${p3}`)
        // const selectedIndex = userInput
        const selectedPlayer = availablePlayers.find(player => player.name === userInput)
        console.log('player!!!!!!',selectedPlayer)
        if (selectedPlayer === undefined) {
            userInput = window.prompt(`That player doesn't exist! Select a player ${p1},${p2},${p3}):`)
        } else {
            callback(selectedPlayer)
        }
        
        // const selectedIndex = parseInt(1, 10) - 1

    }

    const handleUserPick = (event) => {
        const selectedTeam = parseInt(event.target.value);
        setUserPick(selectedTeam);
        console.log(event.target.value)
    }

    const myTeam =  draftedPlayers.filter(({ team, player }, index) => team !== 'Computer')

    return (
        <div>
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
            {draftedPlayers.map(({ team, player }, index) => (
                <div key={player.name}>
                    Pick {index + 1}: Team {team} selects {player.name}
                </div>
            ))}
            <h4>My Team:</h4>
           <div>{myTeam.map(({ team, player }, index) => <div>{player.name}</div>)}</div>
        </div>
    );
}

export default DraftSim;
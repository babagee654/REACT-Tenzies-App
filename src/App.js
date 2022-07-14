import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import SidedDie from "./components/SidedDie";

export default function App() {
    //States
    const [win, setWin] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())
    const [rollCounter, setRollCounter] = React.useState(0)
    const [personalBest, setPersonalBest] = React.useState(sessionStorage.getItem("personalBest") || null)
    const [isFirstGame, setIsFirstGame] = React.useState(sessionStorage.getItem("firstGame") || true)
    // useEffects
    React.useEffect(() => {
        const allHeld = dice.every(dice => dice.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(dice => dice.value === firstValue)
        if (allHeld && allSameValue) {
            setWin(true)
        }
    }, [dice])    // Run this effect if dice state has changed. 

    React.useEffect(() => {
        console.log("Running")
        // For subsequent games, only update personal best
        if (!isFirstGame && win && rollCounter < personalBest) {
            sessionStorage.setItem("personalBest", rollCounter)
            setPersonalBest(sessionStorage.getItem("personalBest"))
        }

        // After first game, set session to remember personal best and set no longer first game.
        if (isFirstGame === true && win) {
            sessionStorage.setItem("personalBest", rollCounter)
            sessionStorage.setItem("firstGame", false)
            setPersonalBest(sessionStorage.getItem("personalBest"))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [win]) // Run this effect only if win state has changed

    //Functions 
    function allNewDice() {
        let randomNums = []
        for (let i = 0; i < 10; i++) {
            let value = Math.floor((Math.random() * 6) + 1);
            randomNums.push({ value: value, isHeld: false, id: nanoid() })
        }
        return randomNums
    }

    function reroll() {
        setDice(oldDice => {
            // if isHeld is true, keep it, else reroll it.
            return oldDice.map(dice => {
                let reroll = Math.floor((Math.random() * 6) + 1);
                return dice.isHeld ? dice : { ...dice, value: reroll }
            })
        })
        setRollCounter(prev => prev + 1)
    }

    function toggleHold(id) {
        // console.log("Connected")
        // console.log(id)
        setDice(oldDice => {
            return oldDice.map(dice => {
                return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
            })
        })
    }

    function newGame() {
        setDice(allNewDice())
        setWin(prev => !prev)
        setIsFirstGame(false)
        setRollCounter(0)
    }

    // Array of Elements
    let diceElements = dice.map(die => {
        return <SidedDie
            value={die.value}
            isHeld={die.isHeld}
            key={die.id}
            id={die.id}
            toggleHold={toggleHold}
        />
    })

    return (
        <main>
            {win && <Confetti />}
            {win && <h2>You won with a set of {dice[0].value}'s after {rollCounter} rolls!</h2>}
            {!win && <h4>Roll until all dice are the same.
                Click each die to hold it at its current value between rolls.</h4>}
            {!win &&
                <div className="counters--container">
                    <h4>Rolls: {rollCounter}</h4>
                    {personalBest && <h4>Personal Best: {personalBest}</h4>}
                </div>
            }
            <div className="die--container">
                {diceElements}
            </div>
            <button className="reroll--button" onClick={win ? newGame : reroll}>{win ? "New Game" : "Reroll"}</button>
        </main>
    )
}
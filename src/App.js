import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    //States
    const [win, setWin] = React.useState(false)
    const [dice, setDice] = React.useState(allNewDice())

    // useEffects
    React.useEffect(() => {
        const allHeld = dice.every(dice => dice.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(dice => dice.value === firstValue)
        if (allHeld && allSameValue) {
            setWin(true)
            console.log("You won!")
        }
    }, [dice])    // Run this effect if dice state has changed. 

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
    }

    // Array of Elements
    let diceElements = dice.map(die => {
        return <Die
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
            {win && <h2>You won with a set of {dice[0].value}'s!</h2>}
            {!win && <p>Roll until all dice are the same.
                Click each die to hold it at its current value between rolls.</p>}
            <div className="die--container">
                {diceElements}
            </div>
            <button className="reroll--button" onClick={win ? newGame : reroll}>{win ? "New Game" : "Reroll"}</button>
        </main>
    )
}
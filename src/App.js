import React from "react";
import Die from "./components/Die";

export default function App() {

    function allNewDice() {
        let randomNums = []
        for (let i = 0; i < 10; i++) {
            let rand = Math.floor((Math.random() * 6) + 1);
            randomNums.push(rand)
        }
        return randomNums
    }

    const [dice, setDice] = React.useState(allNewDice())

    let diceElements = dice.map(die => {
        return <Die value={die} />
    })

    function reroll(event) {
        setDice(allNewDice())
    }

    return (
        <main>
            <div className="die--container">
                {diceElements}
            </div>
            <button onClick={reroll}>Reroll!</button>
        </main>
    )
}
import Die from "./components/Die";


function allNewDice() {
    let randomNums = []
    for (let i = 0; i < 10; i++) {
        let rand = Math.floor((Math.random() * 6) + 1);
        randomNums.push(rand)
    }
    return randomNums
}

allNewDice()

export default function App() {
    return (
        <main>
            <div className="die--container">
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
                <Die value="1" />
            </div>
        </main>
    )
}
export default function Die(props) {
    return (
        <div className={`die ${props.isHeld ? "held" : ""}`} onClick={() => props.toggleHold(props.id)}>
            <h3 className="die--num">{props.value}</h3>
        </div>
    )
}
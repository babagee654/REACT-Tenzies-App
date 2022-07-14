export default function SidedDie(props) {

    /**
     * 
     *  Top left dot: 2, 4, 5, 6
     *  Top centre dot: 6
     *  Top right dot: 3, 4, 5, 6
     * 
     *  Mid left dot: 
     *  Mid centre dot: 1, 3 ,5
     *  Mid right dot:
     * 
     *  Bot left dot: 3, 4, 5, 6
     *  Bot centre dot: 6
     *  Bot right dot: 2, 4, 5, 6
     */


    return (
        <div className={`face ${props.isHeld ? "held" : ""}`} onClick={() => props.toggleHold(props.id)}>
            {(props.value === 2 || props.value >= 4) && <div className="dot top left"></div>}
            {props.value === 6 && <div className="dot top center"></div>}
            {props.value >= 3 && <div className="dot top right"></div>}
            {(props.value === 1 || props.value === 3 || props.value === 5) && <div className="dot mid center"></div>}
            {props.value >= 3 && <div className="dot bot left"></div>}
            {props.value === 6 && <div className="dot bot center"></div>}
            {(props.value === 2 || props.value >= 4) && <div className="dot bot right"></div>}
        </div>
    )
}
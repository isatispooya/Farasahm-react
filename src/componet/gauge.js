
import { FaLocationArrow } from "react-icons/fa";



const GaugeMeter = (props) =>{
    return(
        <div className="gaugeConteiner">
            <div className="gauge">
                <ul className="meter">
                </ul>
                <div className="dial" style={{transform:`rotate(${(props.profitRate/100)*90}deg)`}}>
                    <div className="arrow">
                        <p><FaLocationArrow/></p>
                    </div>
                </div>
                <div className="value">
                    <p className="vrate">{(props.profitRate).toLocaleString()}%</p>
                    <p className="vprft">{(props.profit).toLocaleString()} M</p>
                </div>
            </div>
        </div>
    )
}


export default GaugeMeter
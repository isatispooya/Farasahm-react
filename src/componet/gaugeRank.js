
import { FaLocationArrow } from "react-icons/fa";



const GaugeMeterRank = (props) =>{
    return(
        <div className="gaugeConteiner">
            <div className="gauge">
                <ul className="meter">
                </ul>
                <div className="dial" style={{transform:`rotate(${(((props.rank - (props.count / 2))*-1)/((props.count+1) / 2))*180}deg)`}}>
                    <div className="arrow">
                        <p><FaLocationArrow/></p>
                    </div>
                </div>
                <div className="value">
                    <p className="vrate">{(props.rank).toLocaleString()}</p>
                    <p className="vprft">{(props.count).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}


export default GaugeMeterRank
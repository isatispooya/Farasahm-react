import { AccessContext } from "../../config/accessContext"
import { useEffect, useState , useContext } from "react"


const LoaderCircle = (props) =>{
    const [Message,setMessage] = useState('')
    useEffect(()=>{if(props.Message){setMessage(props.Message)}else{setMessage('')}},[props])
    const logoname = useContext(AccessContext)[1]

    if(props.loading){
        return(
            <div className="LoaderCircle">
                <div className="imgCntr">
                    <img src={process.env.PUBLIC_URL+'/img/'+logoname+'.png'}></img>
                </div>
                <h4>لطفا صبر کنید</h4>
                {Message==''?null:<p>{Message}</p>}
            </div>
        )
    }
}


export default LoaderCircle
import { useEffect, useState } from "react"


const MicroLoader = (props) =>{

    if(props.loading){
        return(
            <div className="microLoader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}


export default MicroLoader
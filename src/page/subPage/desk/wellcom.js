
import { useContext, useEffect, useState } from "react"
import { AccessContext } from "../../../config/accessContext"


const WellcomBrokerDesk = () =>{
    const access = useContext(AccessContext)
    const data = {
        deskboker:{logo:process.env.PUBLIC_URL+'/img/evisa.png',title:'کارگزاری ایساتیس پویا'},
        desksabad:{logo:process.env.PUBLIC_URL+'/img/nevisa.png',title:'سبدگردانی ایساتیس پویا'},
        deskvisa:{logo:process.env.PUBLIC_URL+'/img/visa.png',title:'سرمایه گذاری ایساتیس پویا'}
    }
    

    return(
        <div className="wellcom">
            <div className="logo">
                <img src={data[access[1]]['logo']}/>
                <h2>میزکار</h2>     
                <h1>{data[access[1]]['title']}</h1>
            </div>
        </div>
    )
}

export default WellcomBrokerDesk
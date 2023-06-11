import Header from "../componet/header/header"
import { getCookie } from "../componet/cookie/cookie"
import axios from "axios"
import { useState,useEffect } from "react"
import { OnRun } from "../config/config"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import Menu from "../componet/menu/Menu"
import { AccessContext } from "../config/accessContext"

const Desk = () =>{
    const [access, setAccess] = useState('')
    const Navigate = useNavigate()

    const AccessCheck = () =>{
        const id = getCookie('id')
        const symbol = getCookie('symbol')

        if(!symbol){Navigate('/section')}
        if(id){
            axios({method:'POST',url:OnRun+'/access',data:{id:id}
            }).then(response=>{
                if(response.data.replay){
                    setAccess(response.data.acc[symbol])
                }else{Navigate('/home')}
            })
        }else{Navigate('/home')}
    }

    useEffect(AccessCheck,[])
    return(
        <AccessContext.Provider value={[getCookie('id'),getCookie('symbol')]}>
            <div className="desk">
                <Header access={access}/>
                <main>
                        <Menu access={access}/>
                        <Outlet/>
                </main>
            </div>
        </AccessContext.Provider>

    )
}


export default Desk
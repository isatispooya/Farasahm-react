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

        if(!symbol){
            Navigate('/section')
        }else if(!id){
            Navigate('/section')
        }else{
            axios.post(OnRun+'/getapp',{id:id,symbol:symbol})
            .then(response=>{
                if (response.data.reply) {
                    setAccess(response.data.app)
                }else{
                    Navigate('/section')
                }
            })
        }

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
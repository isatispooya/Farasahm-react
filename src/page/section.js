import {useState, useEffect } from "react"
import { getCookie ,setCookie} from "../componet/cookie/cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { OnRun } from "../config/config"
import { AiOutlinePoweroff} from "react-icons/ai";


const Section = ()=>{
    const [access, setAccess] = useState('')
    const [disable, setDisable] = useState('')
    const Navigate = useNavigate()

    const exitBtn = () =>{
        setCookie('id','',0)
        setCookie('symbol','',0)
        Navigate('/')
    }

    const toDesk = (name,firstPage) =>{
        setCookie('symbol',name,365)
        Navigate('/desk/'+firstPage)
    }

    const AccessCheck = () =>{
        const id = getCookie('id')
        if(id){
            axios({method:'POST',url:OnRun+'/access',data:{id:id}
            }).then(response=>{
                if(response.data.replay){
                    setAccess(response.data)
                }else{
                    setCookie('id','',0)
                    Navigate('/',)
                }
            })
        }else{Navigate('/')}
    }

    useEffect(AccessCheck,[])

    return(
        <div className='sectionPage'>
            <div className='continer'>
                <div className="hdr">
                    <span onClick={exitBtn}><AiOutlinePoweroff/><p>خروج</p></span>
                </div>
                <div className="row row1">
                    <div className="culomn">
                        <h4>ناشران</h4>
                        <div className="listPart">
                            {
                                access['enabled']?
                                access['enabled'].map(i=>{
                                    if(i['type']=='boursiCompany'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div onClick={()=>toDesk(i['name'],i['firstPage'])} key={i['name']} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['symbol']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                :null
                            }
                            {
                                access['disabled']?
                                access['disabled'].map(i=>{
                                    if(i['type']=='boursiCompany'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div key={i['name']} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['name']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <></>
                                        )
                                    }
                                })
                                :null
                            }
                        </div>
                    </div>
                    <div className="culomn dash">
                        <h4>داشبرد</h4>
                        <div className="listPart">
                        {
                                access['enabled']?
                                access['enabled'].map(i=>{
                                    if(i['type']=='desk'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div onClick={()=>toDesk(i['name'],i['firstPage'])} key={i['name']} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['symbol']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                :null
                            }
                            {
                                access['disabled']?
                                access['disabled'].map(i=>{
                                    if(i['type']=='desk'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div key={i['name']} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['name']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <></>
                                        )
                                    }
                                })
                                :null
                            }
                           
                        </div>
                    </div>
                    <div className="culomn">
                        <h4>ابزار های مالی</h4>
                        <div className="listPart">
                        {
                                access['enabled']?
                                access['enabled'].map(i=>{
                                    if(i['type']=='financialToos'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div onClick={()=>toDesk(i['name'],i['firstPage'])} key={i['name']} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['symbol']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                :null
                            }
                            {
                                access['disabled']?
                                access['disabled'].map(i=>{
                                    if(i['type']=='financialToos'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div key={i['name']} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['name']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <></>
                                        )
                                    }
                                })
                                :null
                            }

                        </div>
                    </div>
                </div>
                <div className="row  row2">
                    <div className="culomn">
                        <h4>شرکت های گروه مالی ایساتیس</h4>
                        <div className="listPart">
                        {
                                access['enabled']?
                                access['enabled'].map(i=>{
                                    if(i['type']=='company'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div onClick={()=>toDesk(i['name'],i['firstPage'])} key={i['name']} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['symbol']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                :null
                            }
                            {
                                access['disabled']?
                                access['disabled'].map(i=>{
                                    if(i['type']=='company'){
                                        var img = '/img/' + i['icon']
                                        return(
                                            <div key={i['name']} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{i['name']}</h6>
                                                    <p className="fullName">{i['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <></>
                                        )
                                    }
                                })
                                :null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Section
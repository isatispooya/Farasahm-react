import {useState, useEffect } from "react"
import { getCookie ,setCookie} from "../componet/cookie/cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { OnRun } from "../config/config"
import { AiOutlinePoweroff ,AiOutlineHome ,AiOutlineCloudUpload} from "react-icons/ai";

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
                    setAccess(response.data.acc)
                    setDisable(response.data.disable)
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
                                Object.keys(access).map(i=>{
                                    if(access[i]['type']=='boursiCompany'){
                                        var img = '/img/' + access[i]['icon']
                                        return(
                                            <div onClick={()=>toDesk(i,access[i]['firstPage'])} key={i} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{access[i]['name']}</h6>
                                                    <p className="fullName">{access[i]['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                Object.keys(disable).map(i=>{
                                    if(disable[i]['type']=='boursiCompany'){
                                        var img = '/img/' + disable[i]['icon']
                                        return(
                                            <div key={i} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{disable[i]['name']}</h6>
                                                    <p className="fullName">{disable[i]['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="culomn">
                        <h4>ابزار های مالی</h4>
                        <div className="listPart">
                            {
                                Object.keys(access).map(i=>{
                                    if(access[i]['type']=='financialToos'){
                                        var img = '/img/' + access[i]['icon']
                                        return(
                                            <div onClick={()=>toDesk(i,access[i]['firstPage'])} key={i} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{access[i]['name']}</h6>
                                                    <p className="fullName">{access[i]['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                Object.keys(disable).map(i=>{
                                    if(disable[i]['type']=='financialToos'){
                                        var img = '/img/' + disable[i]['icon']
                                        return(
                                            <div key={i} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{disable[i]['name']}</h6>
                                                    <p className="fullName">{disable[i]['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="row  row2">
                    <div className="culomn">
                        <h4>شرکت های گروه مالی ایساتیس</h4>
                        <div className="listPart">
                            {
                                Object.keys(access).map(i=>{
                                    if(access[i]['type']=='company'){
                                        var img = '/img/' + access[i]['icon']
                                        return(
                                            <div onClick={()=>toDesk(i,access[i]['firstPage'])} key={i} className="btnSct">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{access[i]['name']}</h6>
                                                    <p className="fullName">{access[i]['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                Object.keys(disable).map(i=>{
                                    if(disable[i]['type']=='company'){
                                        var img = '/img/' + disable[i]['icon']
                                        return(
                                            <div key={i} className="btnSct btnSctDis">
                                                <img src={img}/>
                                                <div>
                                                    <h6>{disable[i]['name']}</h6>
                                                    <p className="fullName">{disable[i]['fullName']}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Section
import { getCookie,setCookie } from "../cookie/cookie"
import { useNavigate } from "react-router-dom"
import { useEffect, useState , useContext } from "react"
import axios from "axios"
import { OnRun } from "../../config/config"
import { AccessContext } from "../../config/accessContext"
import { AiOutlinePoweroff ,AiOutlineHome ,AiOutlineCloudUpload} from "react-icons/ai";

const Header = (props) =>{
    const Navigate = useNavigate()
    const [allName, setAllName] = useState(null)
    const access = useContext(AccessContext)
    const [traderSelect, setTraderSelect] = useState('')
    const navigate = useNavigate()
    
    const exitBtn = () =>{
        setCookie('id','',0)
        setCookie('symbol','',0)
        Navigate('/')
    }
    const homeBtn = () =>{
        setCookie('symbol','',0)
        Navigate('/section')
    }
    const updateBtn = () =>{
        Navigate('update')
    }
    const basicInformationBtn = () =>{
        Navigate('biasicinformation')
    }

    const getAllName = () =>{
        if(access){
            axios({method:'POST',url:OnRun+'/getallname',data:{access:access}
            }).then(response=>{
                if(response.data.replay){
                    setAllName(response.data.df)
                }else{
                    setAllName(null)
                }
            })
        }
    }

    const handleGetDetails = () => {
        if(allName){
            const inList = (allName.find(i => i.code == traderSelect))
            if (inList != undefined && inList.code == traderSelect) {
                Navigate('/desk/excerpttrader/'+traderSelect)
            }
        }
    }
    
    useEffect(getAllName,[access])
    useEffect(handleGetDetails,[traderSelect])

    return(
        <header>
            <img src={'/img/'+props.access.icon}/>
            <div className="title" onClick={basicInformationBtn}>
                <h1>{props.access.name}</h1>
                <h2>{props.access.fullName}</h2>
            </div>

            <div className="btn-bs">
                <span onClick={exitBtn}><AiOutlinePoweroff/><p>خروج</p></span>
                <span onClick={homeBtn}><AiOutlineHome/><p>خانه</p></span>
                {props.access==''?null:props.access.menu.includes("update")?<span onClick={updateBtn}><AiOutlineCloudUpload/><p>بروزرسانی</p></span>:null}
                {allName==null?null:
                    <>
                    <input value={traderSelect} onChange={(e)=>setTraderSelect(e.target.value)}list="allname" placeholder="جستجو"></input>
                    <datalist id="allname">
                        {
                            allName.map(i=>{
                                return(
                                    <option key={(Math.floor(Math.random()*10000000000))} value={i.code}>{i.fullname}</option>
                                )
                            })
                        }

                    </datalist>
                    </>
                }
            </div>

        </header>
    )
}



export default Header
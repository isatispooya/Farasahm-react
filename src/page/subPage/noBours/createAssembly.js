import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios, { Axios } from "axios"
import { OnRun } from '../../../config/config'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa' 
import { BsPlusCircle} from "react-icons/bs";
import { AiOutlineDelete} from "react-icons/ai";
import { FiEdit} from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify'
import { AiOutlineCheckCircle , AiOutlineCloseCircle} from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

const CreateAssembly = () =>{

    const [popUp, setPopUp] = useState(false)
    const access = useContext(AccessContext)
    const [dateSelection, setDateSelection] = useState(new DateObject)
    const [dict, setDict] = useState({time:'',address:'',agenda:'',description:'',title:'',controller:false,managers:false})
    const [controllerInput, setControllerInput] = useState('')
    const [controller, setController] = useState([])

    const [df, setDf] = useState([])
 
    const apply = () =>{
        axios.post(OnRun+'/createassembly',{date:dateSelection,dict:dict,access:access,controller:controller})
            .then(response=>{
                if (response.data.replay) {
                    toast.success("ثبت شد",{position: toast.POSITION.BOTTOM_RIGHT})
                    setPopUp(false)
                    getAssembly()
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
    }


    const handleAddController =()=>{
        var c = controller.concat([controllerInput])
        setController(c)
    }


    const timeHandle = (j) =>{
        if (j>=0 && j<24) {
            setDict({...dict,time:j})
        } 
    }


    const getAssembly = () =>{
        axios.post(OnRun+'/getassembly',{access:access})
        .then(response=>{
            console.log(response.data)
            if (response.data.replay) {
                setDf(response.data.df)
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }
    const delAssembly = (idassembly) =>{
        console.log(idassembly)
        axios.post(OnRun+'/delassembly',{idassembly:idassembly,access:access})
        .then(response=>{
            getAssembly()
        })
    }

    const Edit = (data) =>{
        setDict(data)
        setPopUp(true)

    }

    useEffect(getAssembly,[])

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">ایجاد مجمع</h2>
                <p className="btntls" onClick={()=>{setPopUp(!popUp)}}><span><BsPlusCircle/></span>افزودن</p>
            </div>
            {
                popUp?
                <div className="PopUpTransactions createassembly">
                    <div className="row">
                        <div>
                            <p>عنوان</p>
                            <input  value={dict.title} onChange={(e)=>{setDict({...dict,title:e.target.value})}}/>
                        </div>
                        <div>
                            <p>تاریخ</p>
                            <DatePicker  value={dateSelection} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={setDateSelection}/>
                        </div>
                        <div>
                            <p>ساعت</p>
                            <input type="number" value={dict.time} onChange={(e)=>{timeHandle(e.target.value)}}/>
                        </div>
                        <div>
                            <p>مکان</p>
                            <input  value={dict.address} onChange={(e)=>{setDict({...dict,address:e.target.value})}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <p>دستور جلسه</p>
                            <input className="agenda" value={dict.agenda} onChange={(e)=>{setDict({...dict,agenda:e.target.value})}}/>
                        </div>
                        <div>
                            <p>توضیحات</p>
                            <input className="agenda" value={dict.description} onChange={(e)=>{setDict({...dict,description:e.target.value})}}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="votesMaker">
                            <input type="checkbox" id="controller" checked={dict.controller} onChange={()=>setDict({...dict,controller:!dict.controller})}  ></input>
                            <label htmlFor="controller">انتخاب بازرس</label>
                            {
                                dict.controller?
                                    <div className="opt">
                                        <h3>کاندیدا ها انتخاب بازرس</h3>
                                        <div>
                                            {
                                                controller.map(i=>{
                                                    return(
                                                        <span key={i}>{i}</span>
                                                    )
                                                })
                                            }
                                            <div className="addVote">
                                                <input value={controllerInput} onChange={(e)=>setControllerInput(e.target.value)} />
                                                <p onClick={handleAddController}><GrAddCircle/></p>
                                            </div>
                                        </div>
                                    </div>
                                    :null
                            }
                        </div>
                        <div>
                            <input type="checkbox" id="managers" checked={dict.managers} onChange={()=>setDict({...dict,managers:!dict.managers})}></input>
                            <label htmlFor="managers">انتخاب هیئت مدیره</label>
                        </div>

                    </div>
                    <button onClick={apply}>ثبت</button>
                    <button onClick={()=>setPopUp(false)}>لغو</button>
                </div>
                :null
            }
            <div className="assemblyList">
                {
                    df!=[]?
                    df.map(i=>{
                        return(
                            <div className="assemblyConteiner">
                                <div className="assemblyDetail">
                                    <p>{i.title}</p>
                                    <div className="tad">
                                        <p>ساعت: {i.time}</p>
                                        <p>تاریخ: {i.date}</p>
                                        <p>آدرس: {i.address}</p>
                                    </div>
                                    <p>دستور جلسه: {i.agenda}</p>
                                    <p>توضیحات: {i.description}</p>
                                        {i.controller?
                                            <div>
                                                <h5>انتخابات بازرس:</h5>
                                                {
                                                    i.controller.map(j=>{
                                                        return(
                                                            <p>{j}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            :null
                                        }

                                </div>
                                <div className="delEdit">
                                    <span onClick={()=>delAssembly(i)}><AiOutlineDelete/></span>
                                    <span onClick={()=>Edit(i)}><FiEdit/></span>
                                </div>
                            </div>
                        )
                    }):null
                }
            </div>
        </div>
    )
}


export default CreateAssembly
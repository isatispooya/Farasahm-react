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
import { MdGroups} from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import { RxClock } from "react-icons/rx";
import { BsCalendarDate ,BsPinMapFill} from "react-icons/bs";

const CreateAssembly = () =>{

    const [popUp, setPopUp] = useState(false)
    const access = useContext(AccessContext)
    const [dateSelection, setDateSelection] = useState(new DateObject)
    const [dict, setDict] = useState({time:'',address:'',agenda:'',description:'',title:'',controller:false,managers:false})
    const [controllerInput, setControllerInput] = useState('')
    const [controller, setController] = useState([])
    const navigate = useNavigate()


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
        if (controllerInput!='') {
            var c = controller.concat([controllerInput])
            setController(c)
        }
    }


    const timeHandle = (j) =>{
        if (j>=0 && j<24) {
            setDict({...dict,time:j})
        } 
    }


    const getAssembly = () =>{
        axios.post(OnRun+'/getassembly',{access:access})
        .then(response=>{
            if (response.data.replay) {
                setDf(response.data.df)
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }
    const delAssembly = (idassembly) =>{
        axios.post(OnRun+'/delassembly',{idassembly:idassembly,access:access})
        .then(response=>{
            getAssembly()
        })
    }

    const Edit = (data) =>{
        setDict(data)
        setController(data.controller)
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
                <div className="createassembly">
                    <div className="row1">
                        <div className="field">
                            <p>عنوان</p>
                            <input  value={dict.title} onChange={(e)=>{setDict({...dict,title:e.target.value})}}/>
                        </div>
                        <div className="field">
                            <p>تاریخ</p>
                            <DatePicker  value={dateSelection} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={setDateSelection}/>
                        </div>
                        <div className="field">
                            <p>ساعت</p>
                            <input type="number" value={dict.time} onChange={(e)=>{timeHandle(e.target.value)}}/>
                        </div>
                        <div className="field">
                            <p>مکان</p>
                            <input  value={dict.address} onChange={(e)=>{setDict({...dict,address:e.target.value})}}/>
                        </div>
                    </div>
                    <div className="row2">
                        <div>
                            <p>دستور جلسه</p>
                            <textarea value={dict.agenda} onChange={(e)=>{setDict({...dict,agenda:e.target.value})}}/>
                        </div>
                        <div>
                            <p>توضیحات</p>
                            <textarea value={dict.description} onChange={(e)=>{setDict({...dict,description:e.target.value})}}/>
                        </div>
                    </div>
                    <div className="row3" >
                        <div className="prt">
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
                                            <div className="adding">
                                                <input value={controllerInput} onChange={(e)=>setControllerInput(e.target.value)} />
                                                <p onClick={handleAddController}><BiAddToQueue/></p>
                                            </div>
                                        </div>
                                    </div>
                                    :null
                            }
                        </div>
                        <div className="prt">
                            <input type="checkbox" id="managers" checked={dict.managers} onChange={()=>setDict({...dict,managers:!dict.managers})}></input>
                            <label htmlFor="managers">انتخاب هیئت مدیره</label>
                        </div>

                    </div>
                    <div className="bbtn">
                    <button onClick={apply}>ثبت</button>
                    <button onClick={()=>setPopUp(false)}>لغو</button>
                    </div>
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
                                    <div className="title">
                                        <p>عنوان مجمع</p>
                                        <p>{i.title}</p>
                                    </div>
                                    <div className="tad">
                                        <div className="cntnr-tad">
                                            <span><RxClock/></span>
                                            <p>{i.time}:00</p>
                                        </div>
                                        <div className="cntnr-tad">
                                            <span><BsCalendarDate/></span>
                                            <p>{i.date}</p>
                                        </div>
                                        <div className="cntnr-tad addr">
                                            <span><BsPinMapFill/></span>
                                            <p>{i.address}</p>
                                        </div>
                                    </div>
                                    <div className="cntnr-dis">
                                        <div>
                                            <h6>دستور جلسه</h6>
                                            <p>{i.agenda}</p>
                                        </div>
                                        <div>
                                            <h6>توضیحات</h6>
                                            <p>{i.description}</p>
                                        </div>
                                        
                                    </div>
                                    {i.controller?
                                        <div className="voteController">
                                            <h5>کاندیدا های حسابرسی و بازرس:</h5>
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
                                    <div className="btn" onClick={()=>delAssembly(i)}>
                                        <span><AiOutlineDelete/></span>
                                        <p>حذف</p>
                                    </div>
                                    <div className="btn" onClick={()=>Edit(i)}>
                                        <span ><FiEdit/></span>
                                        <p>ویرایش</p>
                                    </div>
                                    <div className="btn"onClick={()=>navigate('/desk/attendeesassembly')}>
                                        <span ><MdGroups/></span>
                                        <p>برگزاری</p>
                                    </div>
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
import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa' 
import { BsFiletypePdf , BsFiletypeCsv , BsPlusCircle} from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify'

const CreateAssembly = () =>{

    const [popUp, setPopUp] = useState(false)
    const access = useContext(AccessContext)
    const [dateSelection, setDateSelection] = useState(new DateObject)
    const [dict, setDict] = useState({'time':'','address':'','agenda':'','description':''})
    const [df, setDf] = useState([])


    const apply = () =>{
        axios.post(OnRun+'/createassembly',{date:dateSelection,dict:dict,access:access})
            .then(response=>{
                if (response.data.replay) {
                    toast.success("ثبت شد",{position: toast.POSITION.BOTTOM_RIGHT})
                    setPopUp(false)
                }
            })
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
    

    useEffect(getAssembly,[])

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">نقل و انتقال</h2>
                <p className="btntls" onClick={()=>{setPopUp(!popUp)}}><span><BsPlusCircle/></span>افزودن</p>
            </div>
            {
                popUp?
                <div className="PopUpTransactions createassembly">
                    <div className="row">
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
                                    <div className="tad">
                                        <p>ساعت: {i.time}</p>
                                        <p>تاریخ: {i.date}</p>
                                        <p>آدرس: {i.address}</p>
                                    </div>
                                    <p>دستور جلسه: {i.agenda}</p>
                                    <p>توضیحات: {i.description}</p>
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
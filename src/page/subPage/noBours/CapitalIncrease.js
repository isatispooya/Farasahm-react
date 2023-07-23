
import { useContext, useEffect, useState } from "react";
import { BsFiletypePdf , BsFiletypeCsv , BsPlusCircle} from "react-icons/bs";
import { AccessContext } from "../../../config/accessContext"
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa' 
import axios from "axios";
import { OnRun } from "../../../config/config";
import { ToastContainer, toast } from 'react-toastify'

import { MdDelete} from "react-icons/md";


const CapitalIncrease = () =>{
    const [popUp, setPopUp] = useState(false)
    const [df, setDf] = useState([])
    const [data, setData] = useState({methode:'آورده سهامداران',capital:'',cuont:''})
    const access = useContext(AccessContext)
    const [dateSelection, setDateSelection] = useState(new DateObject)

    const addCI = () =>{
        if (data.capital=='') {toast.warning("لطفا مقدار سرمایه رو مشخص کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (data.cuont=='') {toast.warning("لطفا تعداد سهام رو مشخص کنید",{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/addcapitalincrease',{access:access,data:data,dateSelection:dateSelection})
            .then(response=>{
                if (response.data.replay) {
                    toast.success("ثبت شد",{position: toast.POSITION.BOTTOM_RIGHT})
                    getCi()
                    setPopUp(false)
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }

    const getCi = () =>{
        axios.post(OnRun+'/getcapitalincrease',{access:access})
        .then(response=>{
            if (response.data.replay) {
                setDf(response.data.df)
            }
        })
    }


    const delCi = (id) =>{
        axios.post(OnRun+'/delcapitalincrease',{access:access,id:id})
        .then(response=>{
            if (response.data.replay) {
                toast.success("حذف شد",{position: toast.POSITION.BOTTOM_RIGHT})
                getCi()
            }
        })
    }

    useEffect(getCi,[])
    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">افزایش سرمایه</h2>
                <p onClick={()=>setPopUp(!popUp)}  className="btntls" ><span><BsPlusCircle/></span>افزودن</p>
            </div>
            {
                popUp?
                <div className="popUpCapitalIncrease">
                    <div className="field">
                        <p>روش</p>
                        <select value={data.methode} onChange={(e)=>setData({...data,methode:e.target.value})}>
                            <option value="آورده سهامداران">آورده سهامداران</option>
                        </select>
                    </div>
                    <div className="field">
                        <p>سرمایه جدید</p>
                        <input value={data.capital} onChange={(e)=>setData({...data,capital:e.target.value})}></input>
                    </div>
                    <div className="field">
                        <p>تعداد جدید</p>
                        <input value={data.cuont} onChange={(e)=>setData({...data,cuont:e.target.value})}></input>
                    </div>
                    <div className="field">
                        <p>تاریخ</p>
                        <DatePicker  value={dateSelection} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={setDateSelection}/>
                    </div>
                    
                    <div className="bbtn">
                        <button onClick={addCI} type="submit">ثبت</button>
                        <button onClick={()=>setPopUp(false)}>لغو</button>
                    </div>
                </div>
                :null
            }

            {
                df.map(i=>{
                    return(
                        <div key={i['_id']} className="capInc-Card">
                            <div className="fld">
                                <p>روش</p>
                                <p>{i['methode']}</p>
                            </div>
                            <div className="fld">
                                <p>تاریخ</p>
                                <p>{i['date']}</p>
                            </div>
                            <div className="fld">
                                <p>تعداد</p>
                                <p>{(i['newCount']).toLocaleString()}</p>
                            </div>
                            <div className="fld">
                                <p>سرمایه</p>
                                <p>{(i['newCapitalIns']).toLocaleString()}</p>
                            </div>
                            <div className="fld">
                                <p>نرخ</p>
                                <p>{i['rate']}%</p>
                            </div>
                            <div className="act">
                                <span onClick={()=>delCi(i['_id'])}><MdDelete/></span>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default CapitalIncrease
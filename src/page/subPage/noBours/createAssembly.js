import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa'

import { BsFiletypePdf , BsFiletypeCsv , BsPlusCircle} from "react-icons/bs";
const CreateAssembly = () =>{

    const [popUp, setPopUp] = useState(false)
    const access = useContext(AccessContext)
    console.log(access)
    const [dateSelection, setDateSelection] = useState(new DateObject)
    const [dict, setDict] = useState({'time':'','address':'','agenda':'','description':''})


    const apply = () =>{

        axios.post(OnRun+'/createassembly',{date:dateSelection,dict:dict,access:access})
            .then(response=>{
                console.log(response)
            })
    }






    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">نقل و انتقال</h2>

                <p className="btntls" onClick={()=>{setPopUp(!popUp)}}><span><BsPlusCircle/></span>افزودن</p>
            </div>
            {
                popUp?
                <div className="PopUpTransactions">
                    <div>
                        <p>تاریخ</p>
                        <DatePicker  value={dateSelection} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={setDateSelection}/>
                    </div>
                    <div>
                        <p>ساعت</p>
                        <input value={dict.time} onChange={(e)=>{setDict({...dict,time:e.target.value})}}/>
                    </div>
                    <div>
                        <p>مکان</p>
                        <input value={dict.address} onChange={(e)=>{setDict({...dict,address:e.target.value})}}/>
                    </div>
                    <div>
                        <p>دستور جلسه</p>
                        <input value={dict.agenda} onChange={(e)=>{setDict({...dict,agenda:e.target.value})}}/>
                    </div>
                    <div>
                        <p>توضیحات</p>
                        <input value={dict.description} onChange={(e)=>{setDict({...dict,description:e.target.value})}}/>
                    </div>
                    <button onClick={apply}>ثبت</button>
   
                </div>
                :null
            }

        </div>
    )
}


export default CreateAssembly
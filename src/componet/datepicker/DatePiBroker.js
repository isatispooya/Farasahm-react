import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa'
import { useState , useContext, useEffect } from "react"
import axios from "axios"
import { OnRun } from "../../config/config"
import { AccessContext } from "../../config/accessContext"
import Button from "react-multi-date-picker/components/button"
const DatePiBroker = (props) =>{
    const access = useContext(AccessContext)
    const [dateSelection, setDateSelection] = useState()
    const [dateAvalibale, setDateAvalibale] = useState([])
    const handle = (date) =>{
        setDateSelection(date)
        
    }

    const lastUpdate = () =>{
        axios.post(OnRun+'/desk/broker/dateavalibale',{access:access})
        .then(response=>{
            
            setDateAvalibale(response.data.dataList)
            setDateSelection(

                new DateObject(
                    {
                        date:response.data.weekDate,
                        format: "YYYY-MM-DD",
                        calendar: persian,
                        locale: persian_fa
                    }
                )
            )
        })
    }


    useEffect(lastUpdate,[])
    useEffect(()=>props.setDateSelection(dateSelection),[dateSelection])
    return(
        <div className='datepi'>
            <DatePicker
              mapDays={({ date }) => {
                let color
                let dateInt = String(date.year)
                if (date.month<10){
                    dateInt = dateInt + '0' + String(date.month)
                }else{
                    dateInt = dateInt + String(date.month)
                }
                if (date.day<10){
                    dateInt = dateInt + '0' + String(date.day)
                }else{
                    dateInt = dateInt + String(date.day)
                }
                if (dateAvalibale.includes(dateInt)){

                    return {
                        style: { color: "#000" },
                    }
                }else{
                    return {
                        disabled: true,
                        style: { color: "red" },
                    }
                }
                
              }}
             render={<Button/>} value={dateSelection} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={handle}/>
        </div>
    )
}

export default DatePiBroker
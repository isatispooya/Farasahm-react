import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa'
import { useState , useContext, useEffect } from "react"
import axios from "axios"
import { OnRun } from "../../config/config"
import { AccessContext } from "../../config/accessContext"
import Button from "react-multi-date-picker/components/button"
import MicroLoader from "../Loader/microLoader"

const DateFromToNow = (props) =>{
    const access = useContext(AccessContext)
    const [dateFrom, setDateFrom] = useState()
    const [dateTo, setDateTo] = useState()

    const getDateAvalibale = () =>{
        axios.post(OnRun+'/desk/broker/datenow',{access:access})
        .then(response=>{
            setDateTo(new DateObject({
                date:response.data.lastDate,
                format: "YYYY-MM-DD",
                calendar: persian,
                locale: persian_fa
            }))
            setDateFrom(new DateObject({
                date:response.data.weekDate,
                format: "YYYY-MM-DD",
                calendar: persian,
                locale: persian_fa
            }))
        })
    }

    useEffect(getDateAvalibale,[])
    useEffect(()=>props.setDateSelection([dateFrom,dateTo]),[dateFrom,dateTo])
    return(
        <>
            <div className='datefromto'>
                {
                    dateTo==null?
                    <MicroLoader loading={true} />
                    :
                    <DatePicker
                        value={dateTo}
                        calendar={persian}
                        locale={persian_fa}
                        className="purple"
                        inputClass="custom-input"
                        onChange={setDateTo}
                    />
                }
                <p>تا</p>
            </div>
            <div className='datefromto'>
                {
                    dateFrom==null?
                    <MicroLoader loading={true} />
                    :
                    <DatePicker
                        value={dateFrom}
                        calendar={persian}
                        locale={persian_fa}
                        className="purple"
                        inputClass="custom-input"
                        onChange={setDateFrom}
                    />
                }
                <p>از</p>
            </div>
        </>
    )
}

export default DateFromToNow
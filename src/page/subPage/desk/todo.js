import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { OnRun } from '../../../config/config'
import { AccessContext } from '../../../config/accessContext'
import DateFromToNow from '../../../componet/datepicker/DateFromToNow'
import {BsPlusCircle,BsCheckLg,} from "react-icons/bs";
import {IoSpeedometerOutline, IoSpeedometerSharp ,IoWarningOutline, IoWarningSharp} from "react-icons/io5";
import Rating from 'react-rating'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa'
import { Tooltip } from 'react-tooltip';
import { AiOutlineHourglass ,AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import { BiAlarmExclamation,BiAlarmOff} from "react-icons/bi";

const Todo = () =>{
    const access = useContext(AccessContext)
    const [DateSelection, setDateSelection] = useState(null)
    const [popup, setPopup] = useState({enable:false,title:'',discription:'', deadlineDate:'', reminderDate:'', force:1, importent:1, repetition:'daily',person:''})
    const repetition = {daily:'روزانه', weekly:'هفتگی', monthly:'ماهانه', yearly:'سالانه',quarterly:'فصلی'}
    const [dfListTodo, setDfListTodo] = useState([])

    const handleDateReminder = (date) =>{
        setPopup({...popup,reminderDate:date})
    }

    const handleDateDeadline = (date) =>{
        setPopup({...popup,deadlineDate:date})
    }

    const add = () =>{
        if (popup.title == '') {toast.warning('ورودی عنوان خالی است',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (popup.discription=='') {toast.warning('ورودی توضیحات خالی است',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (popup.reminderDate =='') {toast.warning('ورودی تاریخ یاداور خالی است',{position: toast.POSITION.BOTTOM_RIGHT})   
        }else if (popup.deadlineDate =='') {toast.warning('ورودی تاریخ سررسید خالی است',{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/desk/todo/addtask',{access:access,popup:popup})
            .then(response=>{
                if(response.data.reply){
                    toast.success('ثبت شد',{position: toast.POSITION.BOTTOM_RIGHT})
                    setPopup({enable:false,title:'',discription:'', deadlineDate:'', reminderDate:'', force:1, importent:1, repetition:'daily',person:''})
                }else{
                    toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }

    const handleTitle = (e) =>{
        if (e.target.value.length<60) {
            setPopup({...popup,title:e.target.value})
        }else{
            setPopup({...popup,title:e.target.value.substring(0, 60)})
        }
    }

    const handleDiscripte = (e) =>{
        if (e.target.value.length<1000) {
            setPopup({...popup,discription:e.target.value})
        }else{
            setPopup({...popup,discription:e.target.value.substring(0, 1000)})
        }
    }

    const getTodoList = () =>{
        if (DateSelection!=null) {
            if (DateSelection[0]!=undefined && DateSelection[1]!=undefined) {
                axios.post(OnRun+'/desk/todo/gettask',{access:access,DateSelection:DateSelection})
                .then(response=>{
                    if (response.data.reply) {
                        setDfListTodo(response.data.df)
                        console.log(response.data.df)
                    }else{
                        toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                    }
                })
            }
        }
    }

    const setActToTask = (act,task) =>{
        axios.post(OnRun+'/desk/todo/setact',{access:access , act:act , task:task})
        .then(response=>{
            if (response.data.reply) {
                toast.success('ثبت شد',{position: toast.POSITION.BOTTOM_RIGHT})
                getTodoList()
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }

    useEffect(getTodoList,[popup.enable, DateSelection])

    return(
        <div className="subPage">
            {
                popup.enable?
                <div className='PopUpToDo'>
                    <div className='closer' onClick={()=>setPopup({...popup,enable:false})}></div>
                    <div className='win'>
                        <div className='fild'>
                            <p>عنوان</p>
                            <input value={popup.title} onChange={(e)=>handleTitle(e)} placeholder='عنوان'></input>
                            <h6>{popup.title.length}/60</h6>
                        </div>
                        <div className='fild'>
                            <p>توضیحات</p>
                            <textarea value={popup.discription} onChange={(e)=>handleDiscripte(e)} placeholder='توضیحات'></textarea>
                            <h6>{popup.discription.length}/1000</h6>
                        </div>
                        <div className='fild'>
                            <p>فوریت</p>
                            <Rating start={0} stop={5} onChange={(rate)=>setPopup({...popup,force:rate})} initialRating={popup.force} emptySymbol={<span className='emptySymbol force'><IoSpeedometerOutline/></span>} fullSymbol={<span className='fullSymbol force'><IoSpeedometerSharp/></span>} />
                            <h6>{popup.force}/5</h6>
                        </div>
                        <div className='fild'>
                            <p>اهمیت</p>
                            <Rating start={0} stop={5} onChange={(rate)=>setPopup({...popup,importent:rate})} initialRating={popup.importent} emptySymbol={<span className='emptySymbol important'><IoWarningOutline/></span>} fullSymbol={<span className='fullSymbol important'><IoWarningSharp/></span>} />
                            <h6>{popup.importent}/5</h6>
                        </div>
                        <div className='fild'>
                            <p>تاریخ یادوری</p>
                            <DatePicker value={popup.reminderDate} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={handleDateReminder}/>
                        </div>
                        <div className='fild'>
                            <p>تاریخ سررسید</p>
                            <DatePicker value={popup.date} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={handleDateDeadline}/>
                        </div>
                        <div className='fild'>
                            <p>تکرار</p>
                            <select value={popup.repetition} onChange={(e)=>setPopup({...popup,repetition:e.target.value})}>
                                <option value='NoRepetition'>بدون تکرار</option>
                                <option value='daily'>روزانه</option>
                                <option value='weekly'>هفتگی</option>
                                <option value='monthly'>ماهانه</option>
                                <option value='quarterly'>فصلی</option>
                                <option value='yearly'>سالانه</option>
                            </select>
                        </div>
                        <div className='fild'>
                            <p>مسئول</p>
                            <input value={popup.person} onChange={(e)=>setPopup({...popup,person:e.target.value})}></input>
                        </div>
                        <button onClick={add}>افزودن</button>
                    </div>
                </div>
                :null
            }
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">وظایف</h2>
                <div className="btntls">
                    <p onClick={()=>setPopup({...popup,enable:!popup.enable})} className=""><span><BsPlusCircle/></span>افزودن</p>
                    <DateFromToNow setDateSelection={setDateSelection} />
                </div>
            </div>
            <div className='todoListConteiner'>
                {
                    Object.keys(dfListTodo).map(i=>{
                        return(
                            <div className={dfListTodo[i].length>0?'todoDate':'todoDate noTask'} key={i}>
                                <div className='titles'>
                                    <h1>{i}</h1>
                                    <p>{dfListTodo[i].length}</p>
                                </div>
                                {
                                    dfListTodo[i].length==0?null:
                                    <div className='conteinerTask'>
                                    {
                                        dfListTodo[i].map(j=>{
                                            const key = Math.floor(Math.random()*10000000000)
                                            return(
                                                <>
                                                    <div data-tooltip-delay-show="300" data-tooltip-content={j.discription} data-tooltip-id={"myTooltip"+key} className='todoTask' key={Math.floor(key)+'kys'+Math.floor(Math.random()*10000000000)}>
                                                        <div className='ttl'>
                                                            <h2 >{j.title}</h2>
                                                            <div className={j.expier_deadlineDate?"trSts":"flSts"}></div>
                                                        </div>
                                                        <div className='imFrc'>
                                                            <div>
                                                                <span><IoSpeedometerSharp/></span>
                                                                <p>{j.force}</p>
                                                            </div>
                                                            <div>
                                                                <span><IoWarningSharp/></span>
                                                                <p>{j.importent}</p>
                                                            </div>
                                                        </div>
                                                        <div className='todoHide dtRp'>
                                                            <div>
                                                                <span><BiAlarmExclamation/></span>
                                                                <p>{j.jalali_reminderDate}</p>
                                                            </div>
                                                            <div>
                                                                <span><BiAlarmOff/></span>
                                                                <p>{j.jalali_deadlineDate}</p>
                                                            </div>
                                                        </div>
                                                        <div className='todoHide prRd'>
                                                            <p>{repetition[j.repetition]}</p>
                                                            <p>{j.person}</p>
                                                        </div>
                                                        <div className='todoHide act'>
                                                            <button onClick={()=>setActToTask('done',j)}><AiOutlineCheck/></button>
                                                            <button onClick={()=>setActToTask('doing',j)}><AiOutlineHourglass/></button>
                                                            <button onClick={()=>setActToTask('failed',j)}><AiOutlineClose/></button>
                                                        </div>
                                                    </div>
                                                    <Tooltip id={"myTooltip"+key} place="bottom" />
                                                </>
                                            )
                                        })
                                    }
                                    </div>
                                }

                            </div>
                        )
                    })
                }
            </div>


        </div>
    )

}



export default Todo
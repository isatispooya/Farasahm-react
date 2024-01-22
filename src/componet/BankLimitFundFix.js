import { useState , useContext, useEffect} from "react"
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa'
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios"
import { OnRun } from "../config/config"
import { AccessContext } from "../config/accessContext"


const BankLimitFundFix = (props)=>{
    const access = useContext(AccessContext)

    const [bank, setBank] = useState({name:'ملی ایران', balance:0, return:'monthly', rate:20, num:''})
    const [startDate, setStartDate] = useState()


    const bankListName =[
        "ملی ایران", "اقتصاد نوین", "قرض‌الحسنه مهر ایران", "سپه", "پارسیان", "قرض‌الحسنه رسالت", "صنعت و معدن", "کارآفرین", "کشاورزی", "سامان", "مسکن", "سینا",
        "توسعه صادرات ایران", "خاورمیانه", "توسعه تعاون", "شهر", "پست ایران", "دی", "صادرات", "ملت", "تجارت", "رفاه", "حکمت ایرانیان", "گردشگری", "ایران زمین",
        "سرمایه", "پاسارگاد", "مشترک ایران-ونزوئلا",
    ]

    const submit = () =>{
        if (bank.name=='') {toast.warning('نام بانک را انتخاب کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (bank.balance<=0) {toast.warning('مبلغ سپرده را صحیح وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (bank.return=='') {toast.warning('دوره پرداخت سود را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (bank.rate<=0) {toast.warning('نرخ سود را  صحیح وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (startDate==undefined) {toast.warning('تاریخ شروع سپرده گذاری را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/setnewbankbalance',{access:access,bank:bank,startDate:startDate})
            .then(response=>{
                if (response.data.reply) {
                    toast.success('ثبت شد',{position: toast.POSITION.BOTTOM_RIGHT})
                    setBank({name:'ملی ایران', balance:0, return:'monthly', rate:20})
                    props.setEnable({...props.enable.bank, bank:false})
                }else{
                    toast.warning('ثبت نشد',{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }


    if (props.enable.bank) {
        return(
            <div className="popupInp">
                <ToastContainer autoClose={3000} />
                <div className="soul" onClick={()=>props.setEnable({...props.enable.bank, bank:false})}></div>
                <div className="win">
                    <fieldset>
                        <label>نام بانک</label>
                        <select value={bank.name} onChange={(e)=>setBank({...bank,name:e.target.value})}>
                            {
                                bankListName.map(i=>{
                                    return(
                                        <option key={i} value={i}>{i}</option>
                                    )
                                })
                            }
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>مبلغ</label>
                        <input value={bank.balance} onChange={(e)=>setBank({...bank, balance:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>دوره پرداخت سود</label>
                        <select onChange={(e)=>setBank({...bank, return:e.target.value})} value={bank.value}>
                            <option value={'monthly'}>ماهانه</option>
                            <option value={'yearly'}>سالانه</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>نرخ سود</label>
                        <input value={bank.rate} onChange={(e)=>setBank({...bank, rate:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>شماره حساب</label>
                        <input value={bank.num} onChange={(e)=>setBank({...bank, num:e.target.value})}></input>
                    </fieldset>
                    <fieldset>
                        <label>تاریخ شروع</label>
                        <DatePicker value={startDate} calendar={persian} locale={persian_fa} onChange={setStartDate}/>
                    </fieldset>
                    <button onClick={submit}>ثبت</button>
                </div>
            </div>
        )
    }
}

export default BankLimitFundFix
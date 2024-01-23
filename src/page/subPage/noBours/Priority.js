import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TbTransform} from "react-icons/tb";
import { BsCashCoin, BsFiletypePdf, BsFiletypeCsv} from "react-icons/bs";
import { OnRun } from "../../../config/config";
import { AccessContext } from "../../../config/accessContext"
import { ToastContainer, toast } from 'react-toastify'
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { useNavigate } from "react-router-dom";
import { exportPdf } from "../../../config/exportPdf"

import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from 'react-date-object/locales/persian_fa' 
import LoaderCircle from "../../../componet/Loader/LoadingCircle";


const Priority = () =>{
    const [transaction, setTransaction] = useState({popUp:false,frm:'',to:'',count:''})
    const [pay, setPay] = useState({popUp:false,count:'',value:'',document:''})
    const [dateSelection, setDateSelection] = useState(new DateObject)
    const [datePriority, setDatePriority] = useState(null)
    const [datePriorityLst, setDatePriorityLst] = useState(null)
    const [loading, setLoading] = useState(true)

    // console.log(datePriority)
    // console.log(datePriorityLst)

    const [allName, setAllName] = useState([])
    const [df, setDf] = useState([])





    const access = useContext(AccessContext)
    const navigate = useNavigate()


    const getDatePriority = () =>{
        setLoading(true);
        axios.post(OnRun+'/getdatepriority',{access:access})
        .then(response=>{
            if (response.data.reply) {
                setDatePriority(response.data.lst[0]['date'])
                setDatePriorityLst(response.data.lst)
            }else{
                toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
        setLoading(false);

    }

    const getAllPepole = () =>{
        axios.post(OnRun+'/getallnamenobourse',{access:access})
        .then(response=>{
            setAllName(response.data.df)
        })
    }


    const get = () =>{
        if (datePriority) {
            axios.post(OnRun+'/getpriority',{access:access, datePriority:datePriority})
            .then(response=>{
                if(response.data.replay){
                    setDf(response.data.df)
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }


    var rowMenu = [
        {
            label:"انتقال",
            action:function(e, row){
                const matchingItem = datePriorityLst.find(item => item.date == datePriority)
                if (matchingItem.enable===true) {
                    const dt =row.getData()
                    setTransaction({...transaction,popUp:true,frm:dt['نام و نام خانوادگی'],count:dt['حق تقدم']})
                    setPay({...pay,popUp:false})
                }else{
                    toast.warning('این افزایش سرمایه پایان یافته',{position: toast.POSITION.BOTTOM_RIGHT})
                }
            }
        },
        {
            label:"پرداخت",
            action:function(e, row){
                const matchingItem = datePriorityLst.find(item => item.date == datePriority)
                if (matchingItem.enable===true) {
                    const dt =row.getData()
                    setPay({...pay,popUp:true,frm:dt['نام و نام خانوادگی'],count:dt['حق تقدم']})
                    setTransaction({...transaction,popUp:false})
                }else{
                    toast.warning('این افزایش سرمایه پایان یافته',{position: toast.POSITION.BOTTOM_RIGHT})
                }
            }
        },

    ]

    const setTransactionPriority = () =>{
        if (transaction.frm=='') {toast.warning('نام فروشنده را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if(transaction.to==''){toast.warning('نام خریدار را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (transaction.count==0) {toast.warning('تعداد حق  تقدم را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/settransactionpriority',{transaction:transaction, access:access, datePriority:datePriority})
            .then(response =>{
                if(response.data.replay){
                    toast.success('انجام شد',{position: toast.POSITION.BOTTOM_RIGHT})
                    get()
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }


    const setPayPriority = () =>{
        if (pay.count<=0) {toast.warning('مقدار باید بیشتر از صفر باشد',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (pay.value<=0) {toast.warning('مبلغ باید بیشتر از صفر باشد',{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/setpayprority',{pay:pay,access:access, date:dateSelection, datePriority:datePriority})
            .then(response=>{
                if (response.data.replay) {
                    toast.success('انجام شد',{position: toast.POSITION.BOTTOM_RIGHT})
                    get()
                }else{
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }



    if(df!=[]){
        var table = new Tabulator("#data-table", {
            data:df,
            layout:"fitColumns",
            responsiveLayout:true,
            columnHeaderSortMulti:true,
            pagination:"local",
            paginationSize:50,
            paginationSizeSelector:[10, 20, 50, 100, 200,500],
            movableColumns:true,
            layoutColumnsOnNewData:false,
            textDirection:"rtl",
            autoResize:false,
            rowContextMenu: rowMenu,
            columns:[
                {title:"نام و نام خانوادگی", field:"نام و نام خانوادگی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"count"},
                {title:"کد ملی", field:"کد ملی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"شماره تماس", field:"شماره تماس", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"تعداد سهام", field:"تعداد سهام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"حق تقدم", field:"حق تقدم", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"استفاده شده", field:"حق تقدم استفاده شده", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"تعداد سهام بعد از افزایش سرمایه", field:"countForward", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"ارزش واریز", field:"ارزش واریز", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"تعداد واریز", field:"تعداد واریز", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"تاریخ ", field:"تاریخ", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
            ],
        })
    }


    useEffect(getAllPepole,[])
    useEffect(get,[datePriority])
    useEffect(getDatePriority,[])
    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
            <LoaderCircle loading={loading} />

                <h2 className="titlePage">حق تقدم</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>

                <div className="btntls">
                    <p onClick={()=>navigate('/desk/prioritytransaction')}  className="btntls" ><span><TbTransform/></span>ریز تراکنش ها</p>
                    <p onClick={()=>navigate('/desk/prioritypay')}  className="btntls" ><span><BsCashCoin/></span>ریز پرداخت ها</p>
                    {
                        datePriorityLst==null?null:
                        <select onChange={(e)=>setDatePriority(e.target.value)}>
                            {
                                datePriorityLst.slice().reverse().map(i => {
                                    // console.log(i);
                                    return (
                                        <option key={i.date} value={i.date}>{i.date}</option>
                                    );
                                })
                            }
                        </select>
                    }
                </div>
            </div>
            {
                transaction.popUp?
                <div className="popUpCapitalIncrease">
                    <div className="field">
                        <p>مبدا</p>
                        <input value={transaction.frm} onChange={(e)=>setTransaction({...transaction,frm:e.target.value})} list="browsersFrm"/>
                        <datalist id="browsersFrm">
                            {
                                allName.map(i=>{
                                    return(
                                        <option>{i['نام و نام خانوادگی']}</option>
                                    )
                                })
                            }
                        </datalist>
                    </div>
                    <div className="field">
                        <p>مقصد</p>
                        <input value={transaction.to} onChange={(e)=>setTransaction({...transaction,to:e.target.value})} list="browsersTo"/>
                        <datalist id="browsersTo">
                            {
                                allName.map(i=>{
                                    return(
                                        <option>{i['نام و نام خانوادگی']}</option>
                                    )
                                })
                            }
                        </datalist>
                    </div>
                    <div className="field">
                        <p>تعداد</p>
                        <input value={transaction.count} onChange={(e)=>setTransaction({...transaction,count:e.target.value})} list="browsers"/>
                    </div>
                    <div className="bbtn">
                        <button onClick={setTransactionPriority} type="submit">ثبت</button>
                        <button onClick={()=>setTransaction({...transaction,popUp:false})}>لغو</button>
                    </div>
                </div>
                :null
            }

            {
                pay.popUp?
                <div className="popUpCapitalIncrease">
                    <div className="field">
                        <p>مبدا</p>
                        <input value={pay.frm} onChange={(e)=>setPay({...pay,frm:e.target.value})} list="browsersFrm"/>
                        <datalist id="browsersFrm">
                            {
                                allName.map(i=>{
                                    return(
                                        <option>{i['نام و نام خانوادگی']}</option>
                                    )
                                })
                            }
                        </datalist>
                    </div>
                    <div className="field">
                        <p>تعداد</p>
                        <input value={pay.count} onChange={(e)=>setPay({...pay,count:e.target.value})}/>
                    </div>
                    <div className="field">
                        <p>مبلغ</p>
                        <input value={pay.value} onChange={(e)=>setPay({...pay,value:e.target.value})}/>
                    </div>
                    <div className="field">
                        <p>سند</p>
                        <input value={pay.document} onChange={(e)=>setPay({...pay,document:e.target.value})} />
                    </div>
                    <div className="field">
                        <p>تاریخ</p>
                        <DatePicker  value={dateSelection} calendar={persian} locale={persian_fa} className="purple" inputClass="custom-input" onChange={setDateSelection}/>
                    </div>
                    <div className="bbtn">
                        <button onClick={setPayPriority} type="submit">ثبت</button>
                        <button onClick={()=>setPay({...pay,popUp:false})}>لغو</button>
                    </div>
                </div>
                :null
            }
            <div id="data-table"></div>
        </div>
    )
}


export default Priority
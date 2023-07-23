import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsFiletypePdf , BsFiletypeCsv , BsPlusCircle} from "react-icons/bs";
import { OnRun } from "../../../config/config";
import { AccessContext } from "../../../config/accessContext"
import { ToastContainer, toast } from 'react-toastify'
import {TabulatorFull as Tabulator} from 'tabulator-tables';



const Priority = () =>{
    const [transaction, setTransaction] = useState({popUp:false,frm:'',to:'',count:''})
    const [pay, setPay] = useState({popUp:false,count:''})
    const [allName, setAllName] = useState([])
    const [df, setDf] = useState([])
    const access = useContext(AccessContext)


    const getAllPepole = () =>{
        axios.post(OnRun+'/getallnamenobourse',{access:access})
        .then(response=>{
            setAllName(response.data.df)
        })
    }

    const get = () =>{
        axios.post(OnRun+'/getpriority',{access:access})
        .then(response=>{
            if(response.data.replay){
                setDf(response.data.df)
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }


    var rowMenu = [
        {
            label:"انتقال",
            action:function(e, row){
                const dt =row.getData()
                setTransaction({...transaction,popUp:true,frm:dt['نام و نام خانوادگی'],count:dt['حق تقدم']})
                setPay({...pay,popUp:false})
            }
        },
        {
            label:"پرداخت",
            action:function(e, row){
                const dt =row.getData()
                setPay({...pay,popUp:true,frm:dt['نام و نام خانوادگی'],count:dt['حق تقدم']})
                setTransaction({...transaction,popUp:false})
            }
        },

    ]

    const setTransactionPriority = () =>{
        if (transaction.frm=='') {toast.warning('نام فروشنده را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if(transaction.to==''){toast.warning('نام خریدار را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else if (transaction.count==0) {toast.warning('تعداد حق  تقدم را وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT})
        }else{
            axios.post(OnRun+'/settransactionpriority',{transaction:transaction,access:access})
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
        }else{
            axios.post(OnRun+'/setpayprority',{pay:pay,access:access})
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
                {title:"نام و نام خانوادگی", field:"نام و نام خانوادگی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"کد ملی", field:"کد ملی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"حق تقدم", field:"حق تقدم", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"استفاده شده", field:"حق تقدم استفاده شده", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"تاریخ ", field:"تاریخ", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
            ],
        })
    }


    useEffect(getAllPepole,[])
    useEffect(get,[])
    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">حق تقدم</h2>
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
                        <input value={pay.count} onChange={(e)=>setPay({...pay,count:e.target.value})} list="browsers"/>
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
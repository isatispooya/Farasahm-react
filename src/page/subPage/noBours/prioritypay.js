import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { OnRun } from "../../../config/config"
import { AccessContext } from "../../../config/accessContext"
import { ToastContainer, toast } from 'react-toastify'
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { BsCashCoin, BsFiletypePdf, BsFiletypeCsv} from "react-icons/bs";
import { exportPdf } from "../../../config/exportPdf"
import LoaderCircle from "../../../componet/Loader/LoadingCircle"




const PriorityPay = () =>{

    const [df, setDf] = useState([])
    const access = useContext(AccessContext)
    const [datePriority, setDatePriority] = useState(null)
    const [loading, setLoading] = useState(true)



    const getDatePriority = () =>{
        setLoading(true);
        axios.post(OnRun+'/getdatepriority',{access:access})
        .then(response=>{
            if (response.data.reply) {
                const lst = response.data.lst;
                const lastDate = lst[lst.length - 1].date;
                setDatePriority({ selected: lastDate, lst: lst });
            }else{
                toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
        setLoading(false);
    }


    var rowMenu = [
        {
            label:"حذف",
            action:function(e, row){
                const matchingItem = datePriority.lst.find(item => item.date == datePriority.selected)

                if (matchingItem.enable===true) {
                    const dt =row.getData()
                    axios.post(OnRun+'/delprioritypay',{access:access,dt:dt})
                    .then(response=>{
                        if(response.data.replay){
                            get()
                            toast.success('حذف شد')
                        }else{
                            toast.warning(response.data.msg)
                        }
                    })
                }else{
                    toast.warning('این افزایش سرمایه پایان یافته',{position: toast.POSITION.BOTTOM_RIGHT})
                }
            }
        },

    ]


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
                {title:"سهامدار", field:"frm", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"تعداد", field:"count", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"ارزش", field:"value", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")

                    },
                },
                {title:"سند", field:"document", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
            ],
        })
    }


    const get = () =>{
        if (datePriority){
            axios.post(OnRun+'/getprioritypay',{access:access, date:datePriority.selected})
            .then(response=>{
                if (response.data.replay) {
                    setDf(response.data.df)
                }else{
                    setDf([])
                    toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                }
            })
        }
    }


    useEffect(get, [datePriority])
    useEffect(getDatePriority,[])

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <LoaderCircle loading={loading} />
            <div className="tls">
                <h2 className="titlePage">تراکنش های حق تقدم</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                <div className="btntls">
                    {
                        datePriority==null?null:
                        <select onChange={(e)=>setDatePriority({...datePriority,selected:e.target.value})}>
                            {
                                datePriority.lst.slice().reverse().map(i=>{
                                    return(
                                        <option key={i.date} value={i.date}>{i.date}</option>
                                        )
                                    })
                            }
                        </select>
                    }
                </div>
            </div>
            <div id="data-table"></div>
        </div>
    )
}


export default PriorityPay
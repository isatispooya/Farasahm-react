import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { OnRun } from "../../../config/config"
import { AccessContext } from "../../../config/accessContext"
import { ToastContainer, toast } from 'react-toastify'
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { BsFiletypePdf, BsFiletypeCsv} from "react-icons/bs";
import { exportPdf } from "../../../config/exportPdf"




const PriorityTransaction = () =>{
    const [df, setDf] = useState([])
    const access = useContext(AccessContext)

    var rowMenu = [
        {
            label:"حذف",
            action:function(e, row){
                axios.post(OnRun+'/delprioritytransaction',{access:access,id:row.getData()['_id']})
                .then(response=>{
                    if (response.data.replay) {
                        toast.success('حذف شد',{position: toast.POSITION.BOTTOM_RIGHT})
                    }else{
                        toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                    }
                })
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
                {title:"فروشنده", field:"frm", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                {title:"خریدار", field:"to", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"تعداد", field:"count", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",topCalc:'sum'},
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
            ],
        })
    }


    const get = () =>{
        axios.post(OnRun+'/getprioritytransaction',{access:access})
        .then(response=>{
            if (response.data.replay) {
                setDf(response.data.df)
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }


    useEffect(get, [])

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">تراکنش های حق تقدم</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
            </div>
            <div id="data-table"></div>
        </div>
    )
}


export default PriorityTransaction
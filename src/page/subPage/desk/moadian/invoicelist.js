import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { OnRun } from "../../../../config/config"
import { AccessContext } from "../../../../config/accessContext"
import MiniLoader from "../../../../componet/Loader/miniLoader"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { ToastContainer, toast } from 'react-toastify'



const InvoceList = () =>{
    const [df, setDf] = useState(null)
    const access = useContext(AccessContext)


    const getDf = () =>{
        axios.post(OnRun+'/getinvoce',{access:access})
        .then(response=>{
            if (response.data.reply) {
                setDf(response.data.df)
            }
        })
    }


    var rowMenu = [
        {
            label:"ارسال",
            action:function(e, row){
                axios.post(OnRun+'/sendinvoce',{access:access,id:row.getData()['_id']})
                .then(response=>{
                    if (response.data.reply) {
                        toast.success('ارسال شد',{position: toast.POSITION.BOTTOM_RIGHT})
                        getDf()
                    }
                })
                
            }
        },
        {
            label:"استعلام",
            action:function(e, row){
                axios.post(OnRun+'/inquiryinvoce',{access:access,id:row.getData()['_id']})
                .then(response=>{
                    if (response.data.reply) {
                        toast.success('ارسال شد',{position: toast.POSITION.BOTTOM_RIGHT})
                        getDf()
                    }else{
                        toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                    }
                })
                
            }
        },
        {
            label:"ابطال",
            action:function(e, row){
                axios.post(OnRun+'/moadian/cloninvoiceebtal',{access:access,id:row.getData()['_id']})
                .then(response=>{
                    if (response.data.reply) {
                        toast.success('ارسال شد',{position: toast.POSITION.BOTTOM_RIGHT})
                        getDf()
                    }else{
                        toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                    }
                })
                
            }
        },
    ]

    if(df!=null){
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
            dataTree:true,
            dataTreeStartExpanded:false,
            rowContextMenu: rowMenu,
            columns:[
                {title:"id", visible:false, field:"_id", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"عنوان", field:"title", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"شناسه ارسال", field:"uid", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"شماره ارجاع", field:"referenceNumber", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"وضعیت", field:"status", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"خطا ها", field:"error", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
            ],
        })
    }



    useEffect(getDf,[])

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage"> نتایج </h2>
            </div>
            {df===null?<MiniLoader />:null}
            <div id="data-table"></div>
        </div>
    )
}


export default InvoceList
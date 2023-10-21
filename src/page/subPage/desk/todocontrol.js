
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { OnRun } from '../../../config/config'
import { AccessContext } from '../../../config/accessContext'
import {BsPlusCircle,BsCheckLg,} from "react-icons/bs";
import { IoReloadSharp } from "react-icons/io5";
import {TabulatorFull as Tabulator} from 'tabulator-tables';




const TodoControl = () =>{

    const access = useContext(AccessContext)
    var rowMenu = [
        {
            label:"حذف",
            action:(e, row)=>{
                axios.post(OnRun+'/desk/todo/deltask',row.getData())
                .then(response=>{
                    console.log(response.data)
                })
            }
        }
    ]


    const getDf = () =>{
        axios.post(OnRun+'/desk/todo/getcontrol',{access:access})
        .then(response=>{
            if (response.data.reply) {
                var table = new Tabulator("#data-table", {
                    data:response.data.df,
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
                        {title:"عنوان", field:"title", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"توضیحات", field:"discription", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"مسئول", field:"person", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"تکرار", field:"repetition", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"فوریت", field:"force", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"ضرورت", field:"importent", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"یاداوری", field:"jalali_reminderDate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"سررسید", field:"jalali_deadlineDate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"یاداوری منقضی", field:"expier_reminderDate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"سررسید منقضی", field:"expier_deadlineDate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"وضعیت", field:"act", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                    ],
                })
            }
        })
    }


    
    useEffect(getDf,[])
    
    return(
        <div className="subPage">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">مدیریت وظایف</h2>
                <div className="btntls">
                    <p onClick={getDf} className=""><span><IoReloadSharp/></span>بارگذاری</p>
                </div>
            </div>
            <div id="data-table"></div>

        </div>
    )
}

export default TodoControl



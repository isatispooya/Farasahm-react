import { useContext, useEffect, useState } from "react"
import { AccessContext } from "../../../../config/accessContext"
import { ToastContainer, toast } from 'react-toastify'
import { BsInfoCircle , BsPlusCircle } from "react-icons/bs";
import InfoPopUp from "../../../../componet/popup/info";
import axios from "axios";
import { OnRun } from "../../../../config/config";

import {TabulatorFull as Tabulator} from 'tabulator-tables';


const TraderCodes = () =>{
    const access = useContext(AccessContext)
    const [infoData, setInfoData] = useState({enable:false,title:'راهنمای صفحه',
        row:[
            {title:'کدهای معاملات',content:'منظور کد هایی است که در اختیار شرکت سبدگردانی است و در محاسبات مختلف مورد استفاده قرار میگیرد'},
        ]}
    )
    const [popup,setPopup] = useState({popup:false,code:'',info:'-'})

    
    var rowMenu = [
        {
            label:"حذف",
            action:function(e, row){
                axios.post(OnRun+'/desk/sabad/delcodetrade',{access:access,row:row.getData()})
                .then(response=>{
                    toast.success('حذف شد',{position: toast.POSITION.BOTTOM_RIGHT})
                })
            }
        },
    ]
    
    const getInfoCode = () =>{
        setPopup({...popup,info:'-'})
        axios.post(OnRun+'/desk/getinfocode',{code:popup.code,access:access})
        .then(response=>{
            if (response.data.reply) {
                setPopup({...popup,info:response.data.dic})
                toast.success('دریافت اطلاعات موفق',{position: toast.POSITION.BOTTOM_RIGHT})
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }

    const addCodeTraderToSabad = () =>{
        axios.post(OnRun+'/desk/sabad/addcodetrader',{code:popup.code,access:access})
        .then(response=>{
            if (response.data.reply) {
                setPopup({popup:false,code:'',info:'-'})
                toast.success('ثبت شد',{position: toast.POSITION.BOTTOM_RIGHT})
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }


    const getDf = () =>{
        axios.post(OnRun+'/desk/sabad/codetrader',{access:access})
        .then(response=>{
            if (response.data.reply) {
                var table = new Tabulator("#data-table", {
                    data:response.data.df,
                    layout:"fitColumns",
                    responsiveLayout:true,
                    columnHeaderSortMulti:true,
                    pagination:"local",
                    paginationSize:1000,
                    paginationSizeSelector:[10, 20, 50, 100, 200,500,1000],
                    movableColumns:true,
                    layoutColumnsOnNewData:false,
                    textDirection:"rtl",
                    autoResize:false,
                    dataTree:true,
                    dataTreeStartExpanded:false,
                    rowContextMenu: rowMenu,
                    columns:[
                        {title:"کد",headerTooltip:'code', field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                        {title:"نام",headerTooltip:'name', field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"}
                    ]
                })
                toast.success('اطلاعات بروز شد',{position: toast.POSITION.BOTTOM_RIGHT})
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }

    useEffect(getDf,[])
    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <InfoPopUp data={infoData} setData={setInfoData}/>
            <div className="tls">
                <h2 className="titlePage">حجم معاملات</h2>
                <div className="btntls">
                    <p onClick={()=>{setPopup({...popup,popup:!popup.popup})}}><span><BsPlusCircle/></span>افزودن</p>
                    <p onClick={()=>setInfoData({...infoData,enable:!infoData.enable})} className=""><span><BsInfoCircle/></span>راهنمایی</p>
                </div>
            </div>
            {
                popup.popup?
                <div className="PopUpTransactions">
                    <div className="trd">
                        <fieldset>
                            <label>*کد</label>
                            <input value={popup.code} onChange={(e)=>setPopup({...popup,code:e.target.value})}></input>
                        </fieldset>
                        <fieldset className="prgName">
                            <label>نام کدمعاملاتی</label>
                            <p>{popup.info}</p>
                        </fieldset>
                        <fieldset className="getinfo">
                            <label></label>
                            <button onClick={getInfoCode} >دریافت اطلاعات</button>
                        </fieldset>
                    </div>
                    <div className="btn">
                        <button onClick={()=>setPopup(false)}>لغو</button>
                        <button onClick={addCodeTraderToSabad}>تایید</button>
                    </div>
                </div>
                :null

            }

            <div id="data-table"></div>

        </div>
    )
}



export default TraderCodes
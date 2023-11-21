import { FaCoins } from "react-icons/fa";
import BankLimitFundFix from "../../../componet/BankLimitFundFix";
import { useState , useContext} from "react"
import { ToastContainer, toast } from 'react-toastify'
import { AccessContext } from "../../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../../config/config";
import {TabulatorFull as Tabulator} from 'tabulator-tables';

const LimitFundFix = () =>{
    const [enable, setEnable] = useState({bank:false})
    const access = useContext(AccessContext)


    var rowMenu = [
        {
            label:"حذف",
            action:function(e, row){
                axios.post(OnRun+'/delbankassetfund',{access:access,row:row.getData()})
                .then(response=>{
                    if (response.data.reply) {
                        toast.success('حذف شد',{position: toast.POSITION.BOTTOM_RIGHT})
                        getAsset()
                    }else{
                        toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
                    }
                })
            }
        },
    ]


    const getAsset = () =>{
        axios.post(OnRun+'/getassetfund',{access:access})
        .then(response=>{
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
                height:'auto',
                rowContextMenu: rowMenu,
                columns:[
                    {title:"نوع", field:"type", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                    {title:"دارایی", field:"name", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                    {title:"شماره", field:"num", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input"},
                    {title:"ارزش", field:"value", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<p>"+ (value*1).toLocaleString()+"</p>")
                        },
                    },
                    {title:"نسبت", field:"rate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                        formatter:function(cell, formatterParams){
                            var value = cell.getValue();
                            return("<p> % "+ (value*1).toLocaleString()+"</p>")

                        },
                    },
                    {title:"محدودیت ها", field:"warning", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",},
                ],
            })
            
        })
    }



    useState(getAsset,[enable])

    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000}/>
            <div className="tls">
                <h2 className="titlePage">حد نصب های صندوق</h2>
                <p className="btntls" onClick={()=>setEnable({...enable, bank:!enable.enable})}><span><FaCoins/></span>حساب بانکی</p>
            </div>
            <BankLimitFundFix enable={enable} setEnable={setEnable} />
            <div id="data-table"></div>
            

        </div>
    )
}


export default LimitFundFix

import { useState ,useContext, useEffect} from "react";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import axios from "axios";
import { OnRun } from "../../../config/config";
import { AccessContext } from "../../../config/accessContext";
import MiniLoader from "../../../componet/Loader/miniLoader";



const Potential = () =>{
    const access = useContext(AccessContext)
    const [loading, setLoadnig] = useState(true)

    const getDf = () =>{
        axios.post(OnRun+'/getpotentialcoustomer',{access:access})
        .then(response=>{
            setLoadnig(false)
            if(response.data.reply){
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
                    columns:[
                        {title:"مشتری", field:"CustomerTitle", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"نام سهم", field:"MarketInstrumentTitle", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"نماد", field:"Symbol", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"حجم", field:"Volume", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"تعداد", field:"len", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"تعداد درامد ثابت", field:"lenTarget", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"ارزش", field:"VolumeInPrice", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"ارزش درامد ثابت", field:"VolumeInPriceTarget", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                        {title:"بروزرسانی", field:"dateInt", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                    ],
                })
            }
        
        })
    }

    useEffect(getDf,[])

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">مشتریان بالقوه</h2>

            </div>
            {
                loading?<MiniLoader />:null
            }
            <div id="data-table"></div>


        </div>
    )
}

export default Potential


import { useParams } from "react-router-dom"
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import { useEffect, useState , useContext, useRef} from "react"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import { OnRun } from "../../../config/config";
import axios from "axios";
import { AccessContext } from "../../../config/accessContext"

import { ChartComponent } from "../../../componet/ChartComponent"


const TraderActivityReport = () =>{
    const {code} = useParams()
    const [traderSelect, setTraderSelect] = useState(code)
    const [df, setDf] = useState(null)
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)
    const [traderName, setTraderName] = useState(null)


    if(df!=null && dic!=null){
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
            columns:[
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input"},
                {title:"قیمت", field:"price", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"حجم خرید", field:"volume_buy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.volume_buy)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"میانگین خرید", field:"price_buy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"حجم فروش", field:"volume_sell", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.volume_sell)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"میانگین فروش", field:"price_sell", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
            ],
        })
    }

    const getDf = ()=>{
        axios({method:'POST',url:OnRun+'/gettraderactivityreport',data:{access:access,trader:traderSelect}
        }).then(response=>{
            console.log(response)
            if(response.data.replay){
                
                setDf(response.data.df)
                setDic(response.data.dic)
            }else{
                setDf(false)
            }
        })
    }

    const codeToName = () =>{
        axios({method:'POST',url:OnRun+'/getprofiletrader',data:{access:access,code:traderSelect}
        }).then(response=>{
            if(response.data.replay){
                setTraderName(response.data.df)
            }
        })
    }

    useEffect(getDf,[])
    useEffect(codeToName,[])



    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">گزارش فعالیت معامله گر</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                {
                    traderName==null?
                    <h2 className="titlePage btntls">{code}</h2>
                    :
                    <h2 className="titlePage btntls">{traderName.fullName}</h2>
                }
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>


        </div>
    )
}


export default TraderActivityReport
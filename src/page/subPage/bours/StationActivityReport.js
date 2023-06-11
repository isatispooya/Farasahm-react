

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


const StationActivityReport = () =>{
    const {code} = useParams()
    const [stationSelect, setStationSelect] = useState(code)
    const [df, setDf] = useState(null)
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)


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
                {title:"حجم خرید", field:"تعداد خرید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic['تعداد خرید'])*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"قیمت خرید", field:"قیمت خرید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"حجم فروش", field:"تعداد فروش", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic['تعداد فروش'])*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"قیمت فروش", field:"قیمت فروش", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"حجم مانده", field:"volume_balance", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if(value>0){
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic['volume_balance'])*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }else{
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic['volume_balance'])*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }
                    },
                },
            ],
        })
    }

    const getDf = ()=>{
        axios({method:'POST',url:OnRun+'/getstationactivityreport',data:{access:access,station:stationSelect}
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


    useEffect(getDf,[])



    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">گزارش فعالیت ایستگاه {stationSelect}</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>


        </div>
    )
}


export default StationActivityReport
import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";

const Metric = () =>{
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)

    
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
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"نوسان قیمت", field:"priceFluctuation", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value>0) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((Math.abs(value)/dic.priceFluctuation)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")                    
                        }else{
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((Math.abs(value)/dic.priceFluctuation)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }

                    },
                },
                {title:"اجماع فروشندگان", field:"consensusSaller", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value>0) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((Math.abs(value)/dic.consensusSaller)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")                            
                        }else{
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((Math.abs(value)/dic.consensusSaller)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")

                        }
                    },
                },
                {title:"ترس", field:"fear", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value>0) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((Math.abs(value)/dic.fear)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")                            
                        }else{
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((Math.abs(value)/dic.fear)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }
                    },
                },
                {title:"کف 20 روزه", field:"minimum20", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if(value>0){
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((Math.abs(value)/dic.minimum20)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }else{
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((Math.abs(value)/dic.minimum20)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }

                    },
                },
            ],
        })
    }


    const getDf = ()=>{
            axios({method:'POST',url:OnRun+'/getreportmetric',data:{access:access}
            }).then(response=>{
                console.log(response.data)
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
                <h2 className="titlePage">متریک</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>
        </div>
    )
}


export default Metric
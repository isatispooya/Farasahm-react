import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";

const Runaway = () =>{
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
                {title:"نام کامل", field:"fullname", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"ایستگاه", field:"نام کارگزار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:8,headerFilter:"input"},
                {title:"مانده", field:"سهام کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},

                {title:"حجم ", field:"allVol", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartBlue' style='width:"+((value/dic.allVol)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }

                    },
                },
                {title:"تعداد فروشندگان", field:"allCntSel", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartBlue' style='width:"+((value/dic.allCntSel)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }

                    },
                },
                {title:"حجم خارج شدگان", field:"outVol", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.outVol)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }
                    },
                },
                {title:"تعداد خارج شدگان", field:"outCnt", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.outCnt)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                        }
                    },
                },
                {title:"%حجم خارج شدگان", field:"ratOutVol", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.ratOutVol)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"%</p></div>")
                        }
                    },
                },
                {title:"%تعداد خارج شدگان", field:"ratOutCnt", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        if (value) {
                            return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.ratOutCnt)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"%</p></div>")
                        }
                    },
                },
            ],
        })
    }


    const getDf = ()=>{
            axios({method:'POST',url:OnRun+'/getnewcomerall',data:{access:access}
            }).then(response=>{
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
                <h2 className="titlePage">خارج شده</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>


        </div>
    )
}


export default Runaway
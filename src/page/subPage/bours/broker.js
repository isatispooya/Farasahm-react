import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import DatePi from "../../../componet/datepicker/DatePi"

const Broker = () =>{
    const [dateSelection, setDateSelection] = useState(null)
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)


    var rowMenu = [
        {
            label:"گزارش فعالیت",
            action:function(e, row){
                if(row.getData()['broker']){
                    window.open('/desk/brokeractivityreport/'+row.getData()['broker'])
                }else{
                    window.open('/desk/stationactivityreport/'+row.getData()['station'])
                }
            }
        },
    ]

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
            rowContextMenu: rowMenu,

            columns:[
                {title:"کارگزار", field:"broker", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                {title:"ایستگاه", field:"station", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:5,headerFilter:"input"},
                {title:"حجم خرید", field:"تعداد خرید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.cntBuy)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")

                    },
                },
                {title:"حجم فروش", field:"تعداد فروش", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.cntSel)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"قیمت خرید", field:"قیمت خرید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"قیمت فروش", field:"قیمت فروش", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
            ],
        })
    }


    const getDf = ()=>{
        if(dateSelection){
            axios({method:'POST',url:OnRun+'/getbroker',data:{access:access,date:dateSelection}
            }).then(response=>{
                if(response.data.replay){
                    setDf(response.data.df)
                    setDic(response.data.dic)
                }else{
                    setDf(false)
                }
            })
        }
    }

    useEffect(getDf,[dateSelection])

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">کارگزاری ها</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                <DatePi setDateSelection={setDateSelection} />
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>
        </div>
    )
}

export default Broker
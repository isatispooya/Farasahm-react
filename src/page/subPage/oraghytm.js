
import { useState ,useContext, useEffect} from "react";
import { exportPdf } from "../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import axios from "axios";
import { OnRun } from "../../config/config";
import { AccessContext } from "../../config/accessContext"



const OraghYTM = () =>{

    const [df, setDf] = useState([])
    const [dic, setDic] = useState([])
    const access = useContext(AccessContext)


    const getDf = () =>{
        axios.post(OnRun+'/getoraghytm',{access:access})
        .then(response=>{
            setDf(response.data.df)
            setDic(response.data.dic)
        })
    }

    useEffect(getDf,[])

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
            columns:[
                {title:"نماد", field:"نماد", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"قیمت معامله شده هر ورقه", field:"قیمت معامله شده هر ورقه", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"تاریخ آخرین روز معاملاتی", field:"تاریخ آخرین روز معاملاتی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"تاریخ سررسید", field:"تاریخ سررسید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"نوع", field:"owner", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"کوپن", field:"type", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"بازار", field:"market", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"YTM", field:"YTM", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.YTM)*60).toString()+'%'+"'></div><p>"+ (value*1).toLocaleString()+"%</p></div>")
                    },
                },
                {title:"تعداد روز های معاملاتی یک ماه اخیر", field:"count", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.count)*60).toString()+'%'+"'></div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"میانگین حجم یک ماهه", field:"mean", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.mean)*60).toString()+'%'+"'></div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"حجم آخرین روز", field:"vol", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.vol)*60).toString()+'%'+"'></div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"روز تا سررسید", field:"LastDay", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.LastDay)*60).toString()+'%'+"'></div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
            ],
        })
    }

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">بازده اوراق</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
            </div>
            <div id="data-table"></div>


        </div>
    )
}

export default OraghYTM
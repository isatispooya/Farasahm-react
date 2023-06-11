import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../config/config'
import MiniLoader from "../../componet/Loader/miniLoader"
import NoData from "../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";

const Compare = () =>{
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)


    const Ranking = (array,value)=>{
        const Rank = array.sort(function(a, b){return a - b}).reverse()
        const indx = Rank.indexOf(value)+1
        return indx
    }
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
                {title:"صندوق", field:"index", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"%یکروزه", field:"1", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d1)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['1']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")
                    },
                },
                {title:"%دوهفته", field:"14", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d14)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['14']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")
                    },
                },
                {title:"%یکماهه", field:"30", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d30)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['30']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
                {title:"%سه ماهه", field:"90", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d90)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['90']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
                {title:"%شش ماهه", field:"180", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d180)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['180']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
                {title:"%یکساله", field:"365", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d365)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['365']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
                {title:"%دوساله", field:"730", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.d730)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['730']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
                {title:"%انحراف ناو", field:"navlast", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.navlast)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['navlast']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
                {title:"%میانگین 30 روزه انحراف ناو", field:"mean30PN", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.mean30PN)*60).toString()+'%'+"'><span>"+Ranking(df.map(i=>i['mean30PN']),value)+"</span></div><p>"+ (value*1).toLocaleString()+"%</p></div>")

                    },
                },
            ],
        })
    }



    const getDf = ()=>{
        axios({method:'POST',url:OnRun+'/getcompare',data:{access:access}
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
                <h2 className="titlePage">مقایسه</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>
        </div>
    )
}


export default Compare
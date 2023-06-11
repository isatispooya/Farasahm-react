import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../config/config'
import MiniLoader from "../../componet/Loader/miniLoader"
import NoData from "../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom"

const Details = () =>{
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)
    const location = useLocation();
    const {code} = useParams()
    const [traderSelect, setTraderSelect] = useState(code)
    const [traderName, setTraderName] = useState(null)

    if(df!=null && dic!=null){
        console.log(df)
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
                {title:"تاریخ", field:"تاریخ معامله", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"خریدار", field:"fullnameBuy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"حجم ", field:"تعداد سهم", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        var classs
                        if(value>0){classs ='StocksTableChartPos'}else{classs='StocksTableChartNeg'}
                        return("<div class='StocksTableChartContiner'><div class='"+classs+"' style='width:"+((Math.abs(value)/dic.maxVol)*60).toString()+'%'+"'> </div><p>"+ (Math.abs(value)*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"قیمت", field:"قیمت هر سهم", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"فروشنده", field:"fullnameSel", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
            ],
        })
    }


    const getDf = ()=>{
            axios({method:'POST',url:OnRun+'/getdetailstrade',data:{access:access,trader:traderSelect}
            }).then(response=>{
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

    useEffect(getDf,[traderSelect])
    useEffect(codeToName,[])


    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">جزئیات مشتری</h2>
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


export default Details
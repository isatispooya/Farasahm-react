import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../config/config'
import MiniLoader from "../../componet/Loader/miniLoader"
import NoData from "../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs";
import DatePi from "../../componet/datepicker/DatePi"
import ProfileTrader from "../../componet/ProfileTrader"

const Stockman = () =>{
    const [dateSelection, setDateSelection] = useState(null)
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)
    const [dataProfile, setDataProfile] = useState(null)

    var rowMenu = [
        {
            label:"گزیده",
            action:function(e, row){
                window.open('/desk/excerpttrader/'+row.getData()['کد'])
            }
        },
        {
            label:"اطلاعات فردی",
            action:function(e, row){
                setDataProfile(row.getData()['کد سهامداری'])
            }
        },
        {
            label:"نمودار مانده",
            action:function(e, row){
                window.open('/desk/balancetrader/'+row.getData()['کد سهامداری'])
            }
        },
        {
            label:"جزئیات معاملات",
            action:function(e, row){
                window.open('/desk/details/'+row.getData()['کد سهامداری'])
            }
        },
        {
            label:"گزارش فعالیت",
            action:function(e, row){
                window.open('/desk/traderactivityreport/'+row.getData()['کد'])
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
                {title:"کد", field:"کد سهامداری", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input"},
                {title:"نام", field:"fullName", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"تاریخ تولد", field:"تاریخ تولد", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input"},
                {title:"محل صدور", field:"محل صدور", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input"},
                {title:"نام پدر", field:"نام پدر", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                {title:"کد ملی", field:"کد ملی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                {title:"سهام", field:"سهام کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",topCalc:"sum",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.all)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"درصد", field:"rate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    topCalcFormatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"%</p>")
                    },
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"%</p>")
                    },
                },
                {title:"اخرین کارگزاری خرید", field:"اخرین کارگزاری خرید", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                {title:"اخرین کارگزاری فروش", field:"اخرین کارگزاری فروش", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},

            ],
        })
    }


    const getDf = ()=>{
        if(dateSelection){
            setDf(null)
            axios({method:'POST',url:OnRun+'/getstockman',data:{access:access,date:dateSelection}
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
            <ProfileTrader access={access} dataProfile={dataProfile} setDataProfile={setDataProfile}/>

            <div className="tls">
                <h2 className="titlePage">سهامداران</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                <DatePi setDateSelection={setDateSelection} />
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>


        </div>
    )
}


export default Stockman
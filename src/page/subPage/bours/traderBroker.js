import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import DatePiBroker from "../../../componet/datepicker/DatePiBroker"
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables'
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv } from "react-icons/bs"
import ProfileTrader from "../../../componet/ProfileTrader"

const TraderBroker = () =>{
    const [dateSelection, setDateSelection] = useState(null)
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)
    const [dataProfile, setDataProfile] = useState(null)


    var rowMenu = [
        {
            label:"گزیده",
            action:function(e, row){
                console.log(row.getData())
                window.open('/desk/excerpttrader/'+row.getData()['کد'])
            }
        },
        {
            label:"اطلاعات فردی",
            action:function(e, row){
                setDataProfile(row.getData()['کد'])
            }
        },
        {
            label:"نمودار مانده",
            action:function(e, row){
                window.open('/desk/balancetrader/'+row.getData()['کد'])
            }
        },
        {
            label:"جزئیات معاملات",
            action:function(e, row){
                window.open('/desk/details/'+row.getData()['کد'])
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
                {title:"ایستگاه", field:"BranchTitle", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input"},
                {title:"TradeCode", visible:false, field:"TradeCode", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"نام", field:"نام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"حجم خرید", field:"Volume_Buy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.Volume_Buy)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"حجم فروش", field:"Volume_Sell", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartNeg' style='width:"+((value/dic.Volume_Sell)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")

                    },
                },
                {title:"میانگین خرید", field:"avgBuy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"میانگین فروش", field:"avgSell", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"</p>")
                    },
                },
                {title:"ایستگاه", field:"نام کارگزار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"مانده", field:"سهام کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:2,headerFilter:"input",
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
            axios({method:'POST',url:OnRun+'/desk/broker/gettraders',data:{access:access,date:dateSelection}
            }).then(response=>{
                if(response.data.replay){
                    console.log(response.data.df)
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
                <h2 className="titlePage">معامله گران</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                <DatePiBroker setDateSelection={setDateSelection} />
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            <div id="data-table"></div>
        </div>
    )
}

export default TraderBroker
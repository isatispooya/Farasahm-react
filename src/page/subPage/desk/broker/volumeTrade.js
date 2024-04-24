import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../../config/accessContext";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import { OnRun } from "../../../../config/config";
import { IoReloadSharp } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import DateFromTo from "../../../../componet/datepicker/DateFromTo";
import LoaderCircle from "../../../../componet/Loader/LoadingCircle";
import InfoPopUp from "../../../../componet/popup/info";

const VolumeTrade = () =>{
    const access = useContext(AccessContext)
    const [loading, setLoading] = useState(false)
    const [DateSelection, setDateSelection] = useState(null)
    const [infoData, setInfoData] = useState({enable:false,title:'راهنمای صفحه',row:[
        {title:'ستون انحراف',content:'این ستون مقدار اختلاف هر روز با میانگین از ابتدای سال 1402 میباشد'},
        {title:'ردیف میانگین',content:'این ردیف میانگین هر ستون برای بازه انتخاب شده است'}
    ]})

    const getdf = () =>{

        setLoading(true)
        axios.post(OnRun+'/desk/broker/volumetrade',{access:access, date:DateSelection})
        .then(response=>{
            setLoading(false)
            if (response.data.replay) {
                toast.success('گزارش بروز شد',{position: toast.POSITION.BOTTOM_RIGHT})
                var table = new Tabulator("#data-table", {
                    data:response.data.df,
                    layout:"fitColumns",
                    responsiveLayout:true,
                    columnHeaderSortMulti:true,
                    pagination:"local",
                    paginationSize:1000,
                    paginationSizeSelector:[10, 20, 50, 100, 200,500,1000],
                    movableColumns:true,
                    layoutColumnsOnNewData:false,
                    textDirection:"rtl",
                    autoResize:false,
                    dataTree:true,
                    dataTreeStartExpanded:false,
                    columns:[
                        {title:"تاریخ",headerTooltip:'تاریخ', field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input",topCalc: function (values, data, calcParams) {return "میانگین بازه انتخابی";
                        }},
                        {
                            title:'ایساتیس پویا',
                            columns:[
                                {title:"سهام کارگزاری",headerTooltip:'ارزش معاملات سهام در کارگزاری', field:"سهام کارگزاری", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات سهام در کارگزاری";
                                    },
                                },
                                {title:"صندوق کارگزاری",headerTooltip:'ارزش معاملات صندوق ها در کارگزاری', field:"صندوق کارگزاری", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات صندوق ها در کارگزاری";
                                    },
                                },
                                {title:"اوراق کارگزاری",headerTooltip:'ارزش معاملات اوراق در کارگزاری', field:"اوراق کارگزاری", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات اوراق در کارگزاری";
                                    },
                                },
                                {title:"کل کارگزاری",headerTooltip:'ارزش معاملات کل در کارگزاری', field:"کل کارگزاری", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات کل در کارگزاری";
                                    },
                                },
                            ]
                        },

                        {
                            title:'بازار',
                            columns:[
                                {title:"سهام بازار",headerTooltip:'ارزش معاملات سهام در کل بازار', field:"سهام بازار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات سهام در کل بازار";
                                    },
                                },
                                {title:"صندوق بازار",headerTooltip:'ارزش معاملات صندوق ها در کل بازار', field:"صندوق بازار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات صندوق ها در کل بازار";
                                    },
                                },
                                {title:"اوراق بازار",headerTooltip:'ارزش معاملات اوراق در کل بازار', field:"اوراق بازار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات اوراق در کل بازار";
                                    },
                                },
                                {title:"کل بازار",headerTooltip:'ارزش معاملات کل بازار', field:"کل بازار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"M </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " M";
                                    },
                                    tooltip: function (cell) {
                                        return "ارزش معاملات کل بازار";
                                    },
                                }
                            ]
                        },

                        {
                            title:'سهم از بازار',
                            columns:[
                                {
                                    title:'سهام',
                                    columns:[
                                        {title:"مقدار",headerTooltip:'مقدار سهم از بازار کارگزاری در سهام', field:"نسبت سهام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            },
                                            tooltip: function (cell) {
                                                return "مقدار سهم از بازار کارگزاری در سهام";
                                            },
                                        },
                                        {title:"انحراف از میانگین ابتدای سال",headerTooltip:'اختلاف سهم از بازار کار گزاری در سهام هر روز با میانگین سال جاری', field:"نسبت سهام انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت سهام انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت سهام انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                            tooltip: function (cell) {
                                                return "اختلاف سهم از بازار کار گزاری در سهام هر روز با میانگین سال جاری";
                                            },
                                        }
                                    ]
                                },
                                {
                                    title:'صندوق',
                                    columns:[
                                        {title:"مقدار",headerTooltip:'مقدار سهم از بازار کارگزاری در صندوق ها', field:"نسبت صندوق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            },
                                            tooltip: function (cell) {
                                                return "مقدار سهم از بازار کارگزاری در صندوق ها";
                                            },
                                        },
                                        {title:"انحراف از میانگین ابتدای سال",headerTooltip:'اختلاف سهم از بازار کار گزاری در صندوق ها هر روز با میانگین سال جاری', field:"نسبت صندوق انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت صندوق انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت صندوق انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                            tooltip: function (cell) {
                                                return "اختلاف سهم از بازار کار گزاری در صندوق ها هر روز با میانگین سال جاری";
                                            },
                                        }
                                    ]
                                },
                                {
                                    title:'اوراق',
                                    columns:[
                                        {title:"مقدار",headerTooltip:'مقدار سهم از بازار کارگزاری در اوراق', field:"نسبت اوراق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            },
                                            tooltip: function (cell) {
                                                return "مقدار سهم از بازار کارگزاری در اوراق";
                                            },
                                        },
                                        {title:"انحراف از میانگین ابتدای سال",headerTooltip:'اختلاف سهم از بازار کار گزاری در اوراق هر روز با میانگین سال جاری', field:"نسبت اوراق انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت اوراق انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت اوراق انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                            tooltip: function (cell) {
                                                return "اختلاف سهم از بازار کار گزاری در اوراق هر روز با میانگین سال جاری";
                                            },
                                        }
                                    ]
                                },
                                {
                                    title:'کل',
                                    columns:[
                                        {title:"مقدار", headerTooltip:'مقدار کل سهم از بازار کارگزاری در سهام', field:"نسبت کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            },
                                            tooltip: function (cell) {
                                                return "مقدار کل سهم از بازار کارگزاری در سهام";
                                            },
                                        },
                                        {title:"انحراف از میانگین ابتدای سال",headerTooltip:'اختلاف کل سهم از بازار کار گزاری هر روز با میانگین سال جاری', field:"نسبت کل انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت کل انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت کل انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                            tooltip: function (cell) {
                                                return "اختلاف کل سهم از بازار کار گزاری هر روز با میانگین سال جاری";
                                            },
                                        }
                                    ]
                                },
                            ]
                        },
                    ],
                })
            }else{
                toast.warning(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT})
            }
        })
    }


    return(
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <InfoPopUp data={infoData} setData={setInfoData}/>
            <div className="tls">
                <h2 className="titlePage">حجم معاملات</h2>
                <div className="btntls">
                    <p onClick={getdf} className=""><span><IoReloadSharp/></span>بارگزاری</p>
                    <p onClick={()=>setInfoData({...infoData,enable:!infoData.enable})} className=""><span><BsInfoCircle/></span>راهنمایی</p>
                    <DateFromTo setDateSelection={setDateSelection} />
                </div>
            </div>
            <LoaderCircle loading={loading}/>
            <div id="data-table"></div>
        </div>
    )
}


export default VolumeTrade
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
                        {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input",topCalc: function (values, data, calcParams) {return "میانگین بازه انتخابی";
                        }},
                        {
                            title:'ایساتیس پویا',
                            columns:[
                                {title:"سهام", field:"سهام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                                {title:"صندوق", field:"صندوق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                                {title:"اوراق", field:"اوراق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                                {title:"کل", field:"کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                            ]
                        },

                        {
                            title:'کل بازار',
                            columns:[
                                {title:"سهام", field:"کل سهام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                                {title:"صندوق", field:"کل صندوق ها", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                                {title:"اوراق", field:"کل اوراق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                },
                                {title:"کل", field:"کل بازار", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,topCalc:"avg",
                                    formatter:function(cell, formatterParams){
                                        var value = cell.getValue();
                                        return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"B </p></div>")
                                    },
                                    topCalcFormatter:function (cell, formatterParams){
                                        var value = cell.getValue();
                                        return (value * 1).toLocaleString() + " B";
                                    }
                                }
                            ]
                        },

                        {
                            title:'سهم بازار',
                            columns:[
                                {
                                    title:'سهام',
                                    columns:[
                                        {title:"مقدار", field:"نسبت سهام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            }
                                        },
                                        {title:"انحراف از میانگین ابتدای سال", field:"نسبت سهام انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت سهام انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت سهام انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                        }
                                    ]
                                },
                                {
                                    title:'صندوق',
                                    columns:[
                                        {title:"مقدار", field:"نسبت صندوق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            }
                                        },
                                        {title:"انحراف از میانگین ابتدای سال", field:"نسبت صندوق انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت صندوق انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت صندوق انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                        }
                                    ]
                                },
                                {
                                    title:'اوراق',
                                    columns:[
                                        {title:"مقدار", field:"نسبت اوراق", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            }
                                        },
                                        {title:"انحراف از میانگین ابتدای سال", field:"نسبت اوراق انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت اوراق انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت اوراق انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
                                            },
                                        }
                                    ]
                                },
                                {
                                    title:'کل',
                                    columns:[
                                        {title:"مقدار", field:"نسبت کل", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                return("<div class='StocksTableChartContiner'><p>"+ (value*1).toLocaleString()+"% </p></div>")
                                            },
                                            topCalcFormatter:function (cell, formatterParams){
                                                var value = cell.getValue();
                                                return (value * 1).toLocaleString() + " %";
                                            }
                                        },
                                        {title:"انحراف از میانگین ابتدای سال", field:"نسبت کل انحراف", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,topCalc:"avg",
                                            formatter:function(cell, formatterParams){
                                                var value = cell.getValue();
                                                if (value>0) {
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:"+((value/response.data.dic['نسبت کل انحراف'])*100).toString()+'%'+"'></div></div> <div class='barContiner'><div class='barNeg' style='width:0%'></div></div></div>")
                                                }else{
                                                    value = value*-1
                                                    return("<div class='TableChartBarContiner'><div class='barValue'>"+((value)).toLocaleString()+"</div><div class='barContiner'><div class='barPos' style='width:0%' ></div></div> <div class='barContiner'><div class='barNeg' style='width:"+((value/response.data.dic['نسبت کل انحراف'])*100).toString()+'%'+"'></div></div></div>")
                                                }
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
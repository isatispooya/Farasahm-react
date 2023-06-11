import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv , BsPlusCircle} from "react-icons/bs";

const Shareholders = () =>{
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const access = useContext(AccessContext)
    const [popUp, setPopUp] = useState(false)
    const [dataTrader, setDataTrader] = useState({'نام و نام خانوادگی':'','کد ملی':'','نام پدر':'','شماره تماس':'','شماره حساب':'','صادره':'','بانک':'','کدبورسی':''})


    var rowMenu = [
        {
            label:"ویرایش",
            action:function(e, row){
                setPopUp(true)
                setDataTrader(row.getData())
            }
        },
        {
            label:"حذف",
            action:function(e, row){
                axios({method:'POST',url:OnRun+'/delshareholders',data:{access:access,transaction:row.getData()}
                }).then(response=>{
                    if (response.data.replay) {
                        alert('حذف شد')
                    }else{
                        alert(response.data.msg)
                    }
                })
            }
        },
    ]

    const addTrader = () =>{
        if (dataTrader['نام و نام خانوادگی']=='') {alert("لطفا نام و نام خانوادگی را تکمیل کنید")
        }else if (dataTrader['کد ملی']=='') {alert("لطفا کد ملی را تکمیل کنید")
        }else if (dataTrader['شماره تماس']=='') {alert("لطفا شماره تماس را تکمیل کنید")
        }else{
            axios({method:'POST',url:OnRun+'/addtradernobourse',data:{access:access,dataTrader:dataTrader}
            }).then(response=>{
                if(response.data.replay){
                    alert('افزوده شد')
                    setPopUp(false)
                }else{
                    alert(response.data.msg)
                }
            })
        }
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
            rowContextMenu: rowMenu,

            columns:[
                {title:"_id",visible:false ,field:"_id", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"نام و نام خانوادگی", field:"نام و نام خانوادگی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"کد ملی", field:"کد ملی", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"نام پدر", field:"نام پدر", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input"},
                {title:"شماره تماس", field:"شماره تماس", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"سهام", field:"تعداد سهام", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.amount)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")

                    },
                },
                {title:"ردصد", field:"rate", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+ (value*1).toLocaleString()+"%</p>")

                    },
                },
            ],
        })
    }

    const getDf = ()=>{
        axios({method:'POST',url:OnRun+'/getshareholders',data:{access:access}
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
                <h2 className="titlePage">سهامداران</h2>
                {
                    dic==null?null:
                    <h2 className="titlePage">{dic.lastUpdate}</h2>
                }
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>

                <p className="btntls" onClick={()=>{
                    setPopUp(!popUp)
                    setDataTrader({'نام و نام خانوادگی':'','کد ملی':'','نام پدر':'','شماره تماس':'','شماره حساب':'','صادره':'','بانک':'','کدبورسی':''})
                    }}><span><BsPlusCircle/></span>افزودن</p>

            </div>
            {
                popUp?
                <div className="PopUpTransactions">
                    <div className="trd">
                        <fieldset>
                            <label>*نام و نام خانوادگی</label>
                            <input value={dataTrader['نام و نام خانوادگی']} onChange={(e)=>setDataTrader({...dataTrader,'نام و نام خانوادگی':e.target.value})}></input>
                        </fieldset>
                        <fieldset>
                            <label>*کد ملی</label>
                            <input type="number" value={dataTrader['کد ملی']} onChange={(e)=>setDataTrader({...dataTrader,'کد ملی':e.target.value})}></input>
                        </fieldset>
                        <fieldset>
                            <label>نام پدر</label>
                            <input value={dataTrader['نام پدر']} onChange={(e)=>setDataTrader({...dataTrader,'نام پدر':e.target.value})}></input>
                        </fieldset>
                        <fieldset>
                            <label>صادره</label>
                            <input value={dataTrader['صادره']} onChange={(e)=>setDataTrader({...dataTrader,'صادره':e.target.value})}></input>
                        </fieldset>
                    </div>
                    <div className="trd">
                        <fieldset>
                            <label>*شماره تماس</label>
                            <input type="number" value={dataTrader['شماره تماس']} onChange={(e)=>setDataTrader({...dataTrader,'شماره تماس':e.target.value})}></input>
                        </fieldset>
                        <fieldset>
                            <label>شماره حساب</label>
                            <input value={dataTrader['شماره حساب']} onChange={(e)=>setDataTrader({...dataTrader,'شماره حساب':e.target.value})}></input>
                        </fieldset>
                        <fieldset>
                            <label>بانک</label>
                            <input value={dataTrader['بانک']} onChange={(e)=>setDataTrader({...dataTrader,'بانک':e.target.value})} list="banks"></input>
                            <datalist id="banks">
                                <option>ملی</option>
                                <option>سپه</option>
                                <option>توسعه صادرات</option>
                                <option>صنعت و معدن</option>
                                <option>کشاورزی</option>
                                <option>مسکن</option>
                                <option>پست بانک</option>
                                <option>توسعه تعاون</option>
                                <option>اقتصادنوین</option>
                                <option>پارسیان</option>
                                <option>پاسارگاد</option>
                                <option>کارآفرین</option>
                                <option>سامان</option>
                                <option>سینا</option>
                                <option>سرمایه</option>
                                <option>شهر</option>
                                <option>دی</option>
                                <option>صادرات</option>
                                <option>ملت</option>
                                <option>تجارت</option>
                                <option>رفاه</option>
                                <option>گردشگری</option>
                                <option>ایران زمین</option>
                                <option>خاورمیانه</option>
                                <option>مشترک ایران نزوئلا</option>
                                <option>آینده</option>
                                <option>اعتباری توسعه</option>
                                <option>اعتباری ملل</option>
                                <option>اعتباری نور</option>
                                <option>اعتباری کاسپین</option>
                                <option>مهر</option>
                                <option>رسالت</option>
                            </datalist>
                        </fieldset>
                        <fieldset>
                            <label>کدبورسی</label>
                            <input value={dataTrader['کدبورسی']} onChange={(e)=>setDataTrader({...dataTrader,'کدبورسی':e.target.value})}></input>
                        </fieldset>
                    </div>
                    <div className="btn">
                        <button onClick={()=>setPopUp(false)}>لغو</button>
                        <button onClick={addTrader}>تایید</button>
                    </div>
                </div>
                :null
            }
            <div id="data-table"></div>
        </div>
    )
}


export default Shareholders
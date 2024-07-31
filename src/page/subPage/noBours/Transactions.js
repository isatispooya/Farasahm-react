import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../../config/config'
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { exportPdf } from "../../../config/exportPdf"
import { BsFiletypePdf , BsFiletypeCsv , BsPlusCircle} from "react-icons/bs";

import { BiArrowFromRight } from "react-icons/bi";
const Transactions = () =>{
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const [popUp, setPopUp] = useState(false)
    const access = useContext(AccessContext)
    const [allName, setAllName] = useState(null)
    const [balanceSell, setBalanceSell] = useState(0)
    const [balanceBuy, setBalanceBuy] = useState(0)
    const [dataTrade, setDataTrade] = useState({id:Math.round(Math.random()*100000000),sell:'',buy:'',volume:0,price:0,value:0})


        var rowMenu = [
        {
            label:"ویرایش",
            action:function(e, row){
                setPopUp(true)
                setDataTrade({...dataTrade,sell:row.getData()['sell'],id:row.getData()['id'],buy:row.getData()['buy'],volume:row.getData()['volume'],price:row.getData()['price'],value:row.getData()['value']})
            }
        },
        {
            label:"حذف",
            action:function(e, row){
                axios({method:'POST',url:OnRun+'/deltransaction',data:{access:access,transaction:row.getData()}
                }).then(response=>{
                    alert('حذف شد')
                })
            }
        },
    ]



    const getAllName = () =>{
        if(access){
            axios({method:'POST',url:OnRun+'/getallnamenobourse',data:{access:access}
            }).then(response=>{
                if(response.data.replay){
                    setAllName(response.data.df.map(i=>i['نام و نام خانوادگی']))
                }else{
                    setAllName(null)
                }
            })
        }
    }

    const handleChangesel = () =>{
        if (allName!=null) {
            if(allName.includes(dataTrade.sell)) {
                axios({method:'POST', url:OnRun+'/getpersonalnobourse',data:{access:access,name:dataTrade.sell}
                }).then(response=>{
                    if(response.data.replay){
                        setBalanceSell(response.data.personal['تعداد سهام'])
                    }
                })
            }
        }
    }

    const handleChangebuy = () =>{
        if (allName!=null) {
            if(allName.includes(dataTrade.buy)) {

                axios({method:'POST', url:OnRun+'/getpersonalnobourse',data:{access:access,name:dataTrade.buy}
                }).then(response=>{
                    if(response.data.replay){
                        setBalanceBuy(response.data.personal['تعداد سهام'])
                    }
                })


            }
        }
    }

    const handleChangePrice = (price) =>{
        if (dataTrade.volume>0) {
            setDataTrade({...dataTrade,price:price,value:dataTrade.volume * price})
        }else if(dataTrade.volume==0 && dataTrade.value>0){
            var volume = Math.round(dataTrade.value / price)
            var value = volume * price
            setDataTrade({...dataTrade,price:price,volume:volume,value:value})
        }else{
            setDataTrade({...dataTrade,price:price})
        }
    }

    const handleChangVolume = (volume) =>{
        if (dataTrade.price>0) {
            setDataTrade({...dataTrade,volume:volume,value:volume * dataTrade.price})
        }else if(dataTrade.price==0 && dataTrade.value>0){
            var price = Math.round(dataTrade.value / volume)
            var value = volume * price
            setDataTrade({...dataTrade,value:value,volume:volume,price:price})
        }else{
            setDataTrade({...dataTrade,volume:volume})
        }
    }

    const handleChangeValue = (value) =>{
        if (dataTrade.price>0) {
            setDataTrade({...dataTrade,value:value,volume:value / dataTrade.price})
        }else if(dataTrade.price==0 && dataTrade.volume>0){
            var price = Math.round(value / dataTrade.volume)
            var value = dataTrade.volume * price
            setDataTrade({...dataTrade,value:value,price:price})
        }else{
            setDataTrade({...dataTrade,value:value})
        }
    }


    const apply = () =>{
        if (!allName.includes(dataTrade.sell)) {alert('فروشنده را انتخاب کنید')
        }else if (!allName.includes(dataTrade.buy)) {alert('خریدار را انتخاب کنید')
        }else if (dataTrade.volume==0) {alert('حجم باید بیشتر از صفر باشد')
        }else if (dataTrade.volume>balanceSell) {alert('حجم نمیتواند بیشتر از مانده فروشنده باشد')
        }else{
            axios({method:'POST',url:OnRun+'/settransaction',data:{access:access,dataTrade:dataTrade}
            }).then(response=>{
                setPopUp(false)
                if (response.data.replay) {
                    alert('ثبت شد')
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
                {title:"شناسه", field:"id", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"تاریخ", field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"فروشنده", field:"sell", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"خریدار", field:"buy", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:6,headerFilter:"input"},
                {title:"حجم", field:"volume", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.vol)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"قیمت", field:"price", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.prc)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
                {title:"ارزش", field:"value", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:3,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic.val)*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")
                    },
                },
            ],
        })
    }

    useEffect(getAllName,[access])
    useEffect(handleChangesel,[dataTrade.sell])
    useEffect(handleChangebuy,[dataTrade.buy])
    const getDf = ()=>{

        axios({method:'POST',url:OnRun+'/gettransactions',data:{access:access}
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
                <h2 className="titlePage">نقل و انتقال</h2>
                <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
                <p onClick={()=>{table.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
                <p className="btntls" onClick={()=>{setPopUp(!popUp)}}><span><BsPlusCircle/></span>افزودن</p>
            </div>
            {df===null?<MiniLoader />:df===false?<NoData/>:null}
            {
                popUp?
                <div className="PopUpTransactions">
                    <div className="trd">
                        <fieldset>
                            <label>*فروشنده</label>
                            {allName==null?null:
                                <>
                                <input value={dataTrade.sell} onChange={(e)=>setDataTrade({...dataTrade,sell:e.target.value})} list="sell"></input>
                                <datalist id="sell">
                                    {
                                        allName.map(i=>{
                                            return(
                                                <option key={i} value={i}>{i}</option>
                                            )
                                        })
                                    }
                                </datalist>
                                </>
                            }
                            <span>مانده سهام: {(balanceSell).toLocaleString()}</span>

                        </fieldset>
                        <fieldset className="icon">
                            <p><BiArrowFromRight/></p>
                        </fieldset>
                        <fieldset>
                            <label>*خریدار</label>
                            {allName==null?null:
                                <>
                                <input value={dataTrade.buy} onChange={(e)=>setDataTrade({...dataTrade,buy:e.target.value})} list="buy"></input>
                                <datalist id="buy">
                                    {
                                        allName.map(i=>{
                                            return(
                                                <option key={i} value={i}>{i}</option>
                                            )
                                        })
                                    }
                                </datalist>
                                </>
                            }
                            <span>مانده سهام: {(balanceBuy).toLocaleString()}</span>

                        </fieldset>
                    </div>
                    <div className="dtl">
                        <fieldset>
                            <label>قیمت</label>
                            <input value={dataTrade.price} onChange={(e)=>handleChangePrice(e.target.value)} placeholder="قیمت"/>
                        </fieldset>
                        <fieldset>
                            <label>*حجم</label>
                            <input value={dataTrade.volume} onChange={(e)=>handleChangVolume(e.target.value)}  placeholder="تعداد"/>
                        </fieldset>
                        <fieldset>
                            <label>ارزش</label>
                            <input value={dataTrade.value} onChange={(e)=>handleChangeValue(e.target.value)}  placeholder="ارزش"/>
                        </fieldset>
                    </div>
                    <div className="btn">
                        <button onClick={()=>setPopUp(false)}>لغو</button>
                        <button onClick={apply}>تایید</button>
                    </div>
                </div>
                :null
            }
            <div id="data-table"></div>
        </div>
    )
}


export default Transactions
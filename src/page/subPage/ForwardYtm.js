
import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../config/config'

import {TabulatorFull as Tabulator} from 'tabulator-tables';


const ForwardYtm = () =>{
    const [df, setDf] = useState(null)
    const [dic, setDic] = useState(null)
    const [input, setInput] = useState({target:22,befor:50,after:50})
    const access = useContext(AccessContext)


    const handleBefor = (e) =>{
        var bef = e.target.value
        var aft = input.after
        if (bef<=100 && bef>=0) {
            setInput({...input,befor:bef,after:100-bef})
        }
    }

    const handleAfter = (e) =>{
        var aft = e.target.value
        if (aft<=100 && aft>=0) {
            setInput({...input,befor:100-aft,after:aft})
        }
    }


    const getDf = () =>{
        axios.post(OnRun+'/getpriceforward',{access:access, target:input.target, befor:input.befor, after:input.after})
        .then(response=>{
            setDf(response.data.df)
            console.log(response.data.df)
        })
    }



    
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
                {title:"تاریخ", field:"ja_date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"روز", field:"week", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"وضعیت", field:"workday", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                formatter:function(cell, formatterParams){
                    var value = cell.getValue();
                    if (value=='تعطیل') {
                        return("<p class='holiday'>"+value+"</p>")
                    }else{
                        return("<p class='nonHoliday'>"+value+"</p>")
                    }
                    
                },
                },
                {title:"قیمت", field:"fut_price", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+(value).toLocaleString()+"</p>")
                    },
                },
                {title:"تغییر", field:"Chng_price", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input",
                    formatter:function(cell, formatterParams){
                        var value = cell.getValue();
                        return("<p>"+(value).toLocaleString()+" %</p>")
                    },
                },
            ],
        })
    }



    useEffect(getDf,[input.after,input.befor,input.target])

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">بازده آتی</h2>
                <div className="btntls">
                    <div className="inp-fld">
                        <p>%</p>
                        <input max={100} min={0} value={input.target} onChange={(e)=>setInput({...input,target:e.target.value})} type="number" placeholder="نرخ هدف"></input>
                        <p>هدف</p>
                    </div>
                    <div className="inp-fld">
                        <p>%</p>
                        <input max={100} min={0} value={input.befor} onChange={(e)=>handleBefor(e)} type="number" placeholder="نرخ هدف"></input>
                        <p>قبل تعطیلات</p>
                    </div>
                    <div className="inp-fld">
                        <p>%</p>
                        <input max={100} min={0} value={input.after} onChange={(e)=>handleAfter(e)} type="number" placeholder="نرخ هدف"></input>
                        <p>بعد تعطیلات</p>
                    </div>
                </div>
            </div>
            <div id="data-table"></div>

        </div>
    )
}

export default ForwardYtm
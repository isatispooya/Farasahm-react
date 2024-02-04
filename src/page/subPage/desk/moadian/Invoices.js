import MiniLoader from "../../../../componet/Loader/miniLoader";
import { useContext, useEffect, useRef, useState } from "react";
import { AccessContext } from "../../../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../../../config/config";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const Invoices = () =>{
    const [df, setDf] = useState(null)
    const access = useContext(AccessContext)
    const tableRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const getDf = () =>{
        setIsLoading(true)
        axios.post(OnRun+'/moadian/getinvoice',{access:access})
        .then(response=>{
            if (response.data.reply) {
                setDf(response.data.df)
        // console.log(response.data.df)
            }
        })
        .finally(() => {
            setIsLoading(false);
          });
    }
    useEffect(getDf, []);

    useEffect(() => {
        if (df != null) {
            tableRef.current = new Tabulator("#data-table", {
            data: df,
            layout: "fitColumns",
            responsiveLayout: true,
            columnHeaderSortMulti: true,
            pagination: "local",
            paginationSize: 50,
            paginationSizeSelector: [10, 20, 50, 100, 200, 500],
            movableColumns: true,
            layoutColumnsOnNewData: false,
            textDirection: "rtl",
            autoResize: false,
            dataTree: true,
            dataTreeStartExpanded: true,
            columns:[
                {title:"عنوان",  field:"title", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"نوع فروشنده",  field:"buyerType", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"تاریخ",  field:"date", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"الگو فروش",  field:"pattern", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"قیمت",  field:"price", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"ارزش افزوده",  field:"taxAdded", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"نوع صورتحساب",  field:"type", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"قیمت واحد",  field:"fee", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"شناسه کالا",  field:"sstid", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},
                {title:"شرح کالا",  field:"sstt", hozAlign:'center',headerHozAlign:'center',resizable:true, widthGrow:4,headerFilter:"input"},

            ],
          });
        }
      }, [df]);

    return(
        <div className="subPage tablePg">
            
            <div className="tls">
                <h2 className="titlePage">لیست صورت حساب ها</h2>
            </div>
            {df===null?<MiniLoader />:null}
            <div id="data-table"></div>
        </div>
    )
}

export default Invoices;
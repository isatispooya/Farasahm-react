import { useContext, useEffect, useRef, useState } from "react";
import LoaderCircle from "../../../componet/Loader/LoadingCircle";
import { exportPdf } from "../../../config/exportPdf";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { BsCashCoin, BsFiletypePdf, BsFiletypeCsv} from "react-icons/bs";
import { OnRun } from "../../../config/config";
import axios from "axios";
import { AccessContext } from "../../../config/accessContext";

const CustomerRemain = () => {
  const [loading, setLoading] = useState(true);
  const access = useContext(AccessContext)
  const [df, setDf] = useState(null)
  const tableRef = useRef(null);

  const get = () =>{
    setLoading(true);
    axios.post(OnRun+'/customerremain',{access:access})
    .then((Response)=>{
      if(Response.data.reply){
        setDf(Response.data.df)
      }else{
        setDf(false)
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }
  // console.log(df)

  useEffect(get,[])


  useEffect(() => {
    if (df != null ) {
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
        dataTreeStartExpanded: false,
        columns: [
          {
            title: " تاریخ به روزرسانی",
            field: "Datetime",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
          },
          {
            title: "کدمعاملاتی",
            field: "TradeCode",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
          },
          {
            title: "مانده تعدیلی",
            field: "AdjustedRemain",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "مانده مسدود",
            field: "BlockedRemain",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "اعتبار",
            field: "Credit",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          {
            title: "قابل معامله",
            field: "CurrentRemain",
            hozAlign: "center",
            headerHozAlign: "center",
            resizable: true,
            widthGrow: 2,
            headerFilter: "input",
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return "<p>" + (value * 1).toLocaleString() + "</p>";
            },
          },
          
        ],
      });
    }
  }, [df]);

  return (
    <div className="subPage tablePg">

      <LoaderCircle loading={loading} />
      <div className="tls">
        <h2 className="titlePage">ورود پول</h2>
        <div className="btntls">
        <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
        <p onClick={()=>{tableRef.current.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
        </div>
      </div>
      <div id="data-table"></div>

    </div>
  );
};

export default CustomerRemain;

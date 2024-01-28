import { useState, useContext, useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import axios from "axios";
import { OnRun } from "../../../config/config";
import { AccessContext } from "../../../config/accessContext";
import MiniLoader from "../../../componet/Loader/miniLoader";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import { exportPdf } from "../../../config/exportPdf";

const Potential = () => {
  const access = useContext(AccessContext);
  const [loading, setLoadnig] = useState(true);
  const tableRef = useRef(null);
  const getDf = () => {
    axios
      .post(OnRun + "/getpotentialcoustomer", { access: access })
      .then((response) => {
        setLoadnig(false);
        if (response.data.reply) {
          tableRef.current = new Tabulator("#data-table", {
            data: response.data.df,
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
                title: "مشتری",
                field: "CustomerTitle",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
              },
              {
                title: "نام سهم",
                field: "MarketInstrumentTitle",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
              },
              {
                title: "نماد",
                field: "Symbol",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
              },
              {
                title: "حجم",
                field: "Volume",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
              },
              {
                title: "تعداد",
                field: "lenTarget",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
              },
              {
                title: "ارزش",
                field: "VolumeInPrice",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
                formatter: function (cell, formatterParams) {
                  var value = cell.getValue();
                  return "<p>" + (value * 1).toLocaleString() + "</p>";
                },
              },
              {
                title: "بروزرسانی",
                field: "dateInt",
                hozAlign: "center",
                headerHozAlign: "center",
                resizable: true,
                widthGrow: 4,
                headerFilter: "input",
              },
            ],
          });
        }
      });
  };

  useEffect(getDf, []);

  return (
    <div className="subPage tablePg">
      <div className="tls">
        <h2 className="titlePage">مشتریان بالقوه</h2>
        <p onClick={exportPdf}><BsFiletypePdf/><span>خروجی PDF</span></p>
        <p onClick={()=>{tableRef.current.download("csv", "data.csv")}}><BsFiletypeCsv/><span>خروجی CSV</span></p>
      </div>
      {loading ? <MiniLoader /> : null}
      <div id="data-table"></div>
    </div>
  );
};

export default Potential;

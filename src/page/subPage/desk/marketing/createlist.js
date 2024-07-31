import { useState } from "react";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import { BsArrowRepeat, BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import NoData from "../../../../componet/Loader/NoData";
import { exportPdf } from "../../../../config/exportPdf";
import { TabulatorFull as Tabulator } from "tabulator-tables";

import { MdOutlineCreateNewFolder } from "react-icons/md";


const CreateList = () => {
  const [df, setDf] = useState(null);

  if (df != null) {
    var table = new Tabulator("#data-table", {
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
      columns: [],
    });
  }

  return (
    <div className="subPage tablePg">
      <div className="tls">
        <h2 className="titlePage">لیست</h2>
        <p onClick={exportPdf}>
          <BsFiletypePdf />
          <span>خروجی PDF</span>
        </p>
        <p
          onClick={() => {
            table.download("csv", "data.csv");
          }}
        >
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>
        <div className="btntls">
          <button className="inp-fld">
            ایجاد
            <MdOutlineCreateNewFolder />
            </button>
        </div>
      </div>

      {/* {df===null?<MiniLoader />:df===false?<NoData/>:null} */}
      <div id="data-table"></div>
    </div>
  );
};

export default CreateList;

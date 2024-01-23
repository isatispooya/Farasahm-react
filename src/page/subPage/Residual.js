import { useContext, useEffect, useState } from "react";
import { AccessContext } from "../../config/accessContext";
import ProfileTrader from "../../componet/ProfileTrader";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import { exportPdf } from "../../config/exportPdf";
import axios from "axios";
import { OnRun } from "../../config/config";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import NoData from "../../componet/Loader/NoData";
import LoaderCircle from "../../componet/Loader/LoadingCircle";

const Residual = () => {
  const access = useContext(AccessContext);
  const [dataProfile, setDataProfile] = useState(null);
  const [df, setDf] = useState(null);
  const [input, setInput] = useState(100);
  const [selectedType, setSelectedType] = useState("buy");
  const [loading, setLoading] = useState(false)

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
      dataTree:true,
      dataTreeStartExpanded: false,
      columns: [
        {
          title: "دسته آخرین معامله",
          field: "lastTradeDay",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "سهام کل",
          field: "سهام کل",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
          formatter:function(cell, formatterParams){
            var value = cell.getValue();
            return("<p>"+ (value*1).toLocaleString()+"</p>")
        },
        },
        {
          title: "کد",
          field: "index",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 3,
          headerFilter: "input",
        },
        {
          title: "نام",
          field: "نام",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 3,
          headerFilter: "input",
        },
        {
          title: "نام خانوادگی",
          field: "نام خانوادگی "
          ,
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 3,
          headerFilter: "input",
        },
        {
          title: "کدملی",
          field: "کد ملی",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },

        {
          title: "تاریخ تولد",
          field: "تاریخ تولد",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "محل صدور",
          field: "محل صدور",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },

        {
          title: "تعداد",
          field: "lenTarget",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "تاریخ آخرین معالمه",
          field: "date",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
      ],
    });
  }

  const getDf = () => {
    setLoading(true)
    axios.post(OnRun + "/getresidual", {access: access,target: input, type: selectedType })
      .then((response) => {
        setLoading(false)
        if (response.data.reply) {
          setDf(response.data.df);
        } else {
          setDf(false);
        }
        console.log(response.data.df);
      });
  };
  useEffect(getDf, [input, selectedType]);

  return (
    <div className="subPage tablePg">
      <ProfileTrader
        access={access}
        dataProfile={dataProfile}
        setDataProfile={setDataProfile}
      />
      <LoaderCircle loading={loading}/>
      <div className="tls">
        <h2 className="titlePage">سهامداران</h2>
        <p onClick={exportPdf}>
          <BsFiletypePdf />
          <span>خروجی PDF</span>
        </p>
        <p onClick={()=>{table.download("csv", "data.csv")}}>
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>
        <div className="btntls">
          <div className="inp-fld">
            <span>روز</span>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <span>تعداد</span>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="buy">خرید</option>
            <option value="sell">فروش</option>
            <option value="all">همه</option>
          </select>
          <span>نوع</span>
        </div>
      </div>
      {df === false ? <NoData /> : null}
      <div id="data-table"></div>
    </div>
  );
};
export default Residual;
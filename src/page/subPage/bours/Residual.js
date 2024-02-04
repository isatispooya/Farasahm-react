import { useContext, useEffect, useRef, useState } from "react";
import { AccessContext } from "../../../config/accessContext";
import ProfileTrader from "../../../componet/ProfileTrader";
import { BsArrowRepeat, BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import { exportPdf } from "../../../config/exportPdf";
import axios from "axios";
import { OnRun } from "../../../config/config";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import NoData from "../../../componet/Loader/NoData";
import MiniLoader from "../../../componet/Loader/miniLoader";

const Residual = () => {
  const access = useContext(AccessContext);
  const [dataProfile, setDataProfile] = useState(null);
  const [df, setDf] = useState(null);
  const [dic, setDic] = useState(null);
  const [input, setInput] = useState(100);
  const [noise, setNoise] = useState(10);
  const [selectedType, setSelectedType] = useState("buy");
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if (df != null && dic!=null) {
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
            widthGrow: 4,
            headerFilter: "input",
            topCalc: "sum",
            formatter:function(cell, formatterParams){
              var value = cell.getValue();
              return("<div class='StocksTableChartContiner'><div class='StocksTableChartPos' style='width:"+((value/dic['سهام کل'])*60).toString()+'%'+"'> </div><p>"+ (value*1).toLocaleString()+"</p></div>")

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
            field: "نام خانوادگی ",
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
            topCalc: "sum",
          },
          {
            title: "درصد",
            field: "rate",
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
  }, [df]);
  const getDf = () => {
    setIsLoading(true);
    axios
      .post(OnRun + "/getresidual", {
        access: access,
        target: input,
        noise: noise,
        type: selectedType,
      })
      .then((response) => {
        if (response.data.reply) {
          setDf(response.data.df);
          setDic(response.data.dic)
          
        } else {
          setDf(false);
        }
        // console.log(response.data.df);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRequestData = () => {
    getDf();
  };
  return (
    <div className="subPage tablePg">
      <ProfileTrader
        access={access}
        dataProfile={dataProfile}
        setDataProfile={setDataProfile}
      />
      <div className="tls">
        <h2 className="titlePage"> سهامداران رسوبی</h2>
        <p onClick={exportPdf}>
          <BsFiletypePdf />
          <span>خروجی PDF</span>
        </p>
        <p
          onClick={() => {
            tableRef.current.download("csv", "data.csv");
          }}
        >
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>
        <div className="btntls">
          <p onClick={handleRequestData}>
            درخواست
            <BsArrowRepeat />
          </p>
          <div className="inp-fld">
          
          <p>روز</p>
            <input
              type="number"
              min={0}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <p>تعداد</p>

            <input type="number" min={0} max={100} value={noise} onChange={(e)=>setNoise(e.target.value)}/>
            <p>حذف نویز</p>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="buy">خرید</option>
              <option value="sell">فروش</option>
              <option value="all">همه</option>
            </select>
            <p>نوع</p>
            
          </div>
        </div>
      </div>
      {df === null ? <NoData /> : <div id="data-table"></div>}
      {isLoading && <MiniLoader />}
    </div>
  );
};
export default Residual;

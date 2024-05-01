import { useContext, useEffect, useState } from "react";
import NoData from "../../../../componet/Loader/NoData";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import axios from "axios";
import { OnRun } from "../../../../config/config";
import { AccessContext } from "../../../../config/accessContext";
import { TabulatorFull as Tabulator } from "tabulator-tables";

const ReportAnalyze = () => {
  const access = useContext(AccessContext);
  const [data, setData] = useState(null);

  if (data !== null) {
    var table = new Tabulator("#data-table", {
      data: data,
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
      selectable: true,

      columns: [
        {
          title: "عنوان",
          field: "title",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "وضعیت",
          field: "send",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "تاریخ و ساعت",
          field: "date",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "تعداد ارسالی",
          field: "count_send",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "تعداد دریافتی",
          field: "count_deliver",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
        {
          title: "تعداد",
          field: "count",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 2,
          headerFilter: "input",
        },
      ],
    });
  }
  const getTable = () => {
    axios
      .post(OnRun + "/smsgroupreport",{ access: access })
      .then((response) => {
        if (response.data.reply) {
          setData(response.data.df);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getTable, [access]);

  return (
    <>
      <div className="flex w-screen px-auto p-10 " dir="rtl">
        <div className="max-w-full overflow-x-auto shadow-md border border-gray-300 rounded-lg w-full p-5">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 m-5">
            <p className="text-3xl font-bold text-blue-900">گزارش</p>

          </div>
          <div className="subPage tablePg">
            {data === null ? (
              <MiniLoader />
            ) : data === false ? (
              <NoData />
            ) : null}

            <div id="data-table"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportAnalyze;

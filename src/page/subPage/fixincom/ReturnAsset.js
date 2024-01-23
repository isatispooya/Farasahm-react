import axios from "axios";
import { OnRun } from "../../../config/config";
import { useContext, useEffect, useState } from "react";
import { AccessContext } from "../../../config/accessContext";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import LoaderCircle from "../../../componet/Loader/LoadingCircle";

const ReturnAsset = () => {
  const [df, setDf] = useState(null);
  const [rtn, setRtn] = useState(0);
  const access = useContext(AccessContext);
  const [loading, setLoading] = useState(true);

  const getDf = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: OnRun + "/getreturnasset",
      data: { access: access },
    }).then((response) => {
      if (response.data.reply) {
        setDf(response.data.df);
        setRtn(response.data.retn);
      } else {
        setDf(false);
      }
    });
    setLoading(false);

  };

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
      columns: [
        {
          title: "دارایی",
          field: "MarketInstrumentTitle",
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
          topCalc:"sum",
          headerFilter: "input",
          formatter: function (cell, formatterParams) {
            var value = cell.getValue();
            return "<p>" + (value * 1).toLocaleString() + "</p>";
          },
          topCalcFormatter:function(cell,formatterParams){
            var value = cell.getValue();
            return("<p>"+value.toLocaleString()+"</p>")
        },
        },
        {
          title: "بازدهی",
          field: "rate",
          hozAlign: "center",
          headerHozAlign: "center",
          resizable: true,
          widthGrow: 4,
          headerFilter: "input",
        },
      ],
    });
  }

  useEffect(getDf, []);

  return (
    <div className="subPage tablePg">
      <div className="tls">
      <LoaderCircle loading={loading} />
        <h2 className="titlePage">بازدهی دارایی ها</h2>
      </div>
      <div className="retnasst">
        <h2>بازدهی کل</h2>
        <h3>{rtn} %</h3>
      </div>
      <div id="data-table"></div>
    </div>
  );
};

export default ReturnAsset;

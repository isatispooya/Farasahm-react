import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { OnRun } from "../../config/config";
import { AccessContext } from "../../config/accessContext";

const Settings = () => {
  const [tableData, setTableData] = useState([]);
  const [tabulatorInstance, setTabulatorInstance] = useState(null);
  const access = useContext(AccessContext);

  const getData = () => {
    axios({
      method: "POST",
      url: OnRun + "/settings/user-management",
      data: { access: access },
    }).then((response) => {
      console.log(response.data);
      setTableData(response.data);
      if (tabulatorInstance) {
        tabulatorInstance.setData(response.data);
      }
    });
  };

  useEffect(() => {
    const newTable = new Tabulator("#data-table", {
      data: tableData,
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
      autoColumns: true,
    });

    setTabulatorInstance(newTable); // Store the Tabulator instance

    return () => {
      if (newTable) {
        newTable.destroy();
      }
    };
  }, [tableData]);

  return (
    <div className="subPage tablePg">
      <div className="tls">
        <h2 className="titlePage">تنظیمات</h2>
        <div className="btntls">
          <button className="inp-fld" onClick={getData}>بارگزاری</button> {/* Added onClick to the button */}
        </div>
      </div>

      <div id="data-table"></div>
    </div>
  );
};

export default Settings;

import axios from "axios";
import { AccessContext } from "../../config/accessContext";
import React, { useState, useEffect, useContext } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { OnRun } from "../../config/config";

const Settings = () => {
  const access = useContext(AccessContext);
  const [tableData, setTableData] = useState([]);
  const [tabulatorInstance, setTabulatorInstance] = useState(null);

console.log(access);

  const getData = async () => {
    try {
      const response = await axios.post(OnRun + "/setting/usermanage", 
         { access: ["65d47d4689a4ba665b775b87", "marketing" ] }
      );
      console.log(response.data);
    
      const data = response.data.df;  
      setTableData(data);
    
      if (tabulatorInstance) {
        tabulatorInstance.setData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      rowTooltip: function (row) {
        var data = row.getData();
        return (
          "enabled: " +
          data.enabled +
          "_children: " +
          data._children
        );
      },
    });

    setTabulatorInstance(newTable);

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
          <button className="inp-fld" onClick={getData}>بارگزاری</button>
        </div>
      </div>
      <div id="data-table"></div>
    </div>
  );
};

export default Settings;

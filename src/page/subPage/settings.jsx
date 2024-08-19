import axios from "axios";
import { AccessContext } from "../../config/accessContext";
import React, { useState, useEffect, useContext } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { OnRun } from "../../config/config";
import { Link } from "react-router-dom";
import { IoRefresh } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const Settings = () => {
  const access = useContext(AccessContext);
  const [tableData, setTableData] = useState([]);
  const [tabulatorInstance, setTabulatorInstance] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.post(OnRun + "/setting/usermanage", {
        access: ["65d47d4689a4ba665b775b87", "marketing"],
      });
      console.log("Raw Response Data:", response.data);

      const data = response.data.df;

      const formattedData = data.map((item) => ({
        ...item,
      }));

      console.log("Formatted Data:", formattedData);
      setTableData(formattedData);

      if (tabulatorInstance) {
        tabulatorInstance.setData(formattedData);
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
      columns: [
        {
          title: "شماره",
          field: "phone",
        },
        { title: "اسم", field: "name", width: 150 },
        {
          title: "کارت ها ",
          field: "card",
        },
      ],
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
      {/* Navbar */}
      <nav className="flex justify-between  items-center py-4 border-2 rounded-lg shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              to="/section"
              className="text-white flex items-center bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-lg transition"
            >
            <FaHome className="text-2xl mr-2" />
              خانه
            </Link>
            <button
              className="px-4 flex items-center py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={getData}
            >
              <IoRefresh className="text-2xl mr-2" />
              بارگزاری
            </button>
          </div>
          <h1 className="text-black text-2xl font-bold">تنظیمات</h1>

        </div>
      </nav>

 
      <div className="p-6 bg-gray-100">
        <div id="data-table" className="bg-white shadow rounded-lg"></div>
      </div>
    </div>
  );
};

export default Settings;

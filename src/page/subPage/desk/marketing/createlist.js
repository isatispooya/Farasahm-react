import { useState, useEffect, useContext } from "react";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import NoData from "../../../../componet/Loader/NoData";
import { exportPdf } from "../../../../config/exportPdf";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import ModalFilter from "../../../../componet/modalFilter";
import { AccessContext } from "../../../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../../../config/config";
import Smspage from "../../../../componet/smspage";

const CreateList = () => {
  const access = useContext(AccessContext);
  const [listConfig, setListConfig] = useState([]);
  const [df, setDf] = useState(null);
  const [table, setTable] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  const [isOpenSender, setIsOpenSender] = useState(false);
  const [len, setLen] = useState(0);




  // const getDf = () => {
  //   if (Config) {
  //     axios({
  //       method: "POST",
  //       url: OnRun + "/marketing/columnmarketing",
  //       data: { access: access, _id: Config },
  //     }).then((response) => {
  //       setDf(response.data.dic);
  //       setColumns(response.data.columns);
  //       setLen(response.data.len);
       
  //     });
  //   }
  // };




  useEffect(() => {
    if (df) {
      const newTable = new Tabulator("#data-table", {
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
        autoColumns: true,
      });

      setTable(newTable); // Set the table instance in state

      return () => {
        newTable.destroy(); // Clean up the table instance on unmount
      };
    }
  }, [df]);

  







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
            if (table) {
              table.download("csv", "data.csv");
            }
          }}
        >
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>

        <div className="btntls">
          <button className="inp-fld" onClick={()=>setIsOpenSender(true)}>
            ارسال
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>
          <button className="inp-fld" onClick={()=>setIsOpenFilter(true)}>
            ایجاد
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>

        </div>
      </div>


      <div>
        {isOpenFilter && (
          <ModalFilter
            toggleModal={setIsOpenFilter}
            access={access}
            listConfig={listConfig}
          />
        )}
      </div>
      <div>

      </div>
      <div>
        {/* {isOpenSender && (
          <Smspage
            toggleModal={toggleModalSender}
            len={len}
            Config={Config}
            columns={columns}
            access={access}
          />
        )} */}
      </div>
      <div>

      </div>
      <div id="data-table"></div>
    </div>
  );
};

export default CreateList;


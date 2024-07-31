import { useState, useEffect, useContext } from "react";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import NoData from "../../../../componet/Loader/NoData";
import { exportPdf } from "../../../../config/exportPdf";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import ModalFilter from "../../../../componet/modalFilter";
import { AccessContext } from "../../../../config/accessContext";

const CreateList = () => {
  const access = useContext(AccessContext);
  console.log(access);
  const [df, setDf] = useState(null);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    if (df) {
      const table = new Tabulator("#data-table", {
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

      return () => {
        table.destroy();
      };
    }
  }, [df]);

  const toggleModal = () => {
    setIsOpenFilter(!isOpenFilter);
  };

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
            if (df) {
              new Tabulator("#data-table").download("csv", "data.csv");
            }
          }}
        >
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>
        <div className="btntls">
          <button className="inp-fld" onClick={toggleModal}>
            ایجاد
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>
        </div>
      </div>

      {/* {df === null ? <MiniLoader /> : df === false ? <NoData /> : null} */}

      <div>{isOpenFilter && <ModalFilter toggleModal={toggleModal} access={access}/>}</div>
      <div id="data-table"></div>
    </div>
  );
};

export default CreateList;

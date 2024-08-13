import React, { useState, useEffect, useContext } from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import ModalFilter from "../../../../componet/marketing/modalFilter";
import { AccessContext } from "../../../../config/accessContext";
import axios from "axios";
import Smspage from "../../../../componet/marketing/smspage";
import { OnRun } from "../../../../config/config";
import XLSX from "xlsx/dist/xlsx.full.min.js";
import { FiRefreshCw } from "react-icons/fi";
import { MdOutlineTopic } from "react-icons/md";
import MiniLoader from "../../../../componet/Loader/miniLoader";
import { GrDocumentExcel } from "react-icons/gr";
import { IoReloadSharp } from "react-icons/io5";

import { AiOutlineUsergroupDelete } from "react-icons/ai";
import ModalAdvancedFilter from "../../../../componet/marketing/ModalAdvancedFilter";

const CreateList = () => {
  const access = useContext(AccessContext);
  const [Config, setConfig] = useState([]);
  const [df, setDf] = useState(null);
  const [table, setTable] = useState(null);
  const [isOpenFilter, setIsOpenFilter] = useState(true);
  const [configSelected, setConfigSelected] = useState();
  const [isOpenSender, setIsOpenSender] = useState(false);
  const [isOpenAdvancedFilter, setIsOpenAdvancedFilter] = useState(false);
  const [contextSelected, setIsContextSelected] = useState("");
  const [loadingDf, setLoadingDf] = useState(false);
  window.XLSX = XLSX;

  const openModalFilter = () => {
    setIsOpenFilter(true);
  };
  const openModalAdvancedFilter = () => {
    setIsOpenAdvancedFilter(true);
  };
  const closeModalAdvancedFilter = () => {
    setIsOpenAdvancedFilter(false);
  };

  const closeSenderModal = () => {
    setIsOpenSender(false);
  };

  useEffect(() => {
    if (df && !isOpenFilter) {
      if (table) {
        table.destroy();
      }

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
        rowTooltip: function (row) {
          var data = row.getData();
          return (
            "Name: " +
            data.name +
            "\nAge: " +
            data.age +
            "\nGender: " +
            data.gender
          );
        },
      });

      setTable(newTable);

      return () => {
        if (newTable) {
          newTable.destroy();
        }
      };
    }
  }, [df, isOpenFilter]);

  const get = () => {
    setLoadingDf(true);
    setTable(null);
    if (configSelected) {
      setDf(null);
      axios({
        method: "POST",
        url: OnRun + "/marketing/perviewcontext",
        data: { access: access, _id: configSelected },
      }).then(async (response) => {
        setDf(response.data.dict);
        setConfig(response.data);        
        setLoadingDf(false);
      });
    } else {
      setLoadingDf(false);
    }
  };

  useEffect(get, [access, configSelected, contextSelected]);  

  return (
    <div className="subPage tablePg">
      <div className="tls">
        <h2 className="titlePage">لیست</h2>
        {isOpenFilter ? null : (
          <>
            <p
              onClick={() => {
                table.download("xlsx", "data.xlsx");
              }}
            >
              <GrDocumentExcel />
              <span>خروجی Excel</span>
            </p>
            <p
              onClick={() => {
                if (table) {
                  table.download("xlsx", ".xlsx", "buffer");
                }
              }}
            >
              <BsFiletypeCsv />
              <span>خروجی CSV</span>
            </p>
          </>
        )}

        <div className="btntls">
          {isOpenFilter ? null : (
            <>
              <button className="inp-fld" onClick={() => setIsOpenSender(true)}>
                محتوا
                <MdOutlineTopic className="mt-1" />
              </button>
              <button className="inp-fld" onClick={() => setIsOpenFilter(true)}>
                ایجاد
                <MdOutlineCreateNewFolder className="mt-1" />
              </button>
              <button
                className="inp-fld"
                onClick={openModalAdvancedFilter}
              >
                فیلتر پیشرفته
                <AiOutlineUsergroupDelete className="mt-1" />
              </button>
              <button className="inp-fld" onClick={get}>
                بارگزاری
                <IoReloadSharp className="mt-1" />
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        {isOpenFilter && (
          <ModalFilter
            toggleModal={setIsOpenFilter}
            access={access}
            configSelected={configSelected}
            setConfigSelected={setConfigSelected}
            setIsContextSelected={setIsContextSelected}
            setIsOpenFilter={setIsOpenFilter}
          />
        )}
      </div>

      <div>
        {isOpenAdvancedFilter && (
          <ModalAdvancedFilter 
            open={isOpenAdvancedFilter} 
            handleClose={closeModalAdvancedFilter} 
            access={access}
            configSelected={configSelected}
            Config={Config.config}
            setConfig={setConfig}
            get={get}


          />
        )}
      </div>

      <div>
        {isOpenSender && (
          <Smspage
            toggleModal={closeSenderModal}
            access={access}
            Config={Config.config}
            configSelected={configSelected}
            get={get}
            openFilterModal={openModalFilter}
          />
        )}
      </div>
      <div></div>
      {loadingDf && <MiniLoader />}
      <div id="data-table"></div>
    </div>
  );
};

export default CreateList;

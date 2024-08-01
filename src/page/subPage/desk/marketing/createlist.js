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
  const [listConfig, setListConfig] = useState([])
  const [Config, setConfig] = useState(null)
  const [df, setDf] = useState(null);
  const [columns, setcolumns] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSender, setIsOpenSender] = useState(false);

  const getConfigList = () =>{
    axios({method:"POST", url:OnRun+'/marketing/marketinglist',data:{access:access}})
    .then(response=>{

      setListConfig(response.data);
      setConfig(response.data[0])
    })
  }


  const getDf = () =>{

    if(Config){
      axios({method:"POST", url:OnRun+'/marketing/columnmarketing',data:{access:access,_id:Config}})
      .then(response=>{
        console.log(response.data)
        setDf(response.data.df)
        setcolumns(response.data.columns)
      })

    }
  }




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
  useEffect(getConfigList,[])
  useEffect(getDf,[Config])

  const toggleModal = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const toggleModalSender = () => {
    setIsOpenSender(!isOpenSender);
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
          <button className="inp-fld" onClick={toggleModalSender}>
            ارسال
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>
          <button className="inp-fld" onClick={toggleModal}>
            ایجاد
            <MdOutlineCreateNewFolder className="mt-1" />
          </button>
          <select
            value={Config}
            onChange={(e) => setConfig(e.target.value)}
          >
            {listConfig.map((i) => (
              <option key={i._id} value={i._id}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* {df === null ? <MiniLoader /> : df === false ? <NoData /> : null} */}

      <div>{isOpenFilter && <ModalFilter toggleModal={toggleModal} access={access}/>}</div>
      <div>{isOpenSender && <Smspage toggleModal={toggleModalSender} Config={Config} columns={columns} access={access}/>}</div>
      <div id="data-table"></div>
    </div>
  );
};

export default CreateList;

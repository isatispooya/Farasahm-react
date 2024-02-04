import { useContext, useEffect, useState } from "react";
import LoaderCircle from "../../../componet/Loader/LoadingCircle";
import { exportPdf } from "../../../config/exportPdf";
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { BsCashCoin, BsFiletypePdf, BsFiletypeCsv} from "react-icons/bs";
import { OnRun } from "../../../config/config";
import axios from "axios";
import { AccessContext } from "../../../config/accessContext";

const CustomerRemain = () => {
  const [loading, setLoading] = useState(true);
  const access = useContext(AccessContext)


  const get = () =>{
    axios.post(OnRun+'/customerremain',{access:access})
  }

  useEffect(get,[])

  return (
    <div className="subPage tablePg">

      <LoaderCircle loading={loading} />
      <div className="tls">
        <h2 className="titlePage">ورود پول</h2>
        <div className="btntls">
          <p onClick={exportPdf}>
            <BsFiletypePdf />
            <span>خروجی PDF</span>
          </p>
          <p
            onClick={() => {
            //   table.download("csv", "data.csv");
            }}
          >
            <BsFiletypeCsv />
            <span>خروجی CSV</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRemain;

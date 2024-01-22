import { useContext, useEffect, useState } from "react";
import { AccessContext } from "../../config/accessContext";
import ProfileTrader from "../../componet/ProfileTrader";
import { BsFiletypeCsv, BsFiletypePdf } from "react-icons/bs";
import { exportPdf } from "../../config/exportPdf";
import axios from "axios";
import { OnRun } from "../../config/config";

const Residual = () => {
  const access = useContext(AccessContext);
  const [dataProfile, setDataProfile] = useState(null);
  const [df, setDf] = useState(null)
  const [input, setInput] = useState(100);
  const [selectedType, setSelectedType] = useState("buy");

  const getDf = () =>{
    axios.post(OnRun+'/getresidual',{access:access, target:input.target, type: selectedType})
    .then(response=>{
        if (response.data.reply) {
            setDf(response.data.df)
            
        }else{
            setDf(false)
        }
        console.log(response.data.df)
    })
}
useEffect(getDf,[input,selectedType])


  return (
    <div className="subPage tablePg">
      <ProfileTrader
        access={access}
        dataProfile={dataProfile}
        setDataProfile={setDataProfile}
      />

      <div className="tls">
        <h2 className="titlePage">سهامداران</h2>
        <p onClick={exportPdf}>
          <BsFiletypePdf />
          <span>خروجی PDF</span>
        </p>
        <p>
          <BsFiletypeCsv />
          <span>خروجی CSV</span>
        </p>
        <div className="btntls">
          <div className="inp-fld">
            <span>روز</span>
            <input type="number" value={input.target} onChange={(e)=>setInput({...input,target:e.target.value})}></input>
            <span>تعداد</span>
          </div>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="buy">خرید</option>
          <option value="sell">فروش</option>
          <option value="all">همه</option>
        </select>
        <span>نوع</span>
        </div>
      </div>
    </div>
  );
};
export default Residual;
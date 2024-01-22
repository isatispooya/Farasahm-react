import axios from "axios";
import { OnRun } from "../../../../config/config";
import { AccessContext } from "../../../../config/accessContext";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
const SetRetAsst = () => {
  const access = useContext(AccessContext);
  const [df, setDf] = useState([]);

  const updateRate = (index, newRate) => {
    // کپی کردن آرایه با استفاده از spread operator
    const updatedInstruments = [...df];

    // به‌روز‌رسانی مقدار rate مربوط به آیتم مورد نظر
    updatedInstruments[index].rate = newRate;

    // تنظیم مجدد استیت با آرایه به‌روز‌شده
    setDf(updatedInstruments);
  };

  const get = () => {
    axios
      .post(OnRun + "/getratretasst", { access: access })
      .then((response) => {
        if (response.data.reply) {
          setDf(response.data.df);
        } else {
          toast.warn(response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
    });
};


const save = () =>{
    axios.post(OnRun+'/saverateretasst',{access: access, df:df})
    .then(response=>{
        if (response.data.reply) {
            toast.success('بروز شد', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
        }else{
            toast.warn(response.data.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });

        }
    })
  }

  useEffect(get, []);
  return (
    <div className="subPage tablePg">
      <ToastContainer autoClose={3000} />
      <div className="tls">
        <h2 className="titlePage">تنظیم بازدهی دارایی ها</h2>
        <div className="btntls">
        <p onClick={save} className="btntls" ><span><FaSave /></span>ذخیره</p>

        </div>
      </div>
      <div className="formInpPanel">
        <div className="inuComRow">
          {df.length == 0
            ? null
            : df.map((instrument, index) => {
                return (
                  <fieldset key={index}>
                    <input
                      value={instrument.rate}
                      onChange={(e) =>
                        updateRate(index, parseFloat(e.target.value))
                      }
                      type="number"
                      step="0.01"
                    ></input>
                    <label>{instrument.type}</label>
                    <label>{instrument.MarketInstrumentTitle}</label>
                  </fieldset>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default SetRetAsst;

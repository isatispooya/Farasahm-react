import { useCallback, useContext, useEffect, useState } from "react";
import ProfileTrader from "../../../componet/ProfileTrader";
import { AccessContext } from "../../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../../config/config";
import LoaderCircle from "../../../componet/Loader/LoadingCircle";

const CalculatorFixincom = () => {
  const access = useContext(AccessContext);
  const [dataProfile, setDataProfile] = useState(null);
  const [df, setDf] = useState({result1:0,result2:0});
  const [loading, setLoading] = useState(true)

  const [currentPrice, setCurrentPrice] = useState(1000);
  const [futurePrice, setFuturePrice] = useState(1000);
  const [time, setTime] = useState(10);

  const [rate, setRate] = useState(1000);
  const [current, setCurrent] = useState(1000);
  const [timee, setTimee] = useState(10);

  const getDf = () => {
    setLoading(true);
    axios.post(OnRun + "/calculator/fixincom", {
        access: access,
        time: time,
        currentPrice: currentPrice,
        futurePrice: futurePrice,
        current: current,
        rate: rate,
        timee: time,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.reply) {
          setDf(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  useEffect(getDf, [time,currentPrice,futurePrice,current,rate,timee]);

  return (
    <>
      <div className="subPage tablePg">
        {/* {console.log(df.result1)} */}
      <LoaderCircle loading={loading} />
        <ProfileTrader
          access={access}
          dataProfile={dataProfile}
          setDataProfile={setDataProfile}
        />
        <div className="tls">
          <h2 className="titlePage">ماشین حساب اوراق</h2>
        </div>

        <div className="formInpPanel">
          <div className="row">
            <fieldset>
              <label>(ریال)قیمت فعلی</label>
              <input
                type="number"
                value={currentPrice}
                onChange={useCallback((e) => setCurrentPrice(e.target.value))}
              ></input>
            </fieldset>

            <fieldset>
              <label>(ریال)قیمت آتی</label>
              <input
                type="number"
                value={futurePrice}
                onChange={useCallback((e) => setFuturePrice(e.target.value))}
              ></input>
            </fieldset>

            <fieldset>
              <label>مدت (روز)</label>
              <input
                type="number"
                value={time}
                onChange={useCallback((e) => setTime(e.target.value))}
              ></input>
            </fieldset>
          </div>
        </div>
        <div className="incresrow">
          <div className="row">
                <div className="asscls">
                  <div className="vlft">
                    <p>%</p>
                    <p>{df.result1}</p>
                    <p>&nbsp; :نرخ</p>
                  </div>
                </div>
          </div>
        
        </div>

        <div className="formInpPanel">
          <div className="row">
            <fieldset>
              <label>(ریال)قیمت فعلی</label>
              <input
                type="number"
                value={current}
                onChange={useCallback((e) => setCurrent(e.target.value))}
              ></input>
            </fieldset>

            <fieldset>
              <label>% &nbsp;نرخ </label>
              <input
                type="number"
                value={rate}
                onChange={useCallback((e) => setRate(e.target.value))}
              ></input>
            </fieldset>

            <fieldset>
            <label>مدت (روز)</label>
              <input
                type="number"
                value={timee}
                onChange={useCallback((e) => setTimee(e.target.value))}
              ></input>
            </fieldset>
          </div>
        </div>
        <div className="incresrow">
        <div className="row">
           
                <div className="asscls">
                  <div className="vlft">
                    <p>ریال</p>
                    <p>{df.result2}</p>
                    <p>&nbsp; :قیمت آتی</p>
                  </div>
                </div>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorFixincom;

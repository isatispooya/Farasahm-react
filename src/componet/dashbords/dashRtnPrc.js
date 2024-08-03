import { useState, useContext, useEffect } from "react";
import { AccessContext } from "../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../config/config";
import MiniLoader from "../Loader/miniLoader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { setCookie, getCookie } from "../cookie/cookie";
import { Bar } from "react-chartjs-2";

const DashRtnPrc = () => {
  const access = useContext(AccessContext);
  const [dic, setDic] = useState(null);
  const [period, setPeriod] = useState("ماهانه");
  const [method, setMethod] = useState("مرکب");

  const handlePeriod = (e) => {
    setCookie("dashrtnprdlst", e.target.value, 10);
    setPeriod(e.target.value);
  };
  const handleMethod = (e) => {
    setCookie("dashrtnmthdls", e.target.value, 10);
    setMethod(e.target.value);
  };

  useEffect(() => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      BarElement
    );
  }, []);

  const get = () => {
    axios
      .post(OnRun + "/getretrnprice", {
        access: access,
        period: period,
        method: method,
      })
      .then((response) => {
        var lab = response.data.df.dateInt;

        setDic({
          lab,
          datasets: [
            {
              label: "YTM",
              data: response.data.df.YTM,
              backgroundColor: "#599fd9",
              borderColor: "#599fd9",
              borderRadius: "15",
            },
          ],
        });
      });
  };

  const Options = {
    responsive: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        display: true,
        title: { display: true, text: "بازدهی قیمت" },
        tooltip: { backgroundColor: "#273bb0" },
      },
    },
  };

  useEffect(get, [period, method]);

  useEffect(() => {
    var per = getCookie("dashrtnprdlst");
    if (per.length > 0) {
      setPeriod(per);
    } else {
      setPeriod("ماهانه");
    }
  }, []);

  useEffect(() => {
    var per = getCookie("dashrtnmthdls");
    if (per.length > 0) {
      setMethod(per);
    } else {
      setMethod("مرکب");
    }
  }, []);
  return (
    <div className="dshfixdv">
      {dic == null ? <MiniLoader /> : <Bar options={Options} data={dic} />}
      <div className="opt">
        <select onChange={(e) => handlePeriod(e)} value={period}>
          <option value="روزانه">روزانه</option>
          <option value="هفتگی">هفتگی</option>
          <option value="ماهانه">ماهانه</option>
          <option value="فصلی">فصلی</option>
          <option value="شش ماهه">شش ماهه</option>
        </select>
        <select onChange={(e) => handleMethod(e)} value={method}>
          <option value="مرکب">مرکب</option>
          <option value="ساده">ساده</option>
          <option value="دوره">دوره</option>
        </select>
      </div>
    </div>
  );
};

export default DashRtnPrc;

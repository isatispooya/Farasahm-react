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
} from "chart.js";
import { Bar } from "react-chartjs-2";

const DashOnwer = () => {
  const access = useContext(AccessContext);
  const [dic, setDic] = useState(null);

  useEffect(() => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }, []);

  const Options = {
    responsive: true,
    aspectRatio: 4,
    plugins: {
      legend: {
        display: true,
        title: {
          display: true,
          text: "مالکین بیشتری تعداد واحد در ایساتیس پویا",
        },
        tooltip: { backgroundColor: "#273bb0" },
      },
    },
  };

  const get = () => {
    axios.post(OnRun + "/getonwerfix", { access: access }).then((response) => {
      var lab = response.data.df.CustomerTitle;
      var data = {
        lab,
        datasets: [
          {
            label: "واحد",
            data: response.data.df.Volume,
            backgroundColor: "#599fd9",
            borderColor: "#599fd9",
            borderRadius: "15",
          },
        ],
      };
      setDic(<Bar options={Options} data={data} />);
    });
  };

  useEffect(get, []);

  return <div className="dshfixdv">{dic == null ? <MiniLoader /> : dic}</div>;
};

export default DashOnwer;

import { useState, useContext, useEffect } from "react";
import { AccessContext } from "../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../config/config";
import MiniLoader from "../Loader/miniLoader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const CombineBankAccount = () => {
  const access = useContext(AccessContext);
  const [dic, setDic] = useState(null);
  const [df, setDf] = useState([] || null);
  const [rate, setRate] = useState(null);
  const [sum, setSum] = useState(null);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const get = () => {
    axios
      .post(OnRun + "/getassetmixbank", { access: access })
      .then((response) => {
        var lab = response.data.lab;
        setDf(response.data.df);
        setRate(response.data.rate);
        setSum(response.data.sum);
        setDic({
          labels: lab,
          datasets: [
            {
              data: response.data.lst,
              backgroundColor: [
                "rgba(201, 99, 92, 0.5)",
                "rgba(54, 162, 195, 0.5)",
                "rgba(255, 165, 86, 0.5)",
                "rgba(75, 130, 192, 0.5)",
                "rgba(217, 249, 157)",
              ],
              borderColor: [
                "rgba(201, 99, 92, 1)",
                "rgba(54, 162, 195, 1)",
                "rgba(255, 165, 86, 1)",
                "rgba(75, 130, 192, 1)",
                "rgba(101, 163, 13)",
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  };

  const Options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        title: { display: false, text: "ترکیب حساب‌های بانکی" },
        tooltip: { backgroundColor: "#273bb0" },
      },
    },
  };

  useEffect(get, []);
  return (
    <div className="py-5">
      <h1 className="">ترکیب حساب‌های بانکی</h1>
      <div className="flex justify-between mx-10 items-center">
        <div className="my-5">
          <div className="flex flex-col bg-indigo-700 ring-1 ring-indigo-700 py-3 items-center my-5 px-10  rounded-lg bg-opacity-35 ">
            <h4 className="font-bold text-xl">بازدهی</h4>
            <p className="text-base font-medium">
              {rate === null ? <MiniLoader /> : rate}%
            </p>
          </div>
          <div className="flex flex-col bg-indigo-700 ring-1 ring-indigo-700 py-3 items-center  px-10  rounded-lg bg-opacity-35 ">
            <h4 className="font-bold text-xl">ارزش کل</h4>
            <p className="text-base font-medium">
              {sum == null ? <MiniLoader /> : sum.toLocaleString()}M
            </p>
          </div>
        </div>
        <div className=" justify-items-center  ">
          <table className="table-auto border shadow-lg" dir="rtl">
            <thead>
              <tr className="bg-gray-100">
                <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                  نام
                </th>
                <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                  بازدهی
                </th>
                <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                  مقدار
                </th>
              </tr>
            </thead>
            <tbody>
              {df === null ? (
                <MiniLoader />
              ) : (
                df.map((i) => (
                  <tr key={i.name} className="text-center">
                    <td className="border-2 px-4 py-2">{i.name}</td>
                    <td className="border-2 px-4 py-2">{i.rate}%</td>
                    <td className="border-2 px-4 py-2">
                      {i.balance.toLocaleString()}M
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div>
          <h1 className=""> حساب‌های بانکی</h1>
          <div className="pie dshfixdv">
            {dic == null ? (
              <MiniLoader />
            ) : (
              <Pie options={Options} data={dic} />
            )}
          </div>{" "}
        </div>
      </div>
      <div className=" border-b-2 border-gray-200" />
    </div>
  );
};
export default CombineBankAccount;

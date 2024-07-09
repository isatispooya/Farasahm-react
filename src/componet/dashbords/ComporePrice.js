import { useState, useContext, useEffect } from "react";
import { AccessContext } from "../../config/accessContext";
import axios from "axios";
import { OnRun } from "../../config/config";
import MiniLoader from "../Loader/miniLoader";

const ComporePrice = () => {
  const access = useContext(AccessContext);
  const [dic, setDic] = useState(null);
  const get = () => {
    console.log({ access: access });
    axios
      .post(OnRun + "/fixincom/compareprice", { access: access })
      .then((response) => {
        setDic(response.data.dic);
      });
  };

  console.log(dic);

  useEffect(get, []);
  return (
    <div className="dshfixdv">
      <h1>مقایسه nav</h1>
      {dic == null ? (
        <MiniLoader />
      ) : (
        <>
          <div className=" justify-items-center  ">
            <table className="table-auto border shadow-lg" dir="rtl">
              <thead>
                <tr className="bg-gray-100">
                  <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                    نام
                  </th>
                  <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                    قیمت
                  </th>
                  <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                    اختلاف با تابلو
                  </th>
                  <th class=" border-2 border-neutral-200 px-6 py-4 dark:border-white/10">
                    درصد اختلاف با تابلو
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border-2 px-4 py-2">تابلو</td>
                  <td className="border-2 px-4 py-2">{dic.price}</td>
                  <td className="border-2 px-4 py-2">0</td>
                  <td className="border-2 px-4 py-2">0%</td>
                </tr>
                <tr className="text-center">
                  <td className="border-2 px-4 py-2">ابطال</td>
                  <td className="border-2 px-4 py-2">{dic.ebtal}</td>
                  <td className="border-2 px-4 py-2">{dic.dif_ebtal}</td>
                  <td className="border-2 px-4 py-2">{dic.rate_ebtal}</td>
                </tr>
                <tr className="text-center">
                  <td className="border-2 px-4 py-2">آماری</td>
                  <td className="border-2 px-4 py-2">{dic.amary}</td>
                  <td className="border-2 px-4 py-2">{dic.dif_amary}</td>
                  <td className="border-2 px-4 py-2">{dic.rate_amary}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ComporePrice;

import { useParams } from "react-router-dom";
import DashboardFixInCome from "../page/subPage/bours/dashbordFixIncome";
import { AccessContext } from "../config/accessContext";

const Management = () => {
  const { sym, key } = useParams();
  // key:6406d4bb6ce0fd6d33dd1553

  return (
    <>
      <AccessContext.Provider value={[key, sym]}>
        <div className="container-manage">
          <div className="header-management">
            <div className="text-m">
              <p>گزارش روزانه خاتم</p>
            </div>
            <div className="logo">
              <img
                className="back-logo"
                src={process.env.PUBLIC_URL + "/img/khatam.png"}
                alt="khatam"
              />
            </div>
          </div>
          <div className="dashManag">
            <DashboardFixInCome />
          </div>
        </div>
      </AccessContext.Provider>
    </>
  );
};

export default Management;

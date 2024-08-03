import axios from "axios";
import { OnRun } from "../config/config";
import { useEffect, useState } from "react";
import MiniLoader from "./Loader/miniLoader";
import {
  BsPersonCircle,
  BsCalendar2Date,
  BsPinMap,
  BsHash,
} from "react-icons/bs";
import { TbSum } from "react-icons/tb";

const ProfileTrader = (props) => {
  const [df, setDf] = useState(null);
  const getProfileTRader = () => {
    if (props.dataProfile) {
      axios({
        method: "POST",
        url: OnRun + "/getprofiletrader",
        data: { code: props.dataProfile, access: props.access },
      }).then((response) => {
        setDf(response.data.df);
        console.log(response.data.df);
      });
    }
  };
  const cansel = () => {
    setDf(null);
    props.setDataProfile(null);
  };

  useEffect(getProfileTRader, [props]);
  if (props.dataProfile) {
    return (
      <div className="PopUpInformation">
        {df == null ? (
          <MiniLoader />
        ) : (
          <div className="personal">
            <div className="content">
              <div className="bis">
                <p>نام کامل</p>
                <p>
                  <BsPersonCircle />
                </p>
              </div>
              <span>{df.fullName}</span>
            </div>
            <div className="content">
              <div className="bis">
                <p>تاریخ تولد</p>
                <p>
                  <BsCalendar2Date />
                </p>
              </div>
              <span>{df["تاریخ تولد"]}</span>
            </div>
            <div className="content">
              <div className="bis">
                <p>محل صدور</p>
                <p>
                  <BsPinMap />
                </p>
              </div>
              <span>{df["محل صدور"]}</span>
            </div>
            <div className="content">
              <div className="bis">
                <p>کد ملی</p>
                <p>
                  <BsHash />
                </p>
              </div>

              <span>{df["کد ملی"]}</span>
            </div>
            <div className="content">
              <div className="bis">
                <p>سهام کل</p>
                <p>
                  <TbSum />
                </p>
              </div>
              <span>{df["سهام کل"]}</span>
            </div>
          </div>
        )}
        <button onClick={cansel}>تایید</button>
      </div>
    );
  }
};

export default ProfileTrader;

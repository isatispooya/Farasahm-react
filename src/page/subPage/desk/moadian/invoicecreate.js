import axios from "axios";
import { OnRun } from "../../../../config/config";
import { useState, useContext, useEffect } from "react";
import { AccessContext } from "../../../../config/accessContext";
import { TiDelete } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import LoaderCircle from "../../../../componet/Loader/LoadingCircle";
// import { BsArrowRepeat } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";

const InvoiceCreate = () => {
  const access = useContext(AccessContext);
  const [loading, setLoading] = useState(true);
  const [invoceData, setInvoiceData] = useState({
    sellerId: 0,
    buyerId: "",
    buyerName: "",
    buyerPost: "",
    buyerTel: "",
    buyerAddress: "",
    createDate: "",
    addDate: "",
    patern: "1",
    buerType: "1",
    title: "",
    type: "1",
    body: [
      {
        idProduct: "",
        discription: "",
        count: "1",
        sumBeforOff: "0",
        off: "0",
        taxRate: "9",
        cash: "0",
      },
    ],
  });

  const [listCompanyMoadian, setListCompanyMoadian] = useState([]);

  const getListCompanyMoadian = () => {
    axios
      .post(OnRun + "/getlistcompanymoadian", { access: access })
      .then((response) => {
        if (!response.data.reply) {
          toast.warning(response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          setListCompanyMoadian(response.data.df);
        }
      });
  };

  useEffect(() => {
    getListCompanyMoadian();
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const handleIdBodyChange = (event, index, key) => {
    const newInvoiceData = { ...invoceData };
    newInvoiceData.body[index][key] = event.target.value;
    setInvoiceData(newInvoiceData);
  };

  const addBody = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      body: [
        ...prevState.body,
        {
          idProduct: "",
          discription: "",
          count: "1",
          sumBeforOff: "0",
          off: "0",
          taxRate: "10",
          cash: "0",
        },
      ],
    }));
  };

  const delbody = (index) => {
    if (invoceData.body.length > 1) {
      setInvoiceData((prevState) => ({
        ...prevState,
        body: prevState.body.filter((_, i) => i !== index),
      }));
    }
  };

  const handlecreatedate = (data) => {
    setInvoiceData({ ...invoceData, createDate: data });
  };

  const handleadddate = (data) => {
    setInvoiceData({ ...invoceData, addDate: data });
  };

  const save = () => {
    if (invoceData.title.length === 0) {
      toast.warning("عنوان صورت حساب پر کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (invoceData.sellerId.length === 0) {
      toast.warning("فروشنده را انتخاب کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (invoceData.sellerId === 0) {
      toast.warning("فروشنده را انتخاب کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (invoceData.buyerId.length === 0 && invoceData.type === "1") {
      toast.warning("شناسه خریدار را پر کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (invoceData.createDate === "") {
      toast.warning("تاریخ را پر کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (invoceData.addDate === "") {
      toast.warning("تاریخ صدور را پر کنید", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (Math.min(invoceData.body.map((i) => i.idProduct.length)) === 0) {
      toast.warning("برخی شناسه های کالا و خدمات خالی است", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (Math.min(invoceData.body.map((i) => i.sumBeforOff)) === 0) {
      toast.warning("برخی قیمت های برابر با صفر است", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      axios
        .post(OnRun + "/saveinvoce", { invoceData: invoceData, access: access })
        .then((response) => {
          if (response.data.reply) {
            toast.success("ثبت شد", { position: toast.POSITION.BOTTOM_RIGHT });
            setInvoiceData({
              sellerId: "",
              buyerId: "",
              createDate: "",
              addDate: "",
              patern: "1",
              buerType: "1",
              title: "",
              type: "1",
              body: [
                {
                  idProduct: "",
                  discription: "",
                  count: "1",
                  sumBeforOff: "0",
                  off: "0",
                  taxRate: "9",
                  cash: "0",
                },
              ],
            });
          } else {
            toast.warning(response.data.msg, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch(() => {
          toast.error("خطا در سرور, لطفا مجددا تلاش کنید", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  return (
    <>
      {invoceData ? (
        <div className="subPage tablePg">
          <ToastContainer autoClose={3000} />
          <div className="tls">
            <h2 className="titlePage">ایجاد صورت حساب</h2>
          </div>
          {loading ? (
            <LoaderCircle loading={loading} />
          ) : (
            <div>
              {listCompanyMoadian.length === 0 ? null : (
                <div className="invoce">
                  <section>
                    <div className="header-section">
                      <h3>طرفین</h3>
                    </div>
                    <div className="body-section">
                      <fieldset>
                        <label>عنوان صورت حساب</label>
                        <input
                          value={invoceData.title}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              title: e.target.value,
                            })
                          }
                        ></input>
                      </fieldset>
                      <fieldset>
                        <label>فروشنده</label>
                        <select
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              sellerId: e.target.value,
                            })
                          }
                          value={invoceData.sellerId}
                        >
                          <option key={Math.random() * 100} value={0}>
                            {"نا مشخص"}
                          </option>
                          {listCompanyMoadian.map((i) => {
                            return (
                              <option key={Math.random() * 100} value={i.idNum}>
                                {i.name}
                              </option>
                            );
                          })}
                        </select>
                      </fieldset>
                      <fieldset>
                        <label>شناسه اقتصادی/ملی خریدار</label>
                        <input
                          type="number"
                          value={invoceData.buyerId}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              buyerId: e.target.value,
                            })
                          }
                        ></input>
                      </fieldset>
                      <fieldset>
                        <label>نام خریدار</label>
                        <input
                          value={invoceData.buyerName}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              buyerName: e.target.value,
                            })
                          }
                        ></input>
                      </fieldset>
                    </div>
                    <div className="body-section">
                      <fieldset>
                        <label>آدرس خریدار</label>
                        <input
                          value={invoceData.buyerAddress}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              buyerAddress: e.target.value,
                            })
                          }
                        ></input>
                      </fieldset>
                      <fieldset>
                        <label>تماس خریدار</label>
                        <input
                          type="number"
                          value={invoceData.buyerTel}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              buyerTel: e.target.value,
                            })
                          }
                        ></input>
                      </fieldset>
                      <fieldset>
                        <label>کد پستی خریدار</label>
                        <input
                          type="number"
                          value={invoceData.buyerPost}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              buyerPost: e.target.value,
                            })
                          }
                        ></input>
                      </fieldset>
                    </div>
                  </section>
                  <section>
                    <div className="header-section">
                      <h3>کل صورت حساب</h3>
                    </div>
                    <div className="body-section">
                      <fieldset>
                        <label>تاریخ صورت حساب</label>
                        <DatePicker
                          format="MM/DD/YYYY HH:mm:ss"
                          plugins={[<TimePicker position="bottom" />]}
                          calendar={persian}
                          locale={persian_fa}
                          calendarPosition="bottom-right"
                          onChange={handlecreatedate}
                        />
                      </fieldset>
                      <fieldset>
                        <label>تاریخ صدور صورت حساب</label>
                        <DatePicker
                          format="MM/DD/YYYY HH:mm:ss"
                          plugins={[<TimePicker position="bottom" />]}
                          calendar={persian}
                          locale={persian_fa}
                          calendarPosition="bottom-right"
                          onChange={handleadddate}
                        />
                      </fieldset>
                      <fieldset>
                        <label>نوع صورت حساب</label>
                        <select
                          value={invoceData.type}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              type: e.target.value,
                            })
                          }
                        >
                          <option value={1}>نوع 1</option>
                          <option value={2}>نوع 2</option>
                        </select>
                      </fieldset>
                      <fieldset>
                        <label>الگوی صورت حساب</label>
                        <select
                          value={invoceData.patern}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              patern: e.target.value,
                            })
                          }
                        >
                          <option value={1}>فروش</option>
                          <option value={4}>پیمانکاری</option>
                        </select>
                      </fieldset>
                      <fieldset>
                        <label>نوع خریدار</label>
                        <select
                          value={invoceData.buerType}
                          onChange={(e) =>
                            setInvoiceData({
                              ...invoceData,
                              buerType: e.target.value,
                            })
                          }
                        >
                          <option value={1}>حقیقی</option>
                          <option value={2}>حقوقی</option>
                          <option value={5}>مصرف کننده</option>
                        </select>
                      </fieldset>
                    </div>
                  </section>
                  <section>
                    <div className="header-section">
                      <h3>جزئیات صورت حساب</h3>
                      <div className="btn" onClick={addBody}>
                        <span>
                          
                        </span>
                      </div>
                    </div>
                    <div className="body-section-row">
                      {invoceData.body.map((item, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="inx">
                              <h6>.{(index + 1).toLocaleString()}</h6>
                            </div>
                            <div className="fild">
                              <fieldset>
                                <label>شناسه کالا و خدمات</label>
                                <input
                                  value={item.idProduct}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "idProduct")
                                  }
                                ></input>
                              </fieldset>
                              <fieldset>
                                <label>شرح کالا و خدمات</label>
                                <input
                                  value={item.discription}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "discription")
                                  }
                                ></input>
                              </fieldset>
                              <fieldset>
                                <label>تعداد مقدار</label>
                                <input
                                  value={item.count}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "count")
                                  }
                                ></input>
                              </fieldset>
                              <fieldset>
                                <label>مبلغ قبل از تخفیف</label>
                                <input
                                  value={item.sumBeforOff}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "sumBeforOff")
                                  }
                                ></input>
                              </fieldset>
                              <fieldset>
                                <label>تخفیف</label>
                                <input
                                  value={item.off}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "off")
                                  }
                                ></input>
                              </fieldset>
                              <fieldset>
                                <label>نرخ ارزش افزوده</label>
                                <input
                                  value={item.taxRate}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "taxRate")
                                  }
                                ></input>
                              </fieldset>
                              <fieldset>
                                <label>مبلغ نقد پرداختی</label>
                                <input
                                  value={item.cash}
                                  onChange={(e) =>
                                    handleIdBodyChange(e, index, "cash")
                                  }
                                ></input>
                              </fieldset>
                            </div>
                            <div className="inx">
                              <span onClick={() => delbody(index)}>
                                <TiDelete />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  <button onClick={save}>ذخیره</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default InvoiceCreate;

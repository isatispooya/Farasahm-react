import axios from "axios"
import { OnRun } from "../../../../config/config";
import { useState, useContext, useEffect } from "react";
import { AccessContext } from "../../../../config/accessContext";
import { TiDelete } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify'
import { IoMdAddCircle } from "react-icons/io";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import LoaderCircle from "../../../../componet/Loader/LoadingCircle";

const InvoiceCreate = () => {
    const access = useContext(AccessContext)
    const [loading, setLoading] = useState(true);
    const [listCompanyMoadian, setListCompanyMoadian] = useState([])
    const [postalCode, setPostalCode] = useState('');
    const [sellerId, setSellerId] = useState(0);
    const [address, setAddress]=useState('')
    const [buyerId, setBuyerId] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [name, setName] = useState('');
    const [addDate, setAddDate] = useState('');
    const [patern, setPatern] = useState('1');
    const [buerType, setBuerType]=useState('1')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('1')
    
    const [body, setBody] = useState([
            { sellerId: '', buyerId: "" ,idProduct: '', discription: '', count: '1', sumBeforOff: '0', off: '0', taxRate: '10', cash: '0' },
        ])
   /* const [invoceData, setInvoiceData] = useState({
          createDate: '', addDate: '', patern: '1', buerType: '1', title: '', type: '1',
        body: [
            {sellerId:'',buyerId:"" idProduct: '', discription: '', count: '1', sumBeforOff: '0', off: '0', taxRate: '10', cash: '0' },
        ]
    })*/
    

    

    const getListCompanyMoadian = () => {
        axios.post(OnRun + '/getlistcompanymoadian', { access: access })
            .then(response => {
                if (!response.data.reply) {
                    toast.warning(response.data.msg, { position: toast.POSITION.BOTTOM_RIGHT })
                } else {
                    setListCompanyMoadian(response.data.df)
                    setSellerId({ ...sellerId, sellerId: response.data.df[0].idNum })
                }
            })
    }
    useEffect(() => {
        getListCompanyMoadian();
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

     const handleIdBodyChange = (event, index, key) => {
       //   Copy the existing state
         const newInvoiceData = { ...body };

       //   Update the idProduct of the second element in the body array
         newInvoiceData[index][key] = event.target.value;

     //       Set the updated state
        setBody(newInvoiceData);
     };

    const addBody = () => {
        var bodyAll = body
        bodyAll.push({ idProduct: '', discription: '', count: '1', sumBeforOff: '0', off: '0', taxRate: '10', cash: '0' })
        setBody(bodyAll)
    }

    const delbody = (inx) => {
        if (body.length > 1) {
            setBody((prevState) => ({
                ...prevState,
                body: prevState.body.filter((_, index) => index !== inx),
            }));
        }
    }


    const handlecreatedate = (data) => { setCreateDate({ ...createDate, createDate: data }) }
    const handleadddate = (data) => { setAddDate({ ...addDate, addDate: data }) }


    const save = () => {
        if (title.length === 0) {
            toast.warning("عنوان صورت حساب پر کنید", { position: toast.POSITION.BOTTOM_RIGHT })
        } else if (sellerId.length === 0) {
            toast.warning("فروشنده را انتخاب کنید", { position: toast.POSITION.BOTTOM_RIGHT })
        } else if (buyerId.length === 0) {
            toast.warning("شناسه خریدار را پر کنید", { position: toast.POSITION.BOTTOM_RIGHT })
        } else if (createDate === '') {
            toast.warning("تاریخ را پر کنید", { position: toast.POSITION.BOTTOM_RIGHT })
        } else if (addDate === '') {
            toast.warning("تاریخ صدور را پر کنید", { position: toast.POSITION.BOTTOM_RIGHT })
        }
        else if (inputPhone.length === 0) {
            toast.warning("شماره همراه وارد نشده است", { position: toast.POSITION.BOTTOM_RIGHT })
        } 
        else if (postalCode.length === 0) {
            toast.warning("کد پستی وارد نشده است", { position: toast.POSITION.BOTTOM_RIGHT })
        } 
        else if (Math.min(body.map(i => i.sumBeforOff)) === 0) {
            toast.warning("برخی قیمت های برابر با صفر است", { position: toast.POSITION.BOTTOM_RIGHT })
        } else {
            var invoceData = {
                postalCode, sellerId, buyerId, inputPhone, createDate, addDate, patern, buerType, title, type, body
            }
            axios.post(OnRun + '/saveinvoce', { invoceData: invoceData, access: access })
                .then(response => {
                    if (response.data.reply) {
                        setBody(({  createDate: '', addDate: '', patern: '1', buerType: '1', title: '', type: '1', body: [{ idProduct: '', discription: '', count: '1', sumBeforOff: '0', off: '0', taxRate: '9', cash: '0' }] }))
                    } else {
                        toast.warning(response.data.msg, { position: toast.POSITION.BOTTOM_RIGHT })
                    }
                })
        }
    }

    useEffect(getListCompanyMoadian, [])

    return (
        <div className="subPage tablePg">
            <ToastContainer autoClose={3000} />
            <div className="tls">
                <h2 className="titlePage">ایجاد صورت حساب</h2>
            </div>
            {loading ? (
                <LoaderCircle loading={loading} />
            ) : (
                <div>
                    {
                        listCompanyMoadian.length === 0 ? null :
                            <div className="invoce">
                                <section >
                                    <div className="header-section">
                                        <h3>طرفین</h3>
                                        </div>
                                        <div className="flex body-section ">
                                            
                                          
                                                <fieldset >
                                                    <label>نام خریدار</label>
                                                    <input value={name} type="text" onChange={(e) => setName(e.target.value )} placeholder="نام"></input>
                                                </fieldset>
                                        <fieldset>
                                            <label>عنوان صورت حساب</label>
                                            <input value={title }  placeholder="عنوان" onChange={(e) => setTitle( e.target.value )}></input>
                                        </fieldset>
                                        <fieldset>
                                            <label>فروشنده</label>
                                            <select className="text-red-800 text-xl" onChange={(e) => setSellerId(e.target.value)} value={sellerId}>
                                                <option key={Math.random() * 100} value={0}>انتخاب کنید</option>
                                                {
                                                    listCompanyMoadian.map(i => {
                                                        return (
                                                            <option key={Math.random() * 100} value={i.idNum}>{i.name}</option>
                                                        )
                                                    })
                                                }
                                                </select>
                                               
                                        </fieldset>
                                        </div>
                                        <div className="body-section">
                                        <fieldset>
                                            <label>شناسه اقتصادی/ملی خریدار</label>
                                            <input  value={buyerId} placeholder="شناسه"  onChange={(e) => setBuyerId(e.target.value)}></input>
                                        </fieldset>
                                            <fieldset>
                                                <label> شماره تماس خریدار </label>

                                                <input value={inputPhone.phone} onChange={(e) => setInputPhone(e.target.value )} placeholder='شماره تماس ' type='phone' maxLength={11} />

                                            </fieldset>
                                            <fieldset>
                                                <label>آدرس خریدار</label>
                                                <input value={address} onChange={(e) => setAddress( e.target.value )} placeholder="آدرس"></input>
                                            </fieldset>
                                            <fieldset>
                                                <label>کد پستی خریدار
                                                </label>
                                                <input placeholder="کدپستی"  value={postalCode} onChange={(e) => setPostalCode( e.target.value )} maxLength={10}></input>
                                            </fieldset>
                                       
                                        </div>
                                        <p dir="rtl" className="text-red-500">
                                            {name.length && title.length && buyerId.length && sellerId.length && postalCode.length && address.length > 0 ?
                                                <p >نام خریدار:{name}, عنوان صورتحساب:{title},شناسه اقتصادی:{buyerId},فروشنده:{sellerId}آدرس خریدار:{address},کدپستی:{postalCode}</p>
                                                : <p>اطلاعات کامل نیست</p>}
                                        </p>        
                                </section>
                                <section>
                                    <div className="header-section">
                                        <h3>کل صورت حساب</h3>
                                    </div>
                                    <div className="body-section">
                                        <fieldset>
                                            <label>تاریخ صورت حساب</label>
                                            <DatePicker format="MM/DD/YYYY HH:mm:ss" plugins={[<TimePicker position="bottom" />]} calendar={persian} locale={persian_fa} calendarPosition="bottom-right" onChange={handlecreatedate} />
                                        </fieldset>
                                        <fieldset>
                                            <label>تاریخ صدور صورت حساب</label>
                                            <DatePicker format="MM/DD/YYYY HH:mm:ss" plugins={[<TimePicker position="bottom" />]} calendar={persian} locale={persian_fa} calendarPosition="bottom-right" onChange={handleadddate} />
                                        </fieldset>
                                        <fieldset>
                                            <label>نوع صورت حساب</label>
                                            <select value={type} onChange={(e) => setType({ ...type, type: e.target.value })}>
                                                <option value={1}>نوع 1</option>
                                                <option value={2}>نوع 2</option>
                                            </select>
                                        </fieldset>
                                        <fieldset>
                                            <label>الگوی صورت حساب</label>
                                            <select value={patern} onChange={(e) => setPatern({ ...patern, patern: e.target.value })}>
                                                <option value={1}>فروش</option>
                                                <option value={4}>پیمانکاری</option>
                                            </select>
                                        </fieldset>
                                        <fieldset>
                                            <label>نوع خریدار</label>
                                            <select value={buerType} onChange={(e) => setBuerType({ ...buerType, buerType: e.target.value })}>
                                                <option value={6}>حقیقی</option>
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
                                            <span><IoMdAddCircle /></span>
                                        </div>
                                    </div>
                                    <div className="body-section-row">
                                        {
                                            body.map((item, index) => {
                                                return (
                                                    <div className="row" key={index}>
                                                        <div className="inx">
                                                            <h6>.{(index + 1).toLocaleString()}</h6>
                                                        </div>
                                                        <div className="fild">
                                                            <fieldset>
                                                                <label>شناسه کالا و خدمات</label>
                                                                <input value={item.idProduct} onChange={(e) => handleIdBodyChange(e, index, 'idProduct')}></input>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label>شرح کالا و خدمات</label>
                                                                <input value={item.discription} onChange={(e) => handleIdBodyChange(e, index, 'discription')}></input>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label>تعداد مقدار</label>
                                                                <input value={item.count} onChange={(e) => handleIdBodyChange(e, index, 'count')}></input>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label>مبلغ قبل از تخفیف</label>
                                                                <input value={item.sumBeforOff} onChange={(e) => handleIdBodyChange(e, index, 'sumBeforOff')}></input>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label>تخفیف</label>
                                                                <input value={item.off} onChange={(e) => handleIdBodyChange(e, index, 'off')}></input>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label>نرخ ارزش افزوده</label>
                                                                <input value={item.taxRate} onChange={(e) => handleIdBodyChange(e, index, 'taxRate')}></input>
                                                            </fieldset>
                                                            <fieldset>
                                                                <label>مبلغ نقد پرداختی</label>
                                                                <input value={item.cash} onChange={(e) => handleIdBodyChange(e, index, 'cash')}></input>
                                                            </fieldset>
                                                        </div>
                                                        <div className="inx">
                                                            <span onClick={() => delbody(index)}><TiDelete /></span>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        }

                                    </div>
                                </section>
                                <button onClick={save}>ذخیره</button>
                            </div>
                    }
                </div>

            )}
        </div>
    );

}


export default InvoiceCreate
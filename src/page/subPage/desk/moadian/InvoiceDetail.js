import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

const InvoiceDetail = ({ invoiceDetail, onClose }) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isBodyOpen, setIsBodyOpen] = useState(false);
  const [currentInvoiceDetail, setCurrentInvoiceDetail] = useState(null);

  useEffect(() => {
    setCurrentInvoiceDetail(invoiceDetail);
  }, [invoiceDetail]);

  const toggleWarnings = () => {
    setIsWarningOpen(!isWarningOpen);
  };
  const toggleError = () => {
    setIsErrorOpen(!isErrorOpen);
  };

  const toggleBody = () => {
    setIsBodyOpen(!isBodyOpen);
  };

  if (!currentInvoiceDetail) {
    return <p>داده‌ای موجود نیست</p>;
  }

  const {
    title,
    inquiry,
    details,
    indatim,
    indati2m,
    irtaxid, // صورت حساب مرجع
    paternInvoice, // الگو صورت حساب
    tadis, // بعد از تخفیف
    taxid,
    tbill,
    tdis,
    todam,
    tprdis,
    tvam,
    typeInvoce,
    body,
  } = currentInvoiceDetail;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none hover:scale-110 duration-300"
          >
            بستن
          </button>
        </div>
        <div className="space-y-3 grid grid-cols-2">
          {inquiry.data.success ? (
            <p>
              <strong className="flex items-center">
                وضعیت: موفق
                <FaCheck />
              </strong>
            </p>
          ) : (
            <p>
              <strong className="flex items-center">
                وضعیت: ناموفق
                <IoMdClose />
              </strong>
            </p>
          )}

          <p>
            <strong>جزئیات خریدار:</strong> {details.buyer}
          </p>
          <p>
            <strong>تاریخ ایجاد:</strong> {indati2m}
          </p>
          <p>
            <strong>تاریخ صدور:</strong> {indatim}
          </p>
          <p>
            <strong>شماره صورت‌حساب:</strong> {taxid}
          </p>
          <p>
            <strong>جمع کل:</strong> {tbill}
          </p>
          <p>
            <strong>تخفیف :</strong> {tdis}
          </p>
          {/* <p>
            <strong>جمع کل قابل پرداخت:</strong> {todam}
          </p> */}
          <p>
            <strong> قبل از تخفیف:</strong> {tprdis}
          </p>
          <p>
            <strong>مالیات بر ارزش افزوده :</strong> {tvam}
          </p>
          <p>
            <strong>نوع صورت‌حساب:</strong> {typeInvoce}
          </p>
        </div>
        <div>
          {inquiry.data.warning && inquiry.data.warning.length > 0 && (
            <div className="mt-4">
              <button
                onClick={toggleWarnings}
                className=" flex items-center bg-yellow-500 text-black px-2 py-2 rounded hover:scale-110 duration-300 focus:outline-none"
              >
                هشدارها
                <MdArrowDropDown />
              </button>
              {isWarningOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg">
                  <ul className="list-disc pl-5">
                    {inquiry.data.warning.map((warn, index) => (
                      <li key={index} className="py-1 px-3">
                        {warn.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {inquiry.data.error && inquiry.data.error.length > 0 && (
            <div className="mt-4">
              <button
                onClick={toggleError}
                className=" flex items-center bg-red-500 text-black px-2 py-2 rounded hover:scale-110 duration-300 focus:outline-none"
              >
                خطاها
                <MdArrowDropDown />
              </button>
              {isWarningOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg">
                  <ul className="list-disc pl-5">
                    {inquiry.data.error.map((err, index) => (
                      <li key={index} className="py-1 px-3">
                        {err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {body && body.length > 0 && (
            <div className="mt-4">
              <button
                onClick={toggleBody}
                className=" flex items-center bg-gray-200 text-black px-2 py-2 rounded hover:scale-110 duration-300 focus:outline-none"
              >
                ردیف ها
                <MdArrowDropDown />
              </button>
              {isBodyOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">کد کالا</th>
                        <th className="py-2 px-4 border-b">توضیحات</th>
                        <th className="py-2 px-4 border-b">مقدار</th>
                        <th className="py-2 px-4 border-b">قیمت واحد</th>
                        <th className="py-2 px-4 border-b">نقدی </th>
                        <th className="py-2 px-4 border-b">تخفیف</th>
                        <th className="py-2 px-4 border-b">مالیات</th>
                        <th className="py-2 px-4 border-b">مبلغ کل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {body.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{item.sstid}</td>
                          <td className="py-2 px-4 border-b">{item.sstt}</td>
                          <td className="py-2 px-4 border-b">{item.am}</td>
                          <td className="py-2 px-4 border-b">{item.fee}</td>
                          <td className="py-2 px-4 border-b">{item.cop}</td>
                          <td className="py-2 px-4 border-b">{item.dis}</td>
                          <td className="py-2 px-4 border-b">{item.vra}</td>
                          <td className="py-2 px-4 border-b">{item.tsstam}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;

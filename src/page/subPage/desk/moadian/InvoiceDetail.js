import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdArrowDropDown } from "react-icons/md";
import classNames from "classnames";

const InvoiceDetail = ({ invoiceDetail, onClose }) => {
  const [isOpen, setIsOpen] = useState({
    warnings: false,
    errors: false,
    body: false,
  });
  const [currentInvoiceDetail, setCurrentInvoiceDetail] = useState(null);

  useEffect(() => {
    setCurrentInvoiceDetail(invoiceDetail);
  }, [invoiceDetail]);

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
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
    taxid,
    tbill,
    tdis,
    tprdis,
    tvam,
    typeInvoce,
    body,
  } = currentInvoiceDetail;

  const success = inquiry?.data?.success;
  const warnings = inquiry?.data?.warning;
  const errors = inquiry?.data?.error;

  // console.log("details.buyer:", details.buyer); // Add this line to inspect the buyer details

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
          {success !== undefined && (
            <p>
              <strong className="flex items-center">
                وضعیت: {success ? "موفق" : "ناموفق"}
              </strong>
            </p>
          )}
          <p>
            <strong>جزئیات خریدار:</strong>{" "}
            {typeof details.buyer === "string" ? details.buyer : "اطلاعات نامعتبر"}
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
        {warnings && warnings.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => toggleSection("warnings")}
              className="flex items-center bg-yellow-500 text-black px-2 py-2 rounded hover:scale-110 duration-300 focus:outline-none"
            >
              هشدارها
              <MdArrowDropDown />
            </button>
            {isOpen.warnings && (
              <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg">
                <ul className="list-disc pl-5">
                  {warnings.map((warn, index) => (
                    <li key={index} className="py-1 px-3">
                      {warn.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {errors && errors.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => toggleSection("errors")}
              className="flex items-center bg-red-500 text-black px-2 py-2 rounded hover:scale-110 duration-300 focus:outline-none"
            >
              خطاها
              <MdArrowDropDown />
            </button>
            {isOpen.errors && (
              <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg">
                <ul className="list-disc pl-5">
                  {errors.map((err, index) => (
                    <li key={index} className="py-1 px-3">
                      {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {body && body.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => toggleSection("body")}
              className="flex items-center bg-gray-200 text-black px-2 py-2 rounded hover:scale-110 duration-300 focus:outline-none"
            >
              ردیف ها
              <MdArrowDropDown />
            </button>
            {isOpen.body && (
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
  );
};

InvoiceDetail.propTypes = {
  invoiceDetail: PropTypes.shape({
    title: PropTypes.string.isRequired,
    inquiry: PropTypes.shape({
      data: PropTypes.shape({
        success: PropTypes.bool,
        warning: PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.string,
          })
        ),
        error: PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.string,
          })
        ),
      }),
    }).isRequired,
    details: PropTypes.shape({
      buyer: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string,
          postcode: PropTypes.string,
          call: PropTypes.string,
          address: PropTypes.string,
          idcode: PropTypes.string,
        }),
      ]).isRequired,
    }).isRequired,
    indatim: PropTypes.string.isRequired,
    indati2m: PropTypes.string.isRequired,
    taxid: PropTypes.string.isRequired,
    tbill: PropTypes.string.isRequired,
    tdis: PropTypes.string.isRequired,
    tprdis: PropTypes.string.isRequired,
    tvam: PropTypes.string.isRequired,
    typeInvoce: PropTypes.string.isRequired,
    body: PropTypes.arrayOf(
      PropTypes.shape({
        sstid: PropTypes.string,
        sstt: PropTypes.string,
        am: PropTypes.string,
        fee: PropTypes.string,
        cop: PropTypes.string,
        dis: PropTypes.string,
        vra: PropTypes.string,
        tsstam: PropTypes.string,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InvoiceDetail;



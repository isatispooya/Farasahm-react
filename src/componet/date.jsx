import React, { useState } from "react"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export default function Example() {
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    return (
        <div className="flex flex-col items-center">
            <button className="bg-blue-600 flex items-center justify-center text-white rounded-md p-2 mt-4 mb-4">
                انتخاب تاریخ
            </button>
            <div style={{ direction: "rtl" }} className="flex justify-center gap-4">
                <div>
                    <p className="text-center">از تاریخ</p>
                    <DatePicker
                        calendar={persian}
                        value={to}
                        onChange={(date) => {
                            setTo(date)
                        }}
                        locale={persian_fa}
                        calendarPosition="bottom-left"
                    />
                </div>
                <div>
                    <p className="text-center">تا تاریخ</p>
                    <DatePicker
                        calendar={persian}
                        value={from}
                        onChange={setFrom}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                    />
                </div>
            </div>
        </div>
    )
}

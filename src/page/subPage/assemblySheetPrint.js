

import axios from "axios"
import { useParams } from "react-router-dom"
import { OnRun } from "../../config/config"
import { useEffect, useState } from "react"

const AssemblySheetPrint = () => {
    const { symbol, nc } = useParams()
    const [res, setRes] = useState(null)




    const GetData = () => {
        axios.post(OnRun + '/getsheetassembly', { symbol: symbol, nc: nc })
            .then(response => {
                setRes(response.data.data)
                console.log(response.data.data);
            })

    }


    useEffect(GetData, [])

    return (
        <div className="print">
            {
                res == null ? null :
                    <div className="conteiner">
                        <div className="title">
                            {/* <img src={"/img/" + symbol + '.png'}></img> */}
                            <h1>{res.company.fullname}</h1>
                            {/* <h2>برگه رای</h2> */}
                        </div>

                        <div className="text">
                            <div>
                                {
                                    res.register['شناسه ملی'] ?
                                        <p>شرکت</p>
                                        :
                                        <p>خانم / آقای</p>
                                }
                                <p>{  res.register["fullName"]}</p>
                            </div>
                            <div>
                                <p>ش. ملی</p>
                                <p>{res.register['شناسه ملی'] || res.register["کد ملی"]}</p>
                            </div>
                            <div>
                                <p>سهام کل</p>
                                <p>{(res.register['سهام کل'])}</p>
                            </div>
                        </div>
                        <div className="agade">
                            <h1>دستور جلسه:</h1>
                            <p style={{ whiteSpace: "pre-line" }}>
                                {res.assembly.agenda}
                            </p>


                        </div>
                        <div className="aras">

                            <div className="opt">
                                <h1>کاندیدا های انتخابات حسابرسی و بازرس:</h1>
                                <div className="grid grid-cols-2">
                                    {
                                        res.assembly.controller.map(i => {
                                            return (
                                                <span key={i}>{i}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <p>بازرس منتخب:</p>
                        </div>

                        <div className="aras">

                            <div className="opt">
                                <h1>کاندیدا های انتخابات هیئت مدیره:</h1>
                                <div className="grid grid-cols-2">

                                {
                                    res.assembly.managers.map(i => {
                                        return (
                                            <span key={i}>{i}</span>
                                        )
                                    })
                                }
                            </div>
                            </div>
                            <div className="aras  grid grid-cols-2 gap-2">
                                <p className="flex justify-between">1 منتخب:</p>
                                <p className="flex justify-between">تعداد:</p>
                                <p className="flex justify-between">2 منتخب:</p>
                                <p className="flex justify-between">تعداد:</p>
                                <p className="flex justify-between">3 منتخب:</p>
                                <p className="flex justify-between">تعداد:</p>
                                <p className="flex justify-between">4 منتخب:</p>
                                <p className="flex justify-between">تعداد:</p>
                                <p className="flex justify-between">5 منتخب:</p>
                                <p className="flex justify-between">تعداد:</p>
                                <p className="flex opacity-0 justify-between ">مجموع آراء:</p>
                                <p className="flex justify-between">
                                مجموع آراء: <span>{(res.register['سهام کل'] * 5).toLocaleString('en-US')}</span>
                            </p>
                            </div>

                        </div>
                        <div className="singer">
                            <p>{res.name}</p>
                            <p>{res.dateAsembly}</p>
                            <p>امضا</p>

                        </div>
                    </div>


            }


        </div>
    )
}



export default AssemblySheetPrint
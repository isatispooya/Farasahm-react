import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from '../../config/config'
import DatePi from "../../componet/datepicker/DatePi"
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,defaults} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import MiniLoader from "../../componet/Loader/miniLoader"
import NoData from "../../componet/Loader/NoData"

const Dashboard = () =>{
    const [dateSelection, setDateSelection] = useState(null)
    const [topBuyTraders, setTopBuyTraders] = useState(null)
    const [topSellTraders, setTopSellTraders] = useState(null)
    const [topBuyBroker, setTopBuyBroker] = useState(null)
    const [topSellBroker, setTopSellBroker] = useState(null)
    const [newCamer, setNewComer] = useState(null)
    const access = useContext(AccessContext)
    ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)
    defaults.font.family = 'peydaRegular'
    const topBuyOptions = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
                title: {display: true,text:'10 خریدار برتر'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }

    const topSelOptions = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
                title: {display: true,text:'10 فروشنده برتر'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }


    const topBuyOptionsBroker = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
                title: {display: true,text:'کارگزاری های برتر خرید'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }


    const topSelOptionsBroker = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
                title: {display: true,text:'کارگزاری های برتر فروش'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }

    const gettoptraders = () =>{
        if(dateSelection){
            axios({method:'POST',url:OnRun+'/gettoptraders',data:{access:access,date:dateSelection}
            }).then(response=>{
                if(response.data.replay){
                    const labelsTopBuy = response.data.df.buy.name
                    console.log(labelsTopBuy)
                    setTopBuyTraders({
                        labelsTopBuy,
                        datasets: [{
                            data: response.data.df.buy.vol,
                            backgroundColor: '#5aae40',
                            borderRadius: 15
                        }]
                    })
                    const labelsTopSel = response.data.df.sel.name
                    setTopSellTraders({
                        labelsTopSel,
                        datasets: [{
                            data: response.data.df.sel.vol,
                            backgroundColor: '#ae4040',
                            borderRadius: 15
                        }]
                    })
                }else{
                    setTopBuyTraders(false)
                    setTopSellTraders(false)
                }
            })
        }
    }

    const gettopbroker = () =>{
        if(dateSelection){
            axios({method:'POST',url:OnRun+'/gettopbroker',data:{access:access,date:dateSelection}
            }).then(response=>{
                if(response.data.replay){
                    const labelsTopBuy = response.data.df.buy.name
                    setTopBuyBroker({
                        labelsTopBuy,
                        datasets: [{
                            data: response.data.df.buy.vol,
                            backgroundColor: '#5aae40',
                            borderRadius: 15
                        }]
                    })
                    const labelsTopSel = response.data.df.sel.name
                    setTopSellBroker({
                        labelsTopSel,
                        datasets: [{
                            data: response.data.df.sel.vol,
                            backgroundColor: '#ae4040',
                            borderRadius: 15
                        }]
                    })
                }else{
                    setTopBuyTraders(false)
                    setTopSellTraders(false)
                }
            })
        }
    }

    const getNewcomer = () =>{
        if(dateSelection){
            axios({method:"POST",url:OnRun+'/getnewcomer',data:{access:access,date:dateSelection}
            }).then(response=>{
                if(response.data.replay){
                    setNewComer(response.data.dic)
                }else{
                    setNewComer(false)
                }
            })

        }
    }

    useEffect(gettoptraders,[dateSelection])
    useEffect(getNewcomer,[dateSelection])
    useEffect(gettopbroker,[dateSelection])

    return(
        <div className="subPage dashPg">
            <div className="tls">
                <h2 className="titlePage">گزیده</h2>
                <DatePi setDateSelection={setDateSelection} />
            </div>
            
            <div className="TopTrader">
                <section>
                    {topBuyTraders===null?<MiniLoader />:topBuyTraders===false?<NoData />:<Bar options={topBuyOptions} data={topBuyTraders} />}
                    <h3>ده معامله گر با بیشترین حجم خرید</h3>
                </section>
                <section>
                    {topSellTraders===null?<MiniLoader />:topSellTraders==false?<NoData />:<Bar options={topSelOptions} data={topSellTraders} />}
                    <h3>ده معامله گر با بیشترین حجم فروش</h3>
                </section>
            </div>
            <div className="TopTrader">
                <section>
                    {newCamer===null?<MiniLoader />:newCamer===false?<NoData />:
                        <div className="chrNewOut">
                            <p className="chrTtl">حجم</p>
                            <div className="chrNum">
                                <p>{Math.round(newCamer.ratNewVol*100).toLocaleString()} %</p>
                                <p>{(newCamer.newVol).toLocaleString()}</p>
                            </div>
                            <div className="chrNewOutChld">
                                <div style={{width:(100-(100*newCamer.ratNewVol))+'%'}} className="chrNewOutChldLftGrn"></div>
                                <div style={{width:(100*newCamer.ratNewVol)+'%'}} className="chrNewOutChldRghGrn"></div>
                            </div>
                            <p className="chrTtl">تعداد</p>
                            <div className="chrNum">
                                <p>{Math.round(newCamer.ratNewCnt*100).toLocaleString()} %</p>
                                <p>{(newCamer.newCnt).toLocaleString()}</p>
                            </div>
                            <div className="chrNewOutChld">
                                <div style={{width:(100-(100*newCamer.ratNewCnt))+'%'}} className="chrNewOutChldLftGrn"></div>
                                <div style={{width:(100*newCamer.ratNewCnt)+'%'}} className="chrNewOutChldRghGrn"></div>
                            </div>
                        </div>
                    }
                    <h3>معاله گران تازه وارد</h3>
                </section>
                <section>
                    {newCamer===null?<MiniLoader />:newCamer==false?<NoData />:
                        <div className="chrNewOut">
                        <p className="chrTtl">حجم</p>
                        <div className="chrNum">
                            <p>{Math.round(newCamer.ratOutVol*100).toLocaleString()} %</p>
                            <p>{(newCamer.outVol).toLocaleString()}</p>
                        </div>
                        <div className="chrNewOutChld">
                            <div style={{width:(100-(100*newCamer.ratOutVol))+'%'}}className="chrNewOutChldLftRed"></div>
                            <div style={{width:(100*newCamer.ratOutVol)+'%'}} className="chrNewOutChldRghRed"></div>
                        </div>
                        <p className="chrTtl">تعداد</p>
                        <div className="chrNum">
                            <p>{Math.round(newCamer.ratOutCnt*100).toLocaleString()} %</p>
                            <p>{(newCamer.outCnt).toLocaleString()}</p>
                        </div>
                        <div className="chrNewOutChld">
                            <div style={{width:(100-(100*newCamer.ratOutCnt))+'%'}} className="chrNewOutChldLftRed "></div>
                            <div style={{width:(100*newCamer.ratOutCnt)+'%'}} className="chrNewOutChldRghRed"></div>
                        </div>
                    </div>
                    }
                    <h3>معاله گران خروج کامل</h3>
                </section>
            </div>
            <div className="TopTrader">
                <section>
                    {topBuyBroker===null?<MiniLoader />:topBuyBroker===false?<NoData />:<Bar options={topBuyOptionsBroker} data={topBuyBroker} />}
                    <h3>کارگزاری ها با بیشترین حجم خرید</h3>
                </section>
                <section>
                    {topSellBroker===null?<MiniLoader />:topSellBroker==false?<NoData />:<Bar options={topSelOptionsBroker} data={topSellBroker} />}
                    <h3>کارگزاری ها با بیشترین حجم فروش</h3>
                </section>
            </div>
        </div>
    )
}

export default Dashboard
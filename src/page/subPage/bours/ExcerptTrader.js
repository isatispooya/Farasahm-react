

import { useParams } from "react-router-dom"
import MiniLoader from "../../../componet/Loader/miniLoader"
import NoData from "../../../componet/Loader/NoData"
import { useEffect, useState , useContext, useRef} from "react"
import GaugeMeter from "../../../componet/gauge"
import { TbBrandCashapp , TbReceiptTax} from "react-icons/tb";
import { GiWeight } from "react-icons/gi";
import { HiComputerDesktop } from "react-icons/hi2";
import { OnRun } from "../../../config/config";
import axios from "axios";
import { AccessContext } from "../../../config/accessContext"

const ExcerptTrader = () =>{
    const {code} = useParams()
    const [traderSelect, setTraderSelect] = useState(code)
    const [traderName, setTraderName] = useState(null)
    const [df, setDf] = useState({
        fee:{buy:0,sell:0},
        stations:[],
        status:{profit:0,profitRate:0,price_buy:0,price_sel:0,price_bef:0,price_bal:0,balance:0,volume_buy:0,volume_sel:0,volume_bef:0},
        status_1:{profit:0,profitRate:0,price_buy:0,price_sel:0,price_bef:0,price_bal:0,balance:0,volume_buy:0,volume_sel:0,volume_bef:0},
        status_2:{profit:0,profitRate:0,price_buy:0,price_sel:0,price_bef:0,price_bal:0,balance:0,volume_buy:0,volume_sel:0,volume_bef:0},
        status_3:{profit:0,profitRate:0,price_buy:0,price_sel:0,price_bef:0,price_bal:0,balance:0,volume_buy:0,volume_sel:0,volume_bef:0},
        status_6:{profit:0,profitRate:0,price_buy:0,price_sel:0,price_bef:0,price_bal:0,balance:0,volume_buy:0,volume_sel:0,volume_bef:0},
        status_12:{profit:0,profitRate:0,price_buy:0,price_sel:0,price_bef:0,price_bal:0,balance:0,volume_buy:0,volume_sel:0,volume_bef:0}
    })

    const access = useContext(AccessContext)


    const getDf = ()=>{
        axios({method:'POST',url:OnRun+'/excerpttrader',data:{access:access,trader:traderSelect}
        }).then(response=>{
            
            if(response.data.replay){

                setDf(response.data.dic)

            }else{
                setDf(false)
            }
        })
    }

    const codeToName = () =>{
        axios({method:'POST',url:OnRun+'/getprofiletrader',data:{access:access,code:traderSelect}
        }).then(response=>{
            if(response.data.replay){
                setTraderName(response.data.df)
            }
        })
    }

    useEffect(getDf,[])
    useEffect(codeToName,[])

  

    return(
        <div className="subPage tablePg">
            <div className="tls">
                <h2 className="titlePage">گزیده معامله گر</h2>
                {
                    traderName==null?
                    <h2 className="titlePage btntls">{code}</h2>
                    :
                    <h2 className="titlePage btntls">{traderName.fullName}</h2>
                }
            </div>
            <div className="dshbrd">
                <div className="revardColumns">
                    <div className="rowRevard">
                        <h4>کل</h4>
                        <div className="dtl">
                            <ul>
                                <li className="BluPrc">
                                    <p><GiWeight/></p>
                                    <p>حجم ابتدا</p>
                                    <p>{(df.status.volume_bef).toLocaleString()}</p>
                                </li>
                                <li className="PosPrc">
                                    <p><GiWeight/></p>
                                    <p>حجم خرید</p>
                                    <p>{(df.status.volume_buy).toLocaleString()}</p>
                                </li>
                                <li className="NegPrc">
                                    <p><GiWeight/></p>
                                    <p>حجم فروش</p>
                                    <p>{(df.status.volume_sel).toLocaleString()}</p>
                                </li>
                                <li className="BluPrc">
                                    <p><GiWeight/></p>
                                    <p>حجم مانده</p>
                                    <p>{(df.status.balance).toLocaleString()}</p>
                                </li>
                            </ul>
                            <ul>
                                <li className="BluPrc">
                                    <p><TbBrandCashapp/></p>
                                    <p>قیمت ابتدا</p>
                                    <p>{(df.status.price_bef).toLocaleString()}</p>
                                </li>
                                <li className="PosPrc">
                                    <p><TbBrandCashapp/></p>
                                    <p>قیمت خرید</p>
                                    <p>{(df.status.price_buy).toLocaleString()}</p>
                                </li>
                                <li className="NegPrc">
                                    <p><TbBrandCashapp/></p>
                                    <p>قیمت فروش</p>
                                    <p>{(df.status.price_sel).toLocaleString()}</p>
                                </li>
                                <li className="BluPrc">
                                    <p><TbBrandCashapp/></p>
                                    <p>قیمت فعلی</p>
                                    <p>{(df.status.price_bal).toLocaleString()}</p>
                                </li>
                            </ul>
                            <ul>
                                {df.stations.map(i=>{
                                    return(
                                        <li className="BluPrc" key={i}>
                                            <p><HiComputerDesktop/></p>
                                            <p>{i}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <ul>
                                <li className="PosPrc">
                                    <p><TbReceiptTax/></p>
                                    <p>کارمزد خرید</p>
                                    <p>{(df.fee.buy).toLocaleString()} M</p>
                                </li>
                                <li className="NegPrc">
                                    <p><TbReceiptTax/></p>
                                    <p>کارمزد فروش</p>
                                    <p>{(df.fee.sell).toLocaleString()} M</p>
                                </li>
                                <li className="BluPrc">
                                    <p><TbReceiptTax/></p>
                                    <p>کارمزد کل</p>
                                    <p>{(df.fee.buy + df.fee.sell).toLocaleString()} M</p>
                                </li>
                            </ul>

                        </div>
                        <GaugeMeter profit={df.status.profit} profitRate={df.status.profitRate}/>
                    </div>
                    {
                        !df.status_12.avalibale?null:
                        <div className="rowRevard">
                            <h4>یکساله</h4>
                            <div className="dtl dtlprd">
                                <ul>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم ابتدا</p>
                                        <p>{(df.status_12.volume_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم خرید</p>
                                        <p>{(df.status_12.volume_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم فروش</p>
                                        <p>{(df.status_12.volume_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم مانده</p>
                                        <p>{(df.status_12.balance).toLocaleString()}</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت ابتدا</p>
                                        <p>{(df.status_12.price_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت خرید</p>
                                        <p>{(df.status_12.price_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فروش</p>
                                        <p>{(df.status_12.price_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فعلی</p>
                                        <p>{(df.status_12.price_bal).toLocaleString()}</p>
                                    </li>
                                </ul>
                            </div>
                            <GaugeMeter profit={df.status_12.profit} profitRate={df.status_12.profitRate}/>
                        </div>
                    }
                    {
                        !df.status_6.avalibale?null:
                        <div className="rowRevard">
                            <h4>شش ماهه</h4>
                            <div className="dtl dtlprd">
                                <ul>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم ابتدا</p>
                                        <p>{(df.status_6.volume_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم خرید</p>
                                        <p>{(df.status_6.volume_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم فروش</p>
                                        <p>{(df.status_6.volume_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم مانده</p>
                                        <p>{(df.status_6.balance).toLocaleString()}</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت ابتدا</p>
                                        <p>{(df.status_6.price_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت خرید</p>
                                        <p>{(df.status_6.price_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فروش</p>
                                        <p>{(df.status_6.price_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فعلی</p>
                                        <p>{(df.status_6.price_bal).toLocaleString()}</p>
                                    </li>
                                </ul>
                            </div>
                            <GaugeMeter profit={df.status_6.profit} profitRate={df.status_6.profitRate}/>
                        </div>
                    }
                    {
                        !df.status_3.avalibale?null:
                        <div className="rowRevard">
                            <h4>سه ماهه</h4>
                            <div className="dtl dtlprd">
                                <ul>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم ابتدا</p>
                                        <p>{(df.status_3.volume_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم خرید</p>
                                        <p>{(df.status_3.volume_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم فروش</p>
                                        <p>{(df.status_3.volume_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم مانده</p>
                                        <p>{(df.status_3.balance).toLocaleString()}</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت ابتدا</p>
                                        <p>{(df.status_3.price_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت خرید</p>
                                        <p>{(df.status_3.price_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فروش</p>
                                        <p>{(df.status_3.price_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فعلی</p>
                                        <p>{(df.status_3.price_bal).toLocaleString()}</p>
                                    </li>
                                </ul>
                            </div>
                            <GaugeMeter profit={df.status_3.profit} profitRate={df.status_3.profitRate}/>
                        </div>
                    }
                    {
                        !df.status_2.avalibale?null:
                        <div className="rowRevard">
                            <h4>دو ماهه</h4>
                            <div className="dtl dtlprd">
                                <ul>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم ابتدا</p>
                                        <p>{(df.status_2.volume_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم خرید</p>
                                        <p>{(df.status_2.volume_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم فروش</p>
                                        <p>{(df.status_2.volume_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم مانده</p>
                                        <p>{(df.status_2.balance).toLocaleString()}</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت ابتدا</p>
                                        <p>{(df.status_2.price_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت خرید</p>
                                        <p>{(df.status_2.price_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فروش</p>
                                        <p>{(df.status_2.price_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فعلی</p>
                                        <p>{(df.status_2.price_bal).toLocaleString()}</p>
                                    </li>
                                </ul>
                            </div>
                            <GaugeMeter profit={df.status_2.profit} profitRate={df.status_2.profitRate}/>
                        </div>
                    }

                    {
                        !df.status_1.avalibale?null:
                        <div className="rowRevard">
                            <h4>یکماهه</h4>
                            <div className="dtl dtlprd">
                                <ul>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم ابتدا</p>
                                        <p>{(df.status_1.volume_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم خرید</p>
                                        <p>{(df.status_1.volume_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم فروش</p>
                                        <p>{(df.status_1.volume_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><GiWeight/></p>
                                        <p>حجم مانده</p>
                                        <p>{(df.status_1.balance).toLocaleString()}</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت ابتدا</p>
                                        <p>{(df.status_1.price_bef).toLocaleString()}</p>
                                    </li>
                                    <li className="PosPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت خرید</p>
                                        <p>{(df.status_1.price_buy).toLocaleString()}</p>
                                    </li>
                                    <li className="NegPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فروش</p>
                                        <p>{(df.status_1.price_sel).toLocaleString()}</p>
                                    </li>
                                    <li className="BluPrc">
                                        <p><TbBrandCashapp/></p>
                                        <p>قیمت فعلی</p>
                                        <p>{(df.status_1.price_bal).toLocaleString()}</p>
                                    </li>
                                </ul>
                            </div>
                            <GaugeMeter profit={df.status_1.profit} profitRate={df.status_1.profitRate}/>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}


export default ExcerptTrader
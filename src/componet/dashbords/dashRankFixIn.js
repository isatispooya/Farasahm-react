import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"
import MiniLoader from "../Loader/miniLoader"
import { BsAwardFill } from "react-icons/bs";

const DashRnkFixIn = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)



    const get = () =>{
        axios.post(OnRun+'/getrankfixin',{access:access})
        .then(response=>{

            setDic(response.data.df)

        })
    }


    useEffect(get,[])

    return(
        <div className="dshRnk dshfixdv">
            {
                dic==null?
                <MiniLoader/>
                :
                <>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>هفته</h1>
                            <h2>{dic.ret_ytm_7}</h2>
                            <h3>{dic.ret_ytm_7_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_7/dic.ret_ytm_7_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>دوهفته</h1>
                            <h2>{dic.ret_ytm_14}</h2>
                            <h3>{dic.ret_ytm_14_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_14/dic.ret_ytm_14_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>ماه</h1>
                            <h2>{dic.ret_ytm_30}</h2>
                            <h3>{dic.ret_ytm_30_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_30/dic.ret_ytm_30_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>سه ماه</h1>
                            <h2>{dic.ret_ytm_90}</h2>
                            <h3>{dic.ret_ytm_90_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_90/dic.ret_ytm_90_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>شش ماه</h1>
                            <h2>{dic.ret_ytm_180}</h2>
                            <h3>{dic.ret_ytm_180_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_180/dic.ret_ytm_180_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>یکسال</h1>
                            <h2>{dic.ret_ytm_365}</h2>
                            <h3>{dic.ret_ytm_365_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_365/dic.ret_ytm_365_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                    <div className="lineGauge">
                        <div className="rank">
                            <h1>دوسال</h1>
                            <h2>{dic.ret_ytm_730}</h2>
                            <h3>{dic.ret_ytm_730_count}/</h3>
                        </div>
                        <div className="meter">
                            <p style={{'margin-left':((1-(dic.ret_ytm_730/dic.ret_ytm_730_count))*100).toString()+'%'}}><BsAwardFill /></p>
                        </div>
                    </div>
                </>

            }

        </div>
    )
}

export default DashRnkFixIn

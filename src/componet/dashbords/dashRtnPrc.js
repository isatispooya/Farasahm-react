import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"
import MiniLoader from "../Loader/miniLoader"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

const DashRtnPrc = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)
    const [period, setPeriod] = useState('ماهانه')


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      

    const get = () =>{
        axios.post(OnRun+'/getretrnprice',{access:access, period:period})
        .then(response=>{
            var lab = response.data.df.dateInt
            console.log(lab)
            setDic({
                lab,
                datasets: [
                    {
                        label: 'YTM',
                        data: response.data.df.YTM,
                        backgroundColor: 'rgb(183, 75, 175, 0.5)',
                        borderColor: 'rgb(183, 75, 175)'
                    }
                ]
            })
        })
    }

    const Options = {
        responsive: true,
        aspectRatio:4,
        plugins: {
            legend: {
                display:true,
                title: {display: true,text:'ارزش دارایی ها'},
                tooltip:{backgroundColor:'#273bb0'}
            },
        },
    }

    useEffect(get,[period])

    return(
        <div>
            {
                dic==null?
                <MiniLoader/>:
                <Line options={Options} data={dic} />

            }
            <select onChange={(e)=>setPeriod(e.target.value)} value={period}>
                <option value='روزانه'>روزانه</option>
                <option value='هفتگی'>هفتگی</option>
                <option value='ماهانه'>ماهانه</option>
                <option value='فصلی'>فصلی</option>
            </select>
        </div>
    )
}

export default DashRtnPrc

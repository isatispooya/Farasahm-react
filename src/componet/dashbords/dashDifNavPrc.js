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

const DashDifNavPrc = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)
    const [period, setPeriod] = useState('ماه')


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
        axios.post(OnRun+'/getdiffnavprc',{access:access,period:period})
        .then(response=>{
            console.log(response.data.df)
            var lab = response.data.df.dateInt
            setDic({
                lab,
                datasets: [
                    {
                        label: 'قیمت',
                        data: response.data.df.close_price,
                        backgroundColor: 'rgb(53, 162, 235, 0.5)',
                        borderColor: 'rgb(53, 162, 235)'
                    },
                    {
                        label: 'nav',
                        data: response.data.df.nav,
                        backgroundColor: 'rgb(53, 210, 70, 0.5)',
                        borderColor: 'rgb(53, 210, 70)'
                    },
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
                <option value='ماه'>ماه</option>
                <option value='فصل'>فصل</option>
                <option value='شش ماه'>شش ماه</option>
                <option value='سال'>سال</option>
                <option value='همه'>همه</option>
            </select>
        </div>
    )
}

export default DashDifNavPrc



import axios from "axios"
import { OnRun } from "../../config/config"
import { useContext, useEffect, useState } from "react"
import { AccessContext } from "../../config/accessContext"
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
    BarElement,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';


const StaticOwnerInComp = () =>{
    const access = useContext(AccessContext)
    const [df, setDf] = useState(null)


    useEffect(() => {
        ChartJS.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          Title,
          Tooltip,
          Legend,
          BarElement 
        );
      }, []);
      

    const get = () =>{
        axios.post(OnRun+'/staticownerincomp',{access:access})
        .then(response=>{
            var lab = response.data.df.dateInt
            setDf({
                lab,
                datasets: [
                    {
                        label: 'حجم کل معاملات',
                        data: response.data.df.trade_volume,
                        backgroundColor: 'rgb(53, 162, 235, 0.5)',
                        borderColor: 'rgb(53, 162, 235)'
                    },
                    {
                        label: 'خرید ایساتیس',
                        data: response.data.df.Volume_Buy,
                        backgroundColor: 'rgb(53, 210, 70, 0.5)',
                        borderColor: 'rgb(53, 210, 70)'
                    },
                    {
                        label: 'فروش ایساتیس',
                        data: response.data.df.Volume_Sel,
                        backgroundColor: 'rgb(210, 53, 70, 0.5)',
                        borderColor: 'rgb(210, 53, 70)'
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

    useEffect(get, [])

    return(
        <div className="dshfixdv">
            {
                df==null?
                <MiniLoader/>:
                <Line options={Options} data={df} />

            }
        </div>
    )
}


export default StaticOwnerInComp
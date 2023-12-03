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
  import { Bar } from 'react-chartjs-2';

const DashOnwer = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)



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
        axios.post(OnRun+'/getonwerfix',{access:access})
        .then(response=>{
            var lab = response.data.df.CustomerTitle
            console.log(lab)
            setDic({
                lab,
                datasets: [
                    {
                        label: 'حجم',
                        data: response.data.df.Volume,
                        backgroundColor: '#599fd9',
                        borderColor: '#599fd9',
                        borderRadius:'15'
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

    useEffect(get,[])

    return(
        <div>
            {
                dic==null?
                <MiniLoader/>:
                <Bar options={Options} data={dic} />
            }
        </div>
    )
}

export default DashOnwer

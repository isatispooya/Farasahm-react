import { useState ,useContext, useEffect} from "react"
import { AccessContext } from "../../config/accessContext"
import axios from "axios"
import { OnRun } from "../../config/config"
import MiniLoader from "../Loader/miniLoader"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


const DashRatFixAsset = () =>{
    const access = useContext(AccessContext)
    const [dic, setDic] = useState(null)


    ChartJS.register(ArcElement, Tooltip, Legend);

    const get = () =>{
        axios.post(OnRun+'/getrateassetfixincom',{access:access})
        .then(response=>{
            var lab = response.data.lab
            setDic({
                labels: lab,
                datasets: [{
                    data: response.data.lst,
                    backgroundColor: [
                        'rgba(201, 99, 92, 0.5)',
                        'rgba(54, 162, 195, 0.5)',
                        'rgba(255, 165, 86, 0.5)',
                        'rgba(75, 130, 192, 0.5)',
                    ],
                    borderColor: [
                        'rgba(201, 99, 92, 1)',
                        'rgba(54, 162, 195, 1)',
                        'rgba(255, 165, 86, 1)',
                        'rgba(75, 130, 192, 1)',
                    ],
                    borderWidth: 1,
                }]
            });            
        })
    }

    const Options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                title: { display: false, text: 'ارزش دارایی ها' },
                tooltip: { backgroundColor: '#273bb0' }
            }
        },
    };
    
    
    

    useEffect(get,[])
    return(
        <div className="pie">
            <h1>نسبت دارایی ها</h1>
            {
                dic==null?
                <MiniLoader/>:
                <Pie options={Options} data={dic} />
            }
        </div>
    )
}

export default DashRatFixAsset

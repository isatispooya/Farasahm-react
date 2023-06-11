import axios from "axios"
import { getCookie } from "../../componet/cookie/cookie"
import { OnRun } from "../../config/config"
import { useEffect } from "react"
import { useNavigate  } from 'react-router-dom'

const Manegment = () =>{
    const Navigate = useNavigate()
    const id = getCookie('id')

    const AccessCheck = () =>{
        if(id){axios({method:'POST',url:OnRun+'/access',data:{id:id}
            }).then(response=>{
                if(!response.data.admin){
                    Navigate('/')
                }
            })
        }
    }


    const handleSyncBoursi = () =>{
        axios({method:'POST',url:OnRun+'/syncboursi',data:{id:id}
        }).then(response=>{
            if(response.data.replay){
                alert('همگام سازی با سرده گذاری انجام شد')
            }
        })
    }

    const handleSyncBook = () =>{
        axios({method:'POST',url:OnRun+'/syncbook',data:{id:id}
        }).then(response=>{
            if(response.data.replay){
                alert('همگام سازی با دفتر سهام انجام شد')
            }
        })
    }

    useEffect(AccessCheck,[])

    return(
        <div className="Manegment">
            <div className="row">
                <h6>هنگام سازی افراد</h6>
                <div className="body">
                    <button onClick={handleSyncBoursi}>با سپرده گذاری</button>
                    <button onClick={handleSyncBook}>با دفاتر سهام</button>
                </div>
            </div>
        </div>

    )
}


export default Manegment
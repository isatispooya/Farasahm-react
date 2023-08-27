import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { menuFullList } from "../../config/iconList";
import { BsDashSquare, BsPlusSquareFill ,BsNodePlusFill ,BsNodeMinus} from "react-icons/bs";

const Menu = (props) =>{
    const [menu, setMenu] =useState(null)
    const Navigate = useNavigate()

    const toggleActMenu = (index) =>{
        const updatedMenu = [...menu];
        Navigate(updatedMenu[index].url)

    }

    useEffect(()=>{
        if (props.access.menu) {
            setMenu(props.access.menu)
        }
    },[props])
    return(
        <div className="Menu">
            <div className="title">
                <p>منو</p>
            </div>
            {
                menu==null || menu==undefined?null:
                menu.map((item, index)=>{
                    if (item['url']!='update'){
                        return(
                            <div key={index} onClick={()=>toggleActMenu(index)} className="itemMenu" >
                                {
                                    item['sub'].length>0?
                                    <p>{menuFullList[item['url']]}</p>
                                    :<p>{menuFullList[item['url']]}</p>
                                }
                                <h3>{item['name']}</h3>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}


export default Menu
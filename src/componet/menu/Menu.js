import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { menuFullList } from "../../config/iconList";

const Menu = (props) =>{
    const [menu, setMenu] =useState(null)
    const [menuOpen, setMenuTop] = useState([])
    const Navigate = useNavigate()

    const toggleActMenu = (index) =>{
        const updatedMenu = [...menu];
        if (updatedMenu[index].sub.length==0){
            Navigate(updatedMenu[index].url)
        }else if (menuOpen.includes(updatedMenu[index].url)) {
            setMenuTop((prevMenu) => prevMenu.filter((menuItem) => menuItem !== updatedMenu[index].url));
        }else{
            setMenuTop((prevMenu) => [...prevMenu, updatedMenu[index].url]);
        }
    }

    const toggleActMenuSub = (index,indexj) =>{
        const updatedMenu = [...menu];
        Navigate(updatedMenu[index]['sub'][indexj].url)
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
                            <div key={index} className="itemMenu subMenu" >
                                {
                                    item['sub'].length>0?
                                        <>
                                            <div key={index} className="itemMenu" >
                                                <p>{menuFullList[item['url']]}</p>
                                                <h3 onClick={()=>toggleActMenu(index)}>{item['name']}</h3>
                                            </div>
                                            {
                                                menuOpen.includes(item['url'])?
                                                <div className="sub">
                                                    {
                                                        menu[index]['sub'].map((itemj, indexj)=>{
                                                            return(
                                                                <div key={indexj}className="itemMenu" >
                                                                    <p>{menuFullList[itemj['url']]}</p>
                                                                    <h3 onClick={()=>toggleActMenuSub(index, indexj)} >{itemj['name']}</h3>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                :null
                                            }
                                        </>
                                    :
                                        <div className="itemMenu" >
                                            <p>{menuFullList[item['url']]}</p>
                                            <h3 key={index} onClick={()=>toggleActMenu(index)} >{item['name']}</h3>
                                        </div>
                                    
                                }
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}


export default Menu
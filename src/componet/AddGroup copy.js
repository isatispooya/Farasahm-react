import { useState , useEffect } from "react";
import { AiOutlineUserAdd , AiOutlineUserDelete } from "react-icons/ai";
import { OnRun } from "../config/config";
import axios from "axios";

const AddGroup = (props) =>{
    const [codes , setCodes] = useState(null)
    const [members , setMembers] = useState([])
    const [member , setMember] = useState('')
    const [nameGroup , setNameGroup] = useState('')

    const getCodes = () =>{
        if(props.access){
            axios({method:'POST', url:OnRun+'/getallname',data:{access:props.access}
            }).then(response=>{
                if(response.data.replay){
                    setCodes(response.data.df)
                }
            })
        }

    }

    const addMember = () =>{
        if(!members.includes(member) && member){
            setMembers([...members,member])
            setMember('')
        }
    }

    const dropMember = (inp) =>{
        setMembers(members.filter((element)=>{ return element!=inp}))

    }

    const setGrouping = () =>{
        if (nameGroup=='') {alert('نام گروه را پر کنید')
        }else if (members.length==0) {alert('لطفا عضو یا اعضای گروه را اضافه کنید')
        }else{
            axios({method:'POST', url:OnRun+'/setgrouping', data:{access:props.access, name:nameGroup,members:members}
            }).then(response=>{
                if(response.data.replay){
                    alert('ثبت شد')
                    setNameGroup('')
                    setMember('')
                    setMembers([])
                    props.setAddGroupShow(false)
                }else{
                    alert(response.data.msg)
                }
            })
        }
    }


    useEffect(getCodes,[])
    if(props.addGroupShow){
        return(
            <div className="formPopUp">
                <div className="fields">
                    <div className="field">
                        <input value={nameGroup} onChange={(e)=>setNameGroup(e.target.value)} type="text" id="namegroup"/>
                        <label>نام گروه</label>
                    </div>
                    {
                        members.map(i=>{
                            return(
                                <div key={i} className="field">
                                    <p onClick={()=>dropMember(i)} className="btnsvg btnsvgneg" ><AiOutlineUserDelete/></p>
                                    <label >{i}</label>
                                </div>
                            )
                        })
                    }
                    {
                        codes==null?null:
                        <div className="field">
                            <p onClick={addMember} className="btnsvg btnsvgpos" ><AiOutlineUserAdd/></p>
                            <input list='codes' type="text" value={member} onChange={(e)=>{setMember(e.target.value)}}/>
                            <datalist id="codes">
                                {codes.map(i=>{return(<option key={i.code} value={i.code}>{i.fullname}</option>)})}
                            </datalist>
                            <label>کد معاملاتی</label>
                        </div>
                    }


                </div>
                <div className="btnfield">
                    <button onClick={setGrouping} className="btnfieldpos">ثبت</button>
                    <button onClick={()=>props.setAddGroupShow(false)} className="btnfieldneg">لغو</button>
                </div>
            </div>
        )
    }
  
}

export default AddGroup
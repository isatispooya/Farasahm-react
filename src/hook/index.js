
import * as api from '../api/index'
import { useQuery } from 'react-query'




export const useCheckid = (id) =>{
    return useQuery('iduser', ()=>api.checkid(id))
}
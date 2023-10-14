import axios from 'axios'
import { OnRun } from '../config/config'


const client = axios.create({baseURL:OnRun})

export const checkid = async (id) => {
    const { data } = await client.post('/access', { id: id });
    return data;
  };
  
import { Holiday } from "../types/holiday";
import { api } from "@/lib/axios";


export const fetchHolidays = async (
  year: number,
  month: number,
): Promise<Holiday[]> => {
  const response = await api.get('/api/holidays',{
    params:{
      year,month
    }
  });

  return response.data.holidays.map((item:any)=>({
    date: Number(String(item.locdate).slice(-2)),
    name: item.dateName,
  }))
};

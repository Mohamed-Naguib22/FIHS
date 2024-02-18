import { useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
const useWeather = (city: string) => useQuery<WeatherStatus>({
    queryKey:['weather', city],
    queryFn:()=>api.get<WeatherStatus>(`/WeatherForecast/get-forecast?city=${city}`).then((res)=>res.data)
    
})
export default useWeather
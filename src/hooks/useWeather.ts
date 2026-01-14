import React, { useState } from "react";

//출력할 날씨 정보 타입 정의
type Weathers = {
  city: string;
  temp: number;
  humidity : number;
  wind: number;
  weatherDescription: string;
  weatherIcon : string;
  feels_like_temp : number;
}

//입력받을 날씨 데이터 정의
type WeatherApiResponse = {
  name: string;
  main: {
    temp: number;
    feels_like : number;
    humidity : number;
  }
  weather: {
    id:number;
    description: string;
  }[];
  wind: {
    speed: number;
  }
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;//날씨 API key

export const useWeather = () => {
    const [ weatherList, setWeatherList ] = useState<Weathers[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError] = useState<string | null>(null);

    const getWeather = (id:number) => {
        if(id === 800) return "sunny";
        if (id >= 801 && id <= 804) return "cloud";
        if (id >= 500 && id < 600) return "rain";
        if (id >= 600 && id < 700) return "snow";
        return "etc";
    }/* 날씨 아이디 값에 따라 weatherIcon 값을 정해주는 함수 */

     const fetchWeather =async (searchCity:string) => {

        try {
            setIsLoading(true);
            setError(null);

            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=kr`);
            
            if (!res.ok) {
            throw new Error("도시를 찾을 수 없습니다.");
            }
            
            const data: WeatherApiResponse = await res.json();

            const weather: Weathers = {
                city: data.name,
                temp: data.main.temp,
                humidity : data.main.humidity,
                wind: data.wind.speed,
                weatherDescription: data.weather[0].description,
                weatherIcon: getWeather(data.weather[0].id),
                feels_like_temp : data.main.feels_like,
            };

            setWeatherList((prev) => {
            const exists = prev.some((w) => w.city === weather.city);//이전 정보가 있는 지 확인
            return exists
            ? prev.map((w) => (w.city === weather.city ? weather : w))
            : [...prev, weather];
        });
        } catch (err) {
            setError(err instanceof Error ? err.message : "알 수 없는 에러")
        } finally {
            setIsLoading(false);
        }
     }
    return {isLoading, error, setError, fetchWeather, weatherList}
}
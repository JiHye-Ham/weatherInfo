import React, { useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";

export const Weather = () => {
    const [city, setCity] = useState<string>("");
      const {isLoading, error, setError, fetchWeather, weatherList} = useWeather();
    
      const isEnglish = (value:string) => /^[a-zA-Z]+$/.test(value);//입력값이 영어인지 확인하는 함수

      const handleSearch = () => {
        if(city.trim()==="")return;
        if(!isEnglish(city)) {
          setError("영어로 검색해주세요!");
          return;
        }
        fetchWeather(city);
        setCity("");
      }
      /*검색값이 빈칸, 영어가 아닌 입력값일 시 return하며 입력값인 도시 날씨를 검색할 수 있게 하는 함수 */
    
      useEffect(()=>{
        fetchWeather("Seoul");//처음 로딩시 서울 날씨가 보일 수 있게 설정
      },[]);

      return (
        <div className="p-2">
            <h1>날씨 정보</h1>
            <div className='flex gap-2 pt-2 mb-2'>
              <input
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              placeholder="검색할 도시"
              className='w-2/5 rounded bg-gray-200 text-sm'
              />
              <button className='p-1 rounded bg-black text-white text-sm' onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            {isLoading && <p>로딩 중...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* 날씨 검색 결과 */
              weatherList.map((w,i)=>(
                <div key={i} className='w-full pt-2 mt-2 mb-8'>
                  <div className='flex items-center gap-2 mb-2'>
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{w.city}</p>
                    <button className='p-1 rounded bg-black text-white text-xs' onClick={()=>fetchWeather(w.city)}>
                      <i className="fa-solid fa-arrows-rotate"></i>
                    </button>{/* 업데이트 버튼(클릭 시 다시 검색될 수 있도록 하는 버튼) */}
                  </div>
                  <div className='w-full p-4 border border-gray-300 rounded'>
                    <p>현재 날씨</p>
                    <div className="flex justify-evenly item-center mt-3 p-2">
                      <img src={`/${w.weatherIcon}.png`} alt="" />
                      <div className="flex flex-col gap-2 p-1 text-center">
                        <p className="text-xl font-bold">{w.temp}°C</p>
                        <p className="text-xs text-gray-400">{w.weatherDescription}</p>
                      </div>
                    </div>
                    <div className="flex justify-evenly item-center pt-2 pb-2 text-center">
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-400">습도</p>
                        <p>{w.humidity}%</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-400">풍속</p>
                        <p>{w.wind}m/s</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-400">체감온도</p>
                        <p>{w.feels_like_temp}°C</p>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
        </div>
      )
}
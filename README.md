# WeatherInfo

리액트와 타입스크립트, openWeather Api를 사용하여 검색창에 검색한 도시의 현재 날씨를 알려주는 웹 사이트입니다.<br />
배포 사이트 : https://weather-info-orpin-delta.vercel.app/

# 주요 기능 

도시 검색 시 검색된 결과 기능(오류일 시 오류메시지 출력), 검색된 현재 도시 날씨 정보 동적 생성

# 기술 스택 

React, typeScript, tailwind CSS, FontAwesome(아이콘)

# 폴더 구조
├─📂public<br />
│   ├─cloud.png<br />
│   ├─etc.png<br />
│   ├─sunny.png<br />
│   ├─rain.png<br />
│   ├─snow.png<br />
│   └─sunny.png<br />
└─📦src<br />
    ├─App.tsx<br />
    ├─index.tsx<br />
    ├─components<br />
    │	└─Weather.tsx<br />
    └─📂hooks<br />
        └─useWeather.ts<br />

# 설치 및 실행 방법

1. 프로젝트 클론
  git clone https://github.com/username/weatherInfo.git
  cd weatherInfo
  
2. 패키지 설치
   npm install
   
3. 환경변수 설정
  REACT_APP_WEATHER_API_KEY=your_api_key_here
*api키는 git-hub에 업로드하지 않았습니다.

4. 개발서버에서 실행
  npm run dev

5.브라우저에서 확인

# 개선 및 추가 기능 사항

도시 검색을 무조건 영어 도시명으로 입력하게 해 두었기에 한글검색 및 검색기능이 좀 더 편리하게 개선할 예정이며 추가적으로 지도를 추가하여 쉽게 지도 맵의 도시 클릭시 결과를 알 수 있게 개선할 예정입니다.

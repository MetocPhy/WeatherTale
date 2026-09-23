/* =========================================
   WEATHERTALE V2
   GLOBAL WEATHER SYSTEM
   ========================================= */


/* =========================================
   ELEMENTLER
   ========================================= */

const cityInput =
    document.getElementById("cityInput");

const searchButton =
    document.getElementById("searchButton");

const statusBox =
    document.getElementById("status");

const cityName =
    document.getElementById("cityName");

const countryName =
    document.getElementById("countryName");

const localTime =
    document.getElementById("localTime");

const temperature =
    document.getElementById("temperature");

const weatherIcon =
    document.getElementById("weatherIcon");

const description =
    document.getElementById("description");

const rpgMessage =
    document.getElementById("rpgMessage");

const maxTemp =
    document.getElementById("maxTemp");

const minTemp =
    document.getElementById("minTemp");

const feelsLike =
    document.getElementById("feelsLike");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const rainChance =
    document.getElementById("rainChance");

const hourlyForecast =
    document.getElementById("hourlyForecast");

const dailyForecast =
    document.getElementById("dailyForecast");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");


/* =========================================
   HAVA DURUMU KODLARI
   ========================================= */

function getWeatherInfo(code) {

    if (code === 0) {

        return {
            icon: "☀️",
            text: "Açık",
            message: "* Gökyüzü tamamen açık.",
            theme: "weather-sunny"
        };

    }

    if (code === 1 || code === 2) {

        return {
            icon: "🌤️",
            text: "Parçalı Bulutlu",
            message: "* Bulutlar gökyüzünde dolaşıyor.",
            theme: "weather-cloudy"
        };

    }

    if (code === 3) {

        return {
            icon: "☁️",
            text: "Kapalı",
            message: "* Gökyüzü bulutlarla kaplı.",
            theme: "weather-cloudy"
        };

    }

    if (code === 45 || code === 48) {

        return {
            icon: "🌫️",
            text: "Sisli",
            message: "* Görüş mesafesi biraz düşük.",
            theme: "weather-cloudy"
        };

    }

    if (code >= 51 && code <= 57) {

        return {
            icon: "🌦️",
            text: "Çiseleme",
            message: "* Hafif bir yağış var.",
            theme: "weather-rain"
        };

    }

    if (code >= 61 && code <= 67) {

        return {
            icon: "🌧️",
            text: "Yağmurlu",
            message: "* Yağmur yağıyor. Şemsiyeni unutma!",
            theme: "weather-rain"
        };

    }

    if (code >= 71 && code <= 77) {

        return {
            icon: "❄️",
            text: "Karlı",
            message: "* Kar yağışı başladı!",
            theme: "weather-snow"
        };

    }

    if (code >= 80 && code <= 82) {

        return {
            icon: "🌧️",
            text: "Sağanak Yağış",
            message: "* Sağanak yağış bekleniyor.",
            theme: "weather-rain"
        };

    }

    if (code >= 95) {

        return {
            icon: "⛈️",
            text: "Fırtınalı",
            message: "* Fırtına geliyor!",
            theme: "weather-storm"
        };

    }

    return {
        icon: "❓",
        text: "Bilinmiyor",
        message: "* Hava durumu bilinmiyor.",
        theme: "weather-cloudy"
    };
}


/* =========================================
   TEMAYI DEĞİŞTİR
   ========================================= */

function changeWeatherTheme(theme) {

    document.body.classList.remove(
        "weather-sunny",
        "weather-rain",
        "weather-cloudy",
        "weather-snow",
        "weather-storm"
    );

    document.body.classList.add(theme);
}


/* =========================================
   YEREL SAAT
   ========================================= */

function updateLocalTime(timezone) {

    try {

        const now =
            new Date();

        const formatter =
            new Intl.DateTimeFormat(
                "tr-TR",
                {
                    timeZone: timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
            );

        localTime.textContent =
            formatter.format(now);

    }

    catch {

        localTime.textContent =
            "--:--";

    }
}


/* =========================================
   ŞEHİR ARA
   ========================================= */

async function searchCity(city) {

    city = city.trim();


    if (city === "") {

        statusBox.innerHTML =
            "<span>›</span> Lütfen bir şehir adı yaz.";

        return;
    }


    try {

        statusBox.innerHTML =
            "<span>›</span> Şehir aranıyor...";


        /* ================================
           GEOCODING
           DÜNYA ÇAPINDA
        ================================= */

        const geoUrl =
            "https://geocoding-api.open-meteo.com/v1/search" +
            "?name=" +
            encodeURIComponent(city) +
            "&count=5" +
            "&language=tr" +
            "&format=json";


        const geoResponse =
            await fetch(geoUrl);


        if (!geoResponse.ok) {

            throw new Error(
                "Şehir servisi çalışmıyor."
            );

        }


        const geoData =
            await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            statusBox.innerHTML =
                "<span>›</span> Şehir bulunamadı.";

            return;
        }


        /* İlk uygun sonucu kullan */

        const location =
            geoData.results[0];


        statusBox.innerHTML =
            "<span>›</span> Hava durumu yükleniyor...";


        /* ================================
           WEATHER API
        ================================= */

        const weatherUrl =
            "https://api.open-meteo.com/v1/forecast" +

            "?latitude=" +
            location.latitude +

            "&longitude=" +
            location.longitude +

            "&current=" +
            "temperature_2m," +
            "relative_humidity_2m," +
            "apparent_temperature," +
            "weather_code," +
            "wind_speed_10m" +

            "&hourly=" +
            "temperature_2m," +
            "weather_code," +
            "precipitation_probability" +

            "&daily=" +
            "weather_code," +
            "temperature_2m_max," +
            "temperature_2m_min," +
            "sunrise," +
            "sunset," +
            "precipitation_probability_max" +

            "&timezone=auto" +

            "&forecast_days=7";


        const weatherResponse =
            await fetch(weatherUrl);


        if (!weatherResponse.ok) {

            throw new Error(
                "Hava durumu alınamadı."
            );

        }


        const data =
            await weatherResponse.json();


        /* =================================
           ANLIK HAVA
        ================================= */

        const current =
            data.current;


        const info =
            getWeatherInfo(
                current.weather_code
            );


        cityName.textContent =
            location.name.toUpperCase();


        countryName.textContent =
            location.country ||
            "Bilinmeyen ülke";


        temperature.textContent =
            Math.round(
                current.temperature_2m
            );


        weatherIcon.textContent =
            info.icon;


        description.textContent =
            info.text;


        rpgMessage.textContent =
            info.message;


        maxTemp.textContent =
            Math.round(
                data.daily.temperature_2m_max[0]
            ) + "°";


        minTemp.textContent =
            Math.round(
                data.daily.temperature_2m_min[0]
            ) + "°";


        feelsLike.textContent =
            Math.round(
                current.apparent_temperature
            ) + "°C";


        humidity.textContent =
            current.relative_humidity_2m +
            "%";


        wind.textContent =
            Math.round(
                current.wind_speed_10m
            ) +
            " km/h";


        rainChance.textContent =
            data.daily
                .precipitation_probability_max[0] +
            "%";


        /* =================================
           YEREL SAAT
        ================================= */

        updateLocalTime(
            data.timezone
        );


        /* =================================
           ARKA PLAN
        ================================= */

        changeWeatherTheme(
            info.theme
        );


        /* =================================
           SAATLİK TAHMİN
        ================================= */

        hourlyForecast.innerHTML = "";


        /*
           API'deki ilk 24 saat
        */

        for (
            let i = 0;
            i < 24;
            i++
        ) {

            const time =
                data.hourly.time[i];


            const temp =
                data.hourly.temperature_2m[i];


            const code =
                data.hourly.weather_code[i];


            const rain =
                data.hourly
                    .precipitation_probability[i];


            const hourInfo =
                getWeatherInfo(code);


            const hour =
                time.substring(
                    11,
                    16
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "hour-card";


            card.innerHTML = `

                <div class="time">
                    ${hour}
                </div>

                <div class="icon">
                    ${hourInfo.icon}
                </div>

                <div class="temp">
                    ${Math.round(temp)}°C
                </div>

                <div class="rain">
                    Yağış ${rain}%
                </div>

            `;


            hourlyForecast.appendChild(
                card
            );
        }


        /* =================================
           7 GÜNLÜK TAHMİN
        ================================= */

        dailyForecast.innerHTML = "";


        const dayNames = [

            "Pazar",
            "Pazartesi",
            "Salı",
            "Çarşamba",
            "Perşembe",
            "Cuma",
            "Cumartesi"

        ];


        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const date =
                new Date(
                    data.daily.time[i]
                );


            const dayName =
                dayNames[
                    date.getDay()
                ];


            const code =
                data.daily.weather_code[i];


            const dayInfo =
                getWeatherInfo(code);


            const high =
                Math.round(
                    data.daily
                        .temperature_2m_max[i]
                );


            const low =
                Math.round(
                    data.daily
                        .temperature_2m_min[i]
                );


            const rain =
                data.daily
                    .precipitation_probability_max[i];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "day-card";


            card.innerHTML = `

                <div class="day-name">
                    ${
                        i === 0
                            ? "BUGÜN"
                            : dayName
                    }
                </div>

                <div class="day-icon">
                    ${dayInfo.icon}
                </div>

                <div class="day-temp">
                    ${high}° / ${low}°
                </div>

                <div class="day-rain">
                    Yağış ${rain}%
                </div>

            `;


            dailyForecast.appendChild(
                card
            );
        }


        /* =================================
           GÜNEŞ
        ================================= */

        sunrise.textContent =
            data.daily.sunrise[0]
                .substring(11, 16);


        sunset.textContent =
            data.daily.sunset[0]
                .substring(11, 16);


        /* =================================
           BAŞARILI
        ================================= */

        statusBox.innerHTML =
            "<span>›</span> " +
            location.name +
            " hava durumu yüklendi!";


    }

    catch (error) {

        console.error(
            "WeatherTale:",
            error
        );


        statusBox.innerHTML =
            "<span>›</span> " +
            "Hava durumu alınamadı. Lütfen tekrar deneyin.";

    }
}


/* =========================================
   ARA BUTONU
   ========================================= */

searchButton.addEventListener(
    "click",
    function() {

        searchCity(
            cityInput.value
        );

    }
);


/* =========================================
   ENTER
   ========================================= */

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            searchCity(
                cityInput.value
            );

        }

    }
);


/* =========================================
   BAŞLANGIÇ
   ========================================= */

searchCity("Aydın");

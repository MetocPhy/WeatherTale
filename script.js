// ========================================
// WEATHERTALE
// GERÇEK HAVA DURUMU SİSTEMİ
// ========================================


// HTML ELEMENTLERİ

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const statusBox = document.getElementById("status");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weatherIcon");
const description = document.getElementById("description");
const rpgMessage = document.getElementById("rpgMessage");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const rainChance = document.getElementById("rainChance");

const hourlyForecast = document.getElementById("hourlyForecast");
const dailyForecast = document.getElementById("dailyForecast");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


// ========================================
// HAVA DURUMU KODLARI
// ========================================

function getWeatherInfo(code) {

    if (code === 0) {
        return {
            icon: "☀️",
            text: "Açık",
            message: "* Gökyüzü tamamen açık."
        };
    }

    if (code === 1 || code === 2) {
        return {
            icon: "🌤️",
            text: "Parçalı Bulutlu",
            message: "* Bulutlar ortaya çıktı."
        };
    }

    if (code === 3) {
        return {
            icon: "☁️",
            text: "Kapalı",
            message: "* Gökyüzü bulutlarla kaplı."
        };
    }

    if (code === 45 || code === 48) {
        return {
            icon: "🌫️",
            text: "Sisli",
            message: "* Görüş mesafesi biraz düşük."
        };
    }

    if (code >= 51 && code <= 57) {
        return {
            icon: "🌦️",
            text: "Çiseleme",
            message: "* Hafif bir yağış var."
        };
    }

    if (code >= 61 && code <= 67) {
        return {
            icon: "🌧️",
            text: "Yağmurlu",
            message: "* Yağmur yağıyor. Şemsiyeni unutma!"
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            icon: "❄️",
            text: "Karlı",
            message: "* Kar yağışı başladı!"
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            icon: "🌧️",
            text: "Sağanak Yağış",
            message: "* Sağanak yağış bekleniyor."
        };
    }

    if (code >= 95) {
        return {
            icon: "⛈️",
            text: "Gök Gürültülü Fırtına",
            message: "* Fırtına geliyor!"
        };
    }

    return {
        icon: "❓",
        text: "Bilinmiyor",
        message: "* Hava durumu bilinmiyor."
    };
}


// ========================================
// ŞEHİR ARAMA
// ========================================

async function searchCity(city) {

    if (!city || city.trim() === "") {

        statusBox.textContent =
            "* Lütfen bir şehir adı yaz.";

        return;
    }


    city = city.trim();


    try {

        statusBox.textContent =
            "* Şehir aranıyor...";


        // ŞEHİR BUL

        const geoUrl =
            "https://geocoding-api.open-meteo.com/v1/search" +
            "?name=" + encodeURIComponent(city) +
            "&count=1" +
            "&language=tr" +
            "&format=json" +
            "&countryCode=TR";


        const geoResponse =
            await fetch(geoUrl);


        if (!geoResponse.ok) {
            throw new Error("Şehir servisine bağlanılamadı.");
        }


        const geoData =
            await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            statusBox.textContent =
                "* Bu şehir bulunamadı.";

            return;
        }


        const location =
            geoData.results[0];


        statusBox.textContent =
            "* Hava durumu yükleniyor...";


        // ========================================
        // HAVA DURUMU API
        // ========================================

        const weatherUrl =
            "https://api.open-meteo.com/v1/forecast" +

            "?latitude=" + location.latitude +

            "&longitude=" + location.longitude +

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
            throw new Error("Hava durumu servisine bağlanılamadı.");
        }


        const data =
            await weatherResponse.json();


        // ========================================
        // ANA HAVA DURUMU
        // ========================================

        const current =
            data.current;


        const info =
            getWeatherInfo(
                current.weather_code
            );


        cityName.textContent =
            location.name.toUpperCase();


        countryName.textContent =
            location.country || "Türkiye";


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


        feelsLike.textContent =
            Math.round(
                current.apparent_temperature
            ) + "°C";


        humidity.textContent =
            current.relative_humidity_2m + "%";


        wind.textContent =
            Math.round(
                current.wind_speed_10m
            ) + " km/h";


        // BUGÜNÜN YAĞIŞ İHTİMALİ

        rainChance.textContent =
            data.daily
                .precipitation_probability_max[0]
            + "%";


        // ========================================
        // SAATLİK TAHMİN
        // ========================================

        hourlyForecast.innerHTML = "";


        // İlk 24 saat

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
                data.hourly.precipitation_probability[i];


            const hourInfo =
                getWeatherInfo(code);


            const hour =
                time.substring(11, 16);


            const card =
                document.createElement("div");


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
                    Yağış: ${rain}%
                </div>

            `;


            hourlyForecast.appendChild(card);
        }


        // ========================================
        // 7 GÜNLÜK TAHMİN
        // ========================================

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


            const info =
                getWeatherInfo(code);


            const maxTemp =
                Math.round(
                    data.daily.temperature_2m_max[i]
                );


            const minTemp =
                Math.round(
                    data.daily.temperature_2m_min[i]
                );


            const rain =
                data.daily
                    .precipitation_probability_max[i];


            const card =
                document.createElement("div");


            card.className =
                "day-card";


            card.innerHTML = `

                <div class="day-name">
                    ${i === 0 ? "BUGÜN" : dayName}
                </div>

                <div class="day-icon">
                    ${info.icon}
                </div>

                <div class="day-temp">
                    ${maxTemp}° / ${minTemp}°
                </div>

                <div class="day-rain">
                    Yağış: ${rain}%
                </div>

            `;


            dailyForecast.appendChild(card);
        }


        // ========================================
        // GÜNEŞ DOĞUM / BATIM
        // ========================================

        sunrise.textContent =
            data.daily.sunrise[0]
                .substring(11, 16);


        sunset.textContent =
            data.daily.sunset[0]
                .substring(11, 16);


        // ========================================
        // SON DURUM
        // ========================================

        statusBox.textContent =
            "* " +
            location.name +
            " hava durumu yüklendi!";


    }

    catch (error) {

        console.error(error);


        statusBox.textContent =
            "* Bir hata oluştu. İnternet bağlantını kontrol et.";

    }

}


// ========================================
// ARA BUTONU
// ========================================

searchButton.addEventListener(
    "click",
    function() {

        searchCity(
            cityInput.value
        );

    }
);


// ========================================
// ENTER TUŞU
// ========================================

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchCity(
                cityInput.value
            );

        }

    }
);


// ========================================
// ŞEHİR BUTONLARI
// ========================================

const cityButtons =
    document.querySelectorAll(
        ".city-button"
    );


cityButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const city =
                    button.dataset.city;


                cityInput.value =
                    city;


                searchCity(city);

            }
        );

    }
);


// ========================================
// SİTE AÇILINCA AYDIN'I GETİR
// ========================================

searchCity("Aydın");
// ========================================
// UNDERTALE TEMA EASTER EGG
// ========================================

cityInput.addEventListener("input", function () {

    const character = cityInput.value
        .trim()
        .toLowerCase();

    // Önce bütün temaları temizle
    document.body.classList.remove(
        "theme-sans",
        "theme-papyrus",
        "theme-undyne",
        "theme-toriel",
        "theme-asgore",
        "theme-alphys",
        "theme-mettaton",
        "theme-flowey",
        "theme-gaster"
    );

    // Yeni temayı seç
    if (character === "sans") {
        document.body.classList.add("theme-sans");
    }

    else if (character === "papyrus") {
        document.body.classList.add("theme-papyrus");
    }

    else if (character === "undyne") {
        document.body.classList.add("theme-undyne");
    }

    else if (character === "toriel") {
        document.body.classList.add("theme-toriel");
    }

    else if (character === "asgore") {
        document.body.classList.add("theme-asgore");
    }

    else if (character === "alphys") {
        document.body.classList.add("theme-alphys");
    }

    else if (character === "mettaton") {
        document.body.classList.add("theme-mettaton");
    }

    else if (character === "flowey") {
        document.body.classList.add("theme-flowey");
    }

    else if (character === "gaster") {
        document.body.classList.add("theme-gaster");
    }

});

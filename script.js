// ========================================
// WEATHERTALE - TEMEL JAVASCRIPT
// ========================================


// ELEMENTLER

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const temperature = document.getElementById("temperature");
const temperatureText = document.getElementById("temperatureText");
const temperatureFill = document.getElementById("temperatureFill");

const weatherIcon = document.getElementById("weatherIcon");
const weatherDescription = document.getElementById("weatherDescription");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

const themeButton = document.getElementById("themeButton");


// ÖRNEK ŞEHİRLER
// Gerçek API'yi sonraki aşamada bağlayacağız.

const cities = {

    "istanbul": {
        city: "ISTANBUL",
        country: "TÜRKİYE",
        temp: 22,
        feels: 23,
        humidity: 61,
        wind: 14,
        pressure: 1014,
        icon: "☀",
        description: "Açık"
    },

    "ankara": {
        city: "ANKARA",
        country: "TÜRKİYE",
        temp: 19,
        feels: 18,
        humidity: 42,
        wind: 11,
        pressure: 1017,
        icon: "☁",
        description: "Parçalı bulutlu"
    },

    "izmir": {
        city: "İZMİR",
        country: "TÜRKİYE",
        temp: 25,
        feels: 26,
        humidity: 48,
        wind: 16,
        pressure: 1013,
        icon: "☀",
        description: "Güneşli"
    },

    "new york": {
        city: "NEW YORK",
        country: "USA",
        temp: 24,
        feels: 25,
        humidity: 48,
        wind: 12,
        pressure: 1015,
        icon: "☀",
        description: "Açık"
    },

    "londra": {
        city: "LONDRA",
        country: "İNGİLTERE",
        temp: 17,
        feels: 16,
        humidity: 72,
        wind: 18,
        pressure: 1008,
        icon: "🌧",
        description: "Yağmurlu"
    }

};


// ŞEHİR ARAMA

function searchCity() {

    const search = cityInput.value
        .trim()
        .toLowerCase();


    if (search === "") {

        searchMessage.textContent =
            "Bir şehir yazmalısın.";

        return;
    }


    if (!cities[search]) {

        searchMessage.textContent =
            "Bu şehir henüz sistemde yok.";

        return;
    }


    const data = cities[search];


    // Mesajı temizle
    searchMessage.textContent = "";


    // Bilgileri değiştir

    cityName.textContent = data.city;

    countryName.textContent = data.country;

    temperature.textContent = data.temp;

    temperatureText.textContent =
        data.temp + "°C";

    feelsLike.textContent =
        data.feels + "°C";

    humidity.textContent =
        data.humidity + "%";

    wind.textContent =
        data.wind + " km/h";

    pressure.textContent =
        data.pressure + " hPa";

    weatherIcon.textContent =
        data.icon;

    weatherDescription.textContent =
        data.description;


    // Sıcaklık barı

    let percentage =
        ((data.temp + 10) / 50) * 100;


    if (percentage < 5) {
        percentage = 5;
    }

    if (percentage > 100) {
        percentage = 100;
    }


    temperatureFill.style.width =
        percentage + "%";


    // Sonuç bölümüne kaydır

    document.getElementById("weatherSection")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

}


// ARAMA BUTONU

searchButton.addEventListener(
    "click",
    searchCity
);


// ENTER İLE ARAMA

cityInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            searchCity();

        }

    }
);


// TEMA BUTONU

let lightMode = false;


themeButton.addEventListener(
    "click",
    function() {

        lightMode = !lightMode;


        if (lightMode) {

            document.body.style.background =
                "#eeeeee";

            document.body.style.color =
                "#111";

            themeButton.textContent =
                "☾";

        } else {

            document.body.style.background =
                "#050505";

            document.body.style.color =
                "white";

            themeButton.textContent =
                "☼";

        }

    }
);

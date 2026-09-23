/* ========================================
   WEATHERTALE
   MODERN UNDERTALE WEATHER DESIGN
======================================== */

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    min-height: 100vh;

    background:
        radial-gradient(
            circle at top,
            #171717 0%,
            #080808 45%,
            #030303 100%
        );

    color: #ffffff;

    font-family:
        "Courier New",
        monospace;

    overflow-x: hidden;
}


/* ========================================
   ARKA PLAN
======================================== */

.background-glow {
    position: fixed;

    width: 500px;
    height: 500px;

    left: 50%;
    top: -300px;

    transform: translateX(-50%);

    background: rgba(255, 255, 0, 0.06);

    filter: blur(80px);

    pointer-events: none;
}


/* ========================================
   ANA KUTU
======================================== */

.game-screen {
    width: 92%;
    max-width: 1100px;

    margin: 35px auto;
}


/* ========================================
   HEADER
======================================== */

.header {
    text-align: center;

    border: 3px solid #ffffff;

    padding: 35px 20px;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,0.04),
            rgba(255,255,255,0)
        );

    position: relative;
}

.logo {
    font-size: 46px;
    font-weight: bold;
    letter-spacing: 3px;
}

.logo span:last-child {
    color: #ffff00;
}

.heart {
    color: #ff3333;
    margin-right: 5px;
}

.subtitle {
    margin: 12px 0 0;

    color: #aaaaaa;

    letter-spacing: 4px;

    font-size: 14px;
}


/* ========================================
   ARAMA
======================================== */

.search-section {
    margin-top: 25px;
}

.search-box {
    display: flex;

    gap: 12px;
}

#cityInput {
    flex: 1;

    min-width: 0;

    padding: 18px 20px;

    background: #050505;

    color: #ffffff;

    border: 2px solid #777777;

    outline: none;

    font-family: inherit;

    font-size: 17px;

    transition: 0.2s;
}

#cityInput:focus {
    border-color: #ffff00;

    box-shadow:
        0 0 15px rgba(255,255,0,0.12);
}

#cityInput::placeholder {
    color: #666666;
}

#searchButton {
    padding: 0 30px;

    background: #ffff00;

    color: #000000;

    border: 2px solid #ffff00;

    font-family: inherit;

    font-weight: bold;

    cursor: pointer;

    transition: 0.2s;
}

#searchButton:hover {
    background: #ffffff;

    border-color: #ffffff;

    transform: translateY(-2px);
}

#searchButton:active {
    transform: translateY(0);
}

.search-hint {
    color: #666666;

    margin-top: 10px;

    font-size: 12px;
}


/* ========================================
   STATUS
======================================== */

.status {
    margin-top: 20px;

    padding: 14px 16px;

    border-left: 4px solid #ffff00;

    background: rgba(255,255,255,0.025);

    color: #ffff00;

    font-size: 14px;
}

.status span {
    font-size: 20px;

    margin-right: 5px;
}


/* ========================================
   HAVA DURUMU
======================================== */

#weather {
    margin-top: 20px;
}

.weather-card {
    border: 3px solid #ffffff;

    padding: 30px;

    background:
        linear-gradient(
            135deg,
            rgba(255,255,255,0.035),
            rgba(255,255,255,0.01)
        );
}


/* ========================================
   HAVA BAŞLIĞI
======================================== */

.weather-header {
    display: flex;

    justify-content: space-between;

    align-items: center;
}

.location-label {
    color: #777777;

    font-size: 12px;

    letter-spacing: 2px;

    margin-bottom: 8px;
}

.weather-header h1 {
    margin: 0;

    font-size: 38px;

    letter-spacing: 2px;
}

.weather-header p {
    margin: 7px 0 0;

    color: #999999;

    font-size: 15px;
}

.weather-icon {
    font-size: 85px;

    line-height: 1;
}


/* ========================================
   SICAKLIK
======================================== */

.temperature-row {
    display: flex;

    align-items: flex-start;

    margin-top: 25px;
}

.temperature {
    font-size: 90px;

    font-weight: bold;

    line-height: 0.9;

    color: #ffff00;
}

.temperature-unit {
    color: #aaaaaa;

    font-size: 25px;

    margin-left: 8px;

    margin-top: 5px;
}

.description {
    font-size: 23px;

    margin-top: 18px;
}


/* ========================================
   RPG MESAJI
======================================== */

.weather-message {
    margin-top: 20px;

    padding: 16px;

    border: 1px solid #555555;

    color: #ffff00;

    background: #080808;

    font-size: 14px;
}


/* ========================================
   DETAYLAR
======================================== */

.details {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 12px;

    margin-top: 25px;
}

.detail-card {
    display: flex;

    align-items: center;

    gap: 13px;

    min-width: 0;

    padding: 17px;

    border: 1px solid #555555;

    background: rgba(255,255,255,0.02);

    transition: 0.2s;
}

.detail-card:hover {
    border-color: #ffff00;

    transform: translateY(-2px);
}

.detail-icon {
    font-size: 25px;
}

.detail-card span {
    display: block;

    color: #777777;

    font-size: 10px;

    margin-bottom: 6px;

    letter-spacing: 1px;
}

.detail-card strong {
    font-size: 16px;

    white-space: nowrap;
}


/* ========================================
   BÖLÜM BAŞLIKLARI
======================================== */

.forecast-section {
    margin-top: 35px;
}

.section-title {
    display: flex;

    align-items: center;

    gap: 10px;

    border-bottom: 2px solid #444444;

    padding-bottom: 10px;

    margin-bottom: 15px;
}

.section-title span {
    color: #ff3333;

    font-size: 18px;
}

.section-title h2 {
    margin: 0;

    font-size: 18px;

    color: #ffff00;

    letter-spacing: 1px;
}


/* ========================================
   SAATLİK
======================================== */

.hourly-container {
    display: flex;

    gap: 10px;

    overflow-x: auto;

    padding: 5px 2px 15px;

    scrollbar-width: thin;
}

.hourly-container::-webkit-scrollbar {
    height: 6px;
}

.hourly-container::-webkit-scrollbar-track {
    background: #111111;
}

.hourly-container::-webkit-scrollbar-thumb {
    background: #555555;
}

.hour-card {
    flex: 0 0 125px;

    padding: 17px 12px;

    text-align: center;

    border: 1px solid #444444;

    background: #080808;

    transition: 0.2s;
}

.hour-card:hover {
    border-color: #ffff00;

    transform: translateY(-3px);
}

.hour-card .time {
    color: #ffff00;

    font-size: 13px;

    margin-bottom: 13px;
}

.hour-card .icon {
    font-size: 30px;

    margin-bottom: 12px;
}

.hour-card .temp {
    font-size: 19px;

    font-weight: bold;
}

.hour-card .rain {
    color: #777777;

    font-size: 11px;

    margin-top: 8px;
}


/* ========================================
   7 GÜNLÜK
======================================== */

.daily-container {
    display: flex;

    flex-direction: column;

    gap: 8px;
}

.day-card {
    display: grid;

    grid-template-columns:
        1.4fr
        70px
        1fr
        1fr;

    align-items: center;

    gap: 15px;

    padding: 16px 18px;

    border: 1px solid #444444;

    background: #080808;

    transition: 0.2s;
}

.day-card:hover {
    border-color: #ffff00;

    transform: translateX(3px);
}

.day-name {
    color: #ffff00;

    font-weight: bold;
}

.day-icon {
    font-size: 28px;
}

.day-temp {
    font-size: 17px;
}

.day-rain {
    color: #777777;

    text-align: right;

    font-size: 13px;
}


/* ========================================
   GÜNEŞ
======================================== */

.sun-section {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 12px;

    margin-top: 30px;
}

.sun-card {
    border: 1px solid #444444;

    padding: 22px;

    text-align: center;

    background: #080808;
}

.sun-card span {
    display: block;

    color: #777777;

    font-size: 12px;

    margin-bottom: 10px;
}

.sun-card strong {
    color: #ffff00;

    font-size: 23px;
}


/* ========================================
   FOOTER
======================================== */

footer {
    text-align: center;

    padding: 35px 0;

    color: #666666;
}

.footer-logo {
    color: #ffffff;

    font-weight: bold;

    letter-spacing: 2px;
}

.footer-logo:first-letter {
    color: #ff3333;
}

footer p {
    font-size: 12px;

    margin: 10px 0;
}

footer small {
    color: #444444;
}


/* ========================================
   MOBİL
======================================== */

@media (max-width: 750px) {

    .game-screen {
        width: 94%;

        margin: 15px auto;
    }

    .header {
        padding: 25px 15px;
    }

    .logo {
        font-size: 30px;

        letter-spacing: 1px;
    }

    .subtitle {
        font-size: 10px;

        letter-spacing: 2px;
    }

    .search-box {
        flex-direction: column;
    }

    #searchButton {
        min-height: 52px;
    }

    .weather-card {
        padding: 20px;
    }

    .weather-header h1 {
        font-size: 28px;
    }

    .weather-icon {
        font-size: 55px;
    }

    .temperature {
        font-size: 65px;
    }

    .details {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .detail-card {
        padding: 13px;
    }

    .day-card {
        grid-template-columns:
            1fr 50px 1fr;
    }

    .day-rain {
        grid-column: 1 / -1;

        text-align: left;
    }

    .sun-section {
        grid-template-columns: 1fr;
    }
}


/* ========================================
   KÜÇÜK TELEFONLAR
======================================== */

@media (max-width: 430px) {

    .details {
        grid-template-columns: 1fr;
    }

    .weather-header {
        align-items: flex-start;
    }

    .weather-icon {
        font-size: 45px;
    }

    .temperature {
        font-size: 58px;
    }
}

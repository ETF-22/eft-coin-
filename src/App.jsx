
import React, { useEffect, useState } from 'react';
import BuyButton from './components/BuyButton';
import CustomWalletButton from './components/CustomWalletButton';
import axios from 'axios';
import './style.css';

const App = () => {
  const [lang, setLang] = useState("en");
  const [solAmount, setSolAmount] = useState("");
  const [tokens, setTokens] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [solPriceUSD, setSolPriceUSD] = useState(null);

  const t = (key) => {
    const translations = {
      title: { en: "EFT Claim and Token now LIVE!", ar: "الآن إطلاق وتوزيع عملة EFT!" },
      countdownLabel: { en: "Presale ends in:", ar: "ينتهي الاكتتاب خلال:" },
      priceLabel: { en: "Current Token Price", ar: "السعر الحالي للتوكن" },
      placeholder: { en: "Enter amount USDT", ar: "أدخل المبلغ بالدولار USDT" },
      result: { en: "You will receive:", ar: "سوف تحصل على تقريباً:" },
      buy: { en: "Buy Now", ar: "اشترِ الآن" },
      days: { en: "Days", ar: "يوم" },
      hours: { en: "Hours", ar: "ساعة" },
      minutes: { en: "Minutes", ar: "دقيقة" },
      seconds: { en: "Seconds", ar: "ثانية" },
    };
    return translations[key][lang];
  };

  const monthlyPrices = {
    5: 0.00005,
    6: 0.00008,
    7: 0.0001,
    8: 0.00015,
    9: 0.0002
  };

  const currentMonth = new Date().getMonth();
  const currentPrice = monthlyPrices[currentMonth] || 0.0002;

  useEffect(() => {
    const targetDate = new Date("2025-07-01T00:00:00Z").getTime();
    const interval = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const amount = parseFloat(solAmount);
    if (!isNaN(amount)) {
      setTokens(amount / currentPrice);
    } else {
      setTokens(0);
    }
  }, [solAmount, currentPrice]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        setSolPriceUSD(res.data.solana.usd);
      } catch (err) {
        console.error('Error fetching SOL price:', err);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTimeComponents = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = String(Math.floor(totalSeconds / (3600 * 24))).padStart(2, '0');
    const hours = String(Math.floor((totalSeconds % (3600 * 24)) / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeComponents(timeLeft);

  return (
    <div className="overlay" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div style={{ position: 'absolute', top: '20px', right: '30px', display: 'flex', gap: '10px' }}>
        <a href="/founders"><button className="claim-top-btn">Founding Team</button></a>
        <CustomWalletButton />
        <button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="claim-top-btn">
          {lang === "en" ? "🇸🇦 AR" : "🇬🇧 EN"}
        </button>
      </div>

      <h1 className="title fade-in">{t("title")}</h1>

      <div className="timer-boxes fade-in">
        <div className="timer-box">{days}<div className="timer-label">{t("days")}</div></div>
        <div className="timer-box">{hours}<div className="timer-label">{t("hours")}</div></div>
        <div className="timer-box">{minutes}<div className="timer-label">{t("minutes")}</div></div>
        <div className="timer-box">{seconds}<div className="timer-label">{t("seconds")}</div></div>
      </div>

      <div className="price-banner fade-in">
        <span className="label">{t("priceLabel")}</span>
        <span className="value">: {currentPrice.toFixed(5)} <strong>EFT</strong></span>
      </div>

      {solPriceUSD && (
        <div style={{ color: '#fff', marginBottom: '10px' }}>SOL/USD: <strong>${solPriceUSD}</strong></div>
      )}

      <div className="purchase-section fade-in">
        <input
          type="number"
          className="input-field"
          placeholder={t("placeholder")}
          value={solAmount}
          onChange={(e) => setSolAmount(e.target.value)}
        />
        <p>{t("result")} <strong>{tokens.toFixed(2)} EFT</strong></p>
        <BuyButton amount={parseFloat(solAmount || 0)} />
      </div>
    </div>
  );
};

export default App;

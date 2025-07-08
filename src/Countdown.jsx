import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-08-01T00:00:00Z");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setExpired(true);
        clearInterval(interval);
      } else {
        const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (expired) {
    return (
      <div className="text-center text-2xl font-bold mb-8">
        <p className="text-red-500">Presale Ended</p>
      </div>
    );
  }

  return (
    <div className="text-center text-2xl font-bold mb-8 flex flex-col items-center">
      <div className="flex gap-4">
        <div className="bg-black/70 p-4 rounded-xl shadow-md">
          <p>{timeLeft.days}</p>
          <span className="text-sm">Days</span>
        </div>
        <div className="bg-black/70 p-4 rounded-xl shadow-md">
          <p>{timeLeft.hours}</p>
          <span className="text-sm">Hours</span>
        </div>
        <div className="bg-black/70 p-4 rounded-xl shadow-md">
          <p>{timeLeft.minutes}</p>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="bg-black/70 p-4 rounded-xl shadow-md">
          <p>{timeLeft.seconds}</p>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
} 

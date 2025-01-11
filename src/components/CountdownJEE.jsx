import React, { useState, useEffect } from 'react';

const CountdownJEE = () => {
    // Target date for JEE Main 2026 (Assumed to be 15th Jan 2026)
    const targetDate = new Date("2026-01-15T00:00:00");

    const [timeLeft, setTimeLeft] = useState({});

    // Update the countdown every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                clearInterval(interval);
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeLeft({
                    days,
                    hours,
                    minutes,
                    seconds
                });
            }
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-900 rounded-xl shadow-2xl w-80 mx-auto">
            <h2 className="text-3xl font-semibold text-white mb-6">JEE Mains 2026</h2>
            <div className="flex flex-col space-y-6 text-center">
                {/* Impactful Days Section */}
                <div className="flex flex-col items-center p-4 bg-red-500 rounded-lg shadow-lg animate-pulse">
                    <h3 className="text-6xl font-bold text-white">{timeLeft.days}</h3>
                    <p className="text-white text-xl">Days Left</p>
                </div>

                {/* Other Time Units */}
                <div className="flex space-x-6 text-center">
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold text-blue-300">{timeLeft.hours}</h3>
                        <p className="text-white">Hours</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold text-green-300">{timeLeft.minutes}</h3>
                        <p className="text-white">Minutes</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold text-purple-300">{timeLeft.seconds}</h3>
                        <p className="text-white">Seconds</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownJEE;

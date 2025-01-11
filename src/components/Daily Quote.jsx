import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const DailyQuote = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // Redirect to home after logout
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        // Fetching the quote using Axios with CORS Anywhere proxy
        axios.get("https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today")
            .then((response) => {
                // Extracting the quote and author from the response
                const quoteData = response.data[0]; // Assuming the response is an array
                setQuote(quoteData.q); // Quote text
                setAuthor(quoteData.a); // Author name
            })
            .catch((error) => {
                console.error("Error fetching the daily quote:", error);
                setQuote("Focus on your goals and let no distraction steer you away.");
                setAuthor("Anonymous");
            });
    }, []);

    return (
        <section className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                        JEE Analytics.
                        <span className="sm:block"> Stay Focused and Achieve Greatness. </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Harness the power of analytics to ace your JEE preparation. Keep calm, stay organized, and reach your IIT dream.
                    </p>

                    <div className="mt-8">
                        <blockquote className="italic text-lg text-gray-300">
                            "{quote}"
                            <span className="block mt-2 text-sm font-semibold text-gray-400">- {author}</span>
                        </blockquote>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {user ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                >
                                    Logout
                                </button>

                                <button
                                    onClick={() => navigate("/dataentry")}
                                    className="block w-full rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                >
                                    Data Entry
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                >
                                    Login
                                </Link>

                                <a
                                    className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                                    href="#"
                                >
                                    Learn More
                                </a>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DailyQuote;

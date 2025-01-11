import React, { useEffect, useState } from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { db, auth } from "../Firebase/config";
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function AIETMarksChart() {
    const [testScores, setTestScores] = useState([]);
    const [months, setMonths] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUID = user.uid;

                const fetchTestScores = async () => {
                    try {
                        const userTestData = collection(db, "users", userUID, "testData");
                        const q = query(userTestData, where("testType", "==", "AIET"), orderBy("timestamp"));
                        const querySnapshot = await getDocs(q);

                        if (querySnapshot.empty) {
                            setError("No test data available.");
                            setIsLoading(false);
                            return;
                        }

                        const scores = [];
                        const monthsArray = [];

                        querySnapshot.forEach((doc) => {
                            const data = doc.data();
                            scores.push(Number(data.marksSecured));

                            const timestamp = data.timestamp.toDate();
                            const month = timestamp.toLocaleString('default', { month: 'short' });
                            monthsArray.push(month);
                        });

                        setMonths(monthsArray);
                        setTestScores(scores);
                    } catch (error) {
                        console.error("Error fetching data from Firestore:", error);
                        setError("Failed to load data.");
                    } finally {
                        setIsLoading(false);
                    }
                };

                fetchTestScores();
            } else {
                setError("User not signed in.");
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    // Ensure months and testScores are of the same length
    const chartData =
        months.length === testScores.length
            ? testScores
            : testScores.slice(0, months.length);

    return (
        <LineChart
            width={600}
            height={400}
            series={[
                {
                    data: chartData.length > 0 ? chartData : [0], // Prevent empty data
                    label: 'Scores',
                    area: true,
                    showMark: false,
                    color: '#42a5f5',
                    opacity: 0.3,
                },
            ]}
            xAxis={[
                {
                    scaleType: 'point',
                    data: months.length > 0 ? months : ["N/A"], // Prevent empty x-axis
                    label: 'Months',
                },
            ]}
            yAxis={[{ label: 'Scores', min: 0, max: 300 }]}
            title="JEE Mains Monthly Mock Test Scores"
            sx={{
                [`& .${lineElementClasses.root}`]: {
                    display: 'none',
                },
            }}
        />
    );
}

import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { db, auth } from "../Firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

const MarksChart = ({ Subject }) => {
    const [marksData, setMarksData] = useState([]);
    const [totalTests, setTotalTests] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUID = user.uid;

                const fetchMarksData = async () => {
                    try {
                        const testsCollection = collection(db, "users", userUID, "testData");
                        const q = query(
                            testsCollection,
                            where("testType", "==", Subject),
                            orderBy("timestamp", "asc")
                        );
                        const querySnapshot = await getDocs(q);

                        const fetchedMarksData = querySnapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }));

                        const marks = fetchedMarksData.map((doc) => doc.marksSecured);
                        setMarksData(marks);
                        setTotalTests(marks.length);
                    } catch (error) {
                        console.error("Error fetching marks data: ", error);
                    }
                };

                fetchMarksData();
            } else {
                console.log("No user is signed in");
            }
        });

        return () => unsubscribe();  // Clean up the listener
    }, [Subject]);

    const xAxisData = Array.from({ length: totalTests }, (_, index) => index + 1);

    return (
        <div>
            <h2 className="font-bold text-cyan-700">{Subject}</h2>
            <LineChart
                xAxis={[{ data: xAxisData }]}
                series={[{ data: marksData }]}
                width={500}
                height={300}
            />
        </div>
    );
};

export default MarksChart;

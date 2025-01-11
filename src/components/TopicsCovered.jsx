import React, { useState, useEffect } from "react";
import { db } from "../Firebase/config"; // Firebase config file
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

const TopicsCovered = () => {
    // State to hold subjects data from Firestore
    const [subjects, setSubjects] = useState([]);

    // Fetch subjects data from Firestore
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "chaptersData")); // Replace 'subjects' with your collection name
                const subjectsData = querySnapshot.docs.map((doc) => ({
                    name: doc.data().subject,
                    progress: Math.round((doc.data().chaptersStudied / doc.data().totalChapters) * 1000) / 10,
                }));

                setSubjects(subjectsData); // Update the state with fetched data
            } catch (error) {
                console.error("Error fetching subjects: ", error); // Handle any errors
            }
        };

        fetchSubjects();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg font-bold text-center mb-4">JEE Topics Covered</h2>

            {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                    <div key={index} className="mb-6">
                        <p className="text-sm font-medium text-gray-700">
                            {`${subject.progress}% - ${subject.name}`}
                        </p>
                        <div className="mt-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${subject.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default TopicsCovered;

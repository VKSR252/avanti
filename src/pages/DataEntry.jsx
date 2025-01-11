import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/config'; // Firebase config
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'; // Firestore methods
import TestDataEntryForm from "../components/TestDataEntryForm";

const DataEntryForm = () => {
    const [subjects] = useState(["Physics", "Chemistry", "Math"]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [chaptersStudied, setChaptersStudied] = useState("");
    const [existingData, setExistingData] = useState(null); // To store the fetched data

    // Fetch existing data from Firestore when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "chaptersData"), where("subject", "==", selectedSubject));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // If data exists for the selected subject
                    querySnapshot.forEach((doc) => {
                        setChaptersStudied(doc.data().chaptersStudied);
                        setExistingData(doc.id); // Store the document ID to update later
                    });
                } else {
                    setChaptersStudied(""); // No data found, reset chapters studied
                    setExistingData(null); // No existing data to update
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (selectedSubject) {
            fetchData(); // Fetch data when a subject is selected
        }
    }, [selectedSubject]); // Trigger this effect when subject changes

    // Submit data to Firestore (either create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSubject || !chaptersStudied) {
            alert("Please select a subject and enter the number of chapters studied.");
            return;
        }

        const data = {
            subject: selectedSubject,
            chaptersStudied: chaptersStudied,
            timestamp: new Date(),
        };

        try {
            if (existingData) {
                // If data exists, update the document
                const docRef = doc(db, "chaptersData", existingData);
                await updateDoc(docRef, data);
                console.log("Document updated with ID: ", existingData);
            } else {
                // If no existing data, add a new document
                const docRef = await addDoc(collection(db, "chaptersData"), data);
                console.log("Document written with ID: ", docRef.id);
            }
        } catch (e) {
            console.error("Error adding or updating document: ", e);
        }
    };

    return (
        <>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
                <h2 className="text-2xl font-semibold text-center mb-6">Chapters Data Entry</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Chapters Studied</label>
                        <input
                            type="number"
                            value={chaptersStudied}
                            onChange={(e) => setChaptersStudied(e.target.value)}
                            min="1"
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
                <TestDataEntryForm />
            </div>
        </>
    );
};

export default DataEntryForm;

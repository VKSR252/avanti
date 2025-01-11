import React, { useState ,useEffect} from 'react';
import { auth, db } from '../Firebase/config'; // Import Firebase Auth & Firestore
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const TestDataEntryForm = () => {
    const [testType, setTestType] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState("");
    const [wrongAnswers, setWrongAnswers] = useState("");
    const [partialAnswers, setPartialAnswers] = useState("");
    const [skippedQuestions, setSkippedQuestions] = useState("");
    const [marksSecured, setMarksSecured] = useState(""); // State for Marks Secured
    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const userUid = user.uid; // You can now access the user UID
          console.log("User UID:", userUid);
          // You can store this UID or use it as needed
        } else {
          // No user is signed in
          console.log("No user is signed in");
        }
      });


    // Marks based on test type
    const testTypes = {
        "AIET": 300,
        "Physics": 100,
        "Chemistry": 100,
        "Mathematics": 100
    };

    const handleTestTypeChange = (e) => {
        const selectedTestType = e.target.value;
        setTestType(selectedTestType);
        // Set the total marks based on the selected test type
        setTotalMarks(testTypes[selectedTestType] || "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
            alert("Please log in to submit test data.");
            return;
        }
    
        const data = {
            testType,
            totalMarks,
            correctAnswers,
            wrongAnswers,
            partialAnswers,
            skippedQuestions,
            marksSecured,
            timestamp: new Date(),
        };
    
        try {
            // Store data under the logged-in user's UID
            const docRef = await addDoc(
                collection(db, "users", user.uid, "testData"),
                data
            );
            console.log("Test Data Submitted with ID: ", docRef.id);
            alert("Test data submitted successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to submit data. Please try again.");
        }
    };
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    
        return () => unsubscribe(); // Cleanup listener
    }, []);
    

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Test Data Entry</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Test Type</label>
                    <select
                        value={testType}
                        onChange={handleTestTypeChange}
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Test Type</option>
                        <option value="AIET">AIET</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                    <input
                        type="number"
                        value={totalMarks}
                        readOnly
                        disabled
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Correct Answers</label>
                    <input
                        type="number"
                        value={correctAnswers}
                        onChange={(e) => setCorrectAnswers(e.target.value)}
                        min="0"
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Wrong Answers</label>
                    <input
                        type="number"
                        value={wrongAnswers}
                        onChange={(e) => setWrongAnswers(e.target.value)}
                        min="0"
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Partial Answers</label>
                    <input
                        type="number"
                        value={partialAnswers}
                        onChange={(e) => setPartialAnswers(e.target.value)}
                        min="0"
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Skipped Questions</label>
                    <input
                        type="number"
                        value={skippedQuestions}
                        onChange={(e) => setSkippedQuestions(e.target.value)}
                        min="0"
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Marks Secured</label>
                    <input
                        type="number"
                        value={marksSecured}
                        onChange={(e) => setMarksSecured(e.target.value)} // Handle manual input
                        min="0"
                        required
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit Test Data
                </button>
            </form>
        </div>
    );
};

export default TestDataEntryForm;

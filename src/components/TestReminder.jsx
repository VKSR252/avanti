import React from "react";

const TestReminder = () => {
    return (
        <div className="fixed inset-x-0 bottom-0 p-4">
            <div className="rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg">
                <p className="text-center text-sm font-medium">
                    Upcoming Test Alert!
                    <a href="#" className="inline-block underline"> Check out this new course! </a>
                </p>
            </div>
        </div>
    );
};

export default TestReminder;

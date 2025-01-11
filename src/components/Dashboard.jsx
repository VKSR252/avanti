import React from "react";

import DailyQuote from "./Daily Quote";
import TopicsCovered from "./TopicsCovered";
import MarksChart from "./MarksChart";
import AIETMarksChart from "./AIETMarksChart";
import CountdownJEE from "./CountdownJEE";

const Dashboard = () => {

    return (
        <>
            <DailyQuote/>

            <div className="dashboard-container p-8">
            <h1 className="text-3xl font-semibold mb-6">Welcome</h1>
                <CountdownJEE/>
                <TopicsCovered/>

            {/* Study Progress */}
                <div className={`
    marks-chart-container 
    mb-8 
    grid 
    grid-cols-1  /* Ensure one chart per row */
    gap-8  /* Spacing between charts */
    p-6 
    border 
    rounded-lg 
    shadow-sm
    place-items-center
`}>
                    <MarksChart Subject={"Mathematics"}/>
                    <MarksChart Subject={"Physics"}/>
                    <MarksChart Subject={"Chemistry"}/>
                    <AIETMarksChart/>
                </div>


        </div></>

    );
};

export default Dashboard;

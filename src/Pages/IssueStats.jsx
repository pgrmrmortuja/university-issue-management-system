import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import PrivateRoute from "../../src/Routes/PrivateRoute"

const IssueStats = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch("https://university-issue-management-system.vercel.app/issue-stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error(err));
    }, []);



    const statItems = [
        { title: "Total Issues", value: stats.total, color: "bg-blue-100 text-blue-700" },
        { title: "Verified", value: stats.verified, color: "bg-green-100 text-green-700" },
        { title: "Pending", value: stats.pending, color: "bg-yellow-100 text-yellow-700" },
        { title: "Rejected", value: stats.rejected, color: "bg-red-100 text-red-700" },
        { title: "Solved", value: stats.solved, color: "bg-purple-100 text-purple-700" },
    ];

    return (
        <PrivateRoute>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-[1200px] mx-auto mt-10 mb-10">
                {statItems.map((item, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl shadow-md flex flex-col items-center justify-center ${item.color}`}
                    >
                        <h3 className="text-4xl font-bold">
                            <CountUp end={item.value || 0} duration={2.5} />
                        </h3>
                        <p className="text-lg font-medium mt-2">{item.title}</p>
                    </div>
                ))}
            </div>
        </PrivateRoute>

    );
};

export default IssueStats;
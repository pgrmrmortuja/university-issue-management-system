import React, { useEffect, useState } from "react";
import PrivateRoute from "../../src/Routes/PrivateRoute"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

const COLORS = ["#8884d8", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2"];

const IssueStatsChart = () => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/issue-stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error(err));
    }, []);

    const data = [
        { name: "Total", value: stats.total || 0 },
        { name: "Verified", value: stats.verified || 0 },
        { name: "Pending", value: stats.pending || 0 },
        { name: "Rejected", value: stats.rejected || 0 },
        { name: "Solved", value: stats.solved || 0 },
    ];

    return (
        <PrivateRoute>
            <div className="max-w-[1200px] mx-auto mt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-700">
                        Issue Distribution (Pie Chart)
                    </h2>
                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-700">
                        Issue Summary (Bar Chart)
                    </h2>
                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </PrivateRoute>


    );
};

export default IssueStatsChart;
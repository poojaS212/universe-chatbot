import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

 
const Chart = ({ data }) => {
    console.log("🚀 ~ file: Chart.js:5 ~ Chart ~ last7DaysData with props:", data)
    const [daysData, setDaysData] = useState([])

    useEffect(() => {
        setDaysData(data)
    }, [data])

    // if (data) {
    //     
    // }
 
    // Sample data
    // const data = [
    //     { name: 'Geeksforgeeks', students: 400 },
    //     { name: 'Technical scripter', students: 700 },
    //     { name: 'Geek-i-knack', students: 200 },
    //     { name: 'Geek-o-mania', students: 1000 }
    // ];
 
 
    return (
        <>
            <h3>Last 7 days data</h3>
            {
                daysData.length ? (
                    <>
                        {/* <ResponsiveContainer width="100%" height="100%"> */}
                            <BarChart width={600} height={300} data={daysData}>
                                <Bar dataKey="conversations" fill="green" />
                                {/* <CartesianGrid stroke="#ccc" /> */}
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                            </BarChart>
                        {/* </ResponsiveContainer> */}
                    </> 
                ): null 
            }
        </>
        
    );
}
 
export default Chart;
// GraphGrid.jsx
import React from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 600 },
];

const pieData = [
  { name: 'A', value: 40 },
  { name: 'B', value: 30 },
  { name: 'C', value: 30 },
];

const COLORS = ['#FFD700', '#FFB300', '#FF8C00'];

const GraphGrid = () => {
  return (
    <div className="mt-2 p-6 bg-black text-yellow-300">
      {/* Large Graph */}
      <div className="w-full flex justify-center mb-8">
        <div className="flex flex-col">
        <h2 className="text-xl font-sans mb-4 font-bold">📈 Monthly Trends</h2>
        <LineChart width={1000} height={300} data={data}>
          <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={3} />
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="name" stroke="#FFD700" />
          <YAxis stroke="#FFD700" />
          <Tooltip />
        </LineChart></div>
      </div>

      {/* Grid of 3 Smaller Graphs */}
      <div className="grid grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2 font-bold">📊 Bar Overview</h3>
          <BarChart width={300} height={200} data={data}>
            <Bar dataKey="value" fill="#FFD700" />
            <XAxis dataKey="name" stroke="#FFD700" />
            <YAxis stroke="#FFD700" />
            <Tooltip />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2 font-bold">🥧 Distribution</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#FFD700"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Another Line Chart */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2 font-bold">📈 Mini Trend</h3>
          <LineChart width={300} height={200} data={data}>
            <Line type="monotone" dataKey="value" stroke="#FFD700" strokeWidth={2} />
            <XAxis dataKey="name" stroke="#FFD700" />
            <YAxis stroke="#FFD700" />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default GraphGrid;
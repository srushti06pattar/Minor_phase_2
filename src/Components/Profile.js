import React from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

const progressData = [
  { name: 'Completed', value: 75 },
  { name: 'Remaining', value: 25 }
];

const masteryData = [
  { name: 'Mastered', value: 50 },
  { name: 'Unmastered', value: 50 }
];

const COLORS = ['#8884d8', '#ddd'];

const leaderboard = [
  { name: 'John Doe', points: 115 },
  { name: 'Jane Smith', points: 110 },
  { name: 'Ali Khan', points: 95 },
];

const lineData = [
  { name: 'Week 1', score: 50 },
  { name: 'Week 2', score: 60 },
  { name: 'Week 3', score: 75 },
  { name: 'Week 4', score: 90 },
];

const ProfileDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-gray-600">You have 2 incomplete tasks. 📌</p>
            <p className="text-sm text-gray-400">
              Learners perform better with submitted work on time.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Total Time Spent</p>
            <h2 className="text-2xl font-semibold">3h 43m</h2>
          </div>
          <div className="bg-green-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Assignments Completed</p>
            <h2 className="text-2xl font-semibold">12</h2>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Time vs Stress</p>
            <h2 className="text-2xl font-semibold">Low Stress</h2>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Assignment Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={progressData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Mastery Chart</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={masteryData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {masteryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white border p-4 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={3} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="bg-white border p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Karma Leaderboard</h3>
          <ul className="space-y-2">
            {leaderboard.map((user, i) => (
              <li key={i} className="flex justify-between">
                <span>{i + 1}. {user.name}</span>
                <span className="text-gray-600">{user.points} pts</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            ⬅ Back to Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;

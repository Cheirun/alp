import React from "react";

const TherapistPage = () => {
  return (
    <div className="min-h-screen p-6 bg-white text-black">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome, Therapist </h1>
        
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assigned Cases */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Assigned Children</h2>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded">View Profiles</button>
        </div>

        {/* Learning Progress */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Learning Progress Overview</h2>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Track Progress</button>
        </div>

        {/* Emotional Insights */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Emotional Insights</h2>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded">View Insights</button>
        </div>

        {/* Feedback */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Therapist Feedback</h2>
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Feedback</button>
        </div>

        {/* Scheduler */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Session Scheduler</h2>
         
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Open Calendar</button>
        </div>
      </div>
    </div>
  );
};

export default TherapistPage;
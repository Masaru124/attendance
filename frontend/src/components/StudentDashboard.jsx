import { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({}); // subject: percentage

  useEffect(() => {
    // Fetch attendance records for the logged-in student
    // For simplicity, using a placeholder studentId
    const studentId = 1; // Replace with actual student ID or get from auth context

    axios.get(`http://localhost:1516/api/attendance/student/${studentId}`)
      .then(res => {
        setAttendanceRecords(res.data.records);
        setAttendanceSummary(res.data.summary);
      })
      .catch(err => {
        console.error("Failed to load attendance records:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">Attendance Records</h2>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Subject</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{record.subject}</td>
              <td className="border border-gray-300 p-2">{record.date}</td>
              <td className="border border-gray-300 p-2">{record.present ? "Present" : "Absent"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Attendance Summary (%)</h2>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Subject</th>
            <th className="border border-gray-300 p-2">Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(attendanceSummary).map(([subject, percent]) => (
            <tr key={subject}>
              <td className="border border-gray-300 p-2">{subject}</td>
              <td className="border border-gray-300 p-2">{percent.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Weekly Report</h2>
      <p>Graph or table summary to be implemented</p>
    </div>
  );
}

export default StudentDashboard;

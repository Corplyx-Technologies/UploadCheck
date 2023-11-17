import React from 'react';
// import school from '../../ShikshMitraWebsite/assets/student.png'

const StudentResults = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg max-w-xl mx-auto bg-white shadow-md">
      <div className="text-center mb-4">
        {/* <img src={school} alt="School Logo" className="w-16 h-16 mx-auto" /> */}
        <h1 className="text-3xl font-semibold mt-2">School Name</h1>
        <p className="text-sm text-gray-600">School Address</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600">Sr. No: 12345</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Date: Exam Date</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Report Card</p>
        <p className="text-md">Academic Year: 2023-2024</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Student Details</h2>
        <p className="text-sm">Name: John Doe</p>
        <p className="text-sm">Class: 10th Grade</p>
        <p className="text-sm">Admission Number: 123456</p>
        <p className="text-sm">Roll Number: 12345</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Results</h2>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">95</td>
            </tr>
            {/* Add more rows for other subjects */}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Percentage: 90%</p>
        <p className="font-semibold">Grade: A</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Remarks: Excellent performance.</p>
          </div>
          <div>
            <p className="font-semibold">Principal's Signature</p>
            {/* <img src={school} alt="Principal's Signature" className="w-24 h-12" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;

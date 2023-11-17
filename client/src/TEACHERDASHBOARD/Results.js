import React, { useState, useEffect } from "react";
import axios from "axios";

const get_student_api = "/api/v1/adminRoute/getAllStudents?studentClass=11&studentSection=A";
const post_data = "api/v1/results/createResults";
const get_result = "api/v1/results/getResults";

const Results = () => {
  const classdata = JSON.parse(localStorage.getItem("response"));
  const [resultData, setResultData] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [studentMarks, setStudentMarks] = useState({});
  const [examData, setExamData] = useState([]);
  const [maximumMarks, setMaximumMarks] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [totalMarks, setTotalMarks] = useState('');

  useEffect(() => {
    axios
      .get("api/v1/exam/getAllExams", {
        withCredentials: true,
      })
      .then((response) => {
        const examData = response.data.examData;
        const totalMarks = examData[0].examInfo.map((item) => item.subjectTotalMarks);
        console.log(totalMarks)
        setTotalMarks(totalMarks)
        setExamData(examData);

        const maxMarks = {};
        if (examData) {
          examData.forEach((exam) => {
            if (exam.examInfo) {
              exam.examInfo.forEach((item) => {
                maxMarks[item._id] = item.subjectTotalMarks;
              });
            }
          });
          // Extract subjects from the response
          const subjects = examData[0].examInfo.map((item) => item.subjectName);
          setSubjects(subjects);
        }
        setMaximumMarks(maxMarks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedExam]);

  useEffect(() => {
    if (selectedExam) {
      const selectedExamData = examData.find((exam) => exam.examName === selectedExam);
      if (selectedExamData && selectedExamData.examInfo) {
        const subjects = selectedExamData.examInfo.map((item) => item.subjectName);
        setSubjects(subjects);
      }
    }
  }, [selectedExam, examData]);

  const handleSubmitMarks = () => {
    const selectedExamData = examData.find((exam) => exam.examName === selectedExam);
  
    if (!selectedExamData) {
      console.error("Selected exam data not found.");
      return;
    }
  
    const postData = {
      examName: selectedExam,
      className: classdata.classTeacher,
      section: classdata.section,
      resultsRecords: students.map((student) => {
        return {
          studentId: student._id,
          studentName: student.fullName,
          rollNo: student.rollNo || "",
          subjects: selectedExamData.examInfo.map((item) => ({
            subjectName: item.subjectName,
            marks: studentMarks[student._id][item.subjectName] || 0,
          })),
        };
      }),
    };
  
    axios
      .post(post_data, postData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Marks submitted successfully:", response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error submitting marks:", error);
      });
  };
  

  useEffect(() => {
    axios
      .get(get_student_api, {
        withCredentials: true,
      })
      .then((response) => {
        const allStudent = response.data.allStudent;
        if (allStudent) {
          setStudents(allStudent);

          const initialMarks = {};
          allStudent.forEach((student) => {
            initialMarks[student._id] = {};
          });
          setStudentMarks(initialMarks);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("api/v1/exam/getAllExams", {
        withCredentials: true,
      })
      .then((response) => {
        const examData = response.data.examData;
        setExamData(examData);

        const maxMarks = {};
        const examSubjects = [];

        if (examData) {
          examData.forEach((exam) => {
            if (exam.examInfo) {
              exam.examInfo.forEach((item) => {
                maxMarks[item._id] = item.subjectTotalMarks;
                examSubjects.push(item.subjectName);
              });
            }
          });
        }

        setMaximumMarks(maxMarks);
        setSubjects(examSubjects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("api/v1/results/getResults", {
        withCredentials: true,
      })
      .then((response) => {
      console.log(response.data.data)
      const newStudentMarks = {};

      // Iterate through the response data and populate newStudentMarks
      response.data.data.forEach((result) => {
        newStudentMarks[result.studentId] = {};
        result.subjects.forEach((subject) => {
          newStudentMarks[result.studentId][subject.subjectName] = subject.marks;
        });
      });

      // Update studentMarks state with the new data
      setStudentMarks(newStudentMarks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedExam]);

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const handleMarksChange = (subjectId, value, studentId) => {
    console.log(value)
    setStudentMarks((prevStudentMarks) => {
      const updatedMarks = { ...prevStudentMarks };
      updatedMarks[studentId][subjectId] = parseInt(value, 10);
      return updatedMarks;
    });
  };

  const calculateTotalMarksForStudent = (studentId) => {
     if (selectedExam) {
      const exam = examData.find((exam) => exam.examName === selectedExam);
      if (exam) {
        let total = 0;
        exam.examInfo.forEach((item) => {
          console.log(item)
          total = item.subjectTotalMarks;
        });
        return total;
      }
    }
    return 0;
  };
  

  const calculateMaximumMarksForStudent = () => {
    let totalMaxMarks = 0;
    if (maximumMarks) {
      Object.values(maximumMarks).forEach((subjectTotalMarks) => {
        totalMaxMarks += subjectTotalMarks;
      });
    }
    return totalMaxMarks;
  };

  const calculatePercentageForStudent = (studentId) => {
    if (!selectedExam) {
      return 0; // Return 0 if no exam is selected
    }
  
    const studentMarkData = studentMarks[studentId];
    if (!studentMarkData) {
      return 0; // Or any other default value if the student data is not found
    }
  
    // Calculate the total marks for the student
    const totalMarks = Object.values(studentMarkData).reduce((acc, subjectMark) => {
      return acc + (subjectMark || 0); // Use 0 as default value if marks are missing
    }, 0);
  
    const totalMaxMarks = calculateMaximumMarksForStudent();
    return (totalMarks / totalMaxMarks) * 100;
  };
  
  

  const calculateSumOfSubjectTotalMarks = () => {
    if (selectedExam) {
      const exam = examData.find((exam) => exam.examName === selectedExam);
      if (exam) {
        let total = 0;
        exam.examInfo.forEach((item) => {
          console.log(item)
          total += item.subjectTotalMarks;
        });
        return total;
      }
    }
    return 0;
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-4">Results Management</h1>
        <div className="grid">
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-4">
            <select
              className="p-2 border rounded-md md:w-1/4"
              onChange={handleExamChange}
              value={selectedExam}
            >
              <option value="">Select Exam</option>
              {examData.map((exam) => (
                <option key={exam._id} value={exam.examName}>
                  {exam.examName}
                </option>
              ))}
            </select>
            <h1 className="p-2 border rounded-md md:w-1/4">
              Class: {classdata.classTeacher}
            </h1>
            <h1 className="p-2 border rounded-md md:w-1/4">
              Section: {classdata.section}
            </h1>
          </div>
          {selectedExam && students.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300">Student Name</th>
                    {subjects.map((subject, index) => (
                      <th key={index} className="border border-gray-300">
                        {subject}
                      </th>
                    ))}
                    <th className="border border-gray-300">Total Marks</th>
                    <th className="border border-gray-300">Maximum Marks</th>
                    <th className="border border-gray-300">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td className="border border-gray-300">{student.fullName}</td>
                      {subjects.map((subject, index) => (
                        <td key={index} className="border border-gray-300">
                          {editMode ? (
                            <input
                              type="number"
                              value={studentMarks[student._id][subject] || ""}
                              onChange={(e) => handleMarksChange(subject, e.target.value, student._id)}
                            />
                          ) : (
                            studentMarks[student._id][subject]
                          )}
                        </td>
                      ))}
                      <td className="border border-gray-300">
                        {editMode ? "" : calculateTotalMarksForStudent(student._id)}
                      </td>
                      <td className="border border-gray-300">
                        {calculateSumOfSubjectTotalMarks()}
                      </td>
                      <td className="border border-gray-300">
                        {editMode ? "" : calculatePercentageForStudent(student._id)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            {editMode ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleSubmitMarks}
              >
                Submit Marks
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setEditMode(true)}
              >
                Edit Marks
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
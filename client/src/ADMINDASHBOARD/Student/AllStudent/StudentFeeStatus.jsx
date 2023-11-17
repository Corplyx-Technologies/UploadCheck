// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const StudentFeeStatus = () => {
//   const { email } = useParams();
//   const [studentData, setStudentData] = useState({});

//   const studentId = studentData._id;
//   const [feeData, setFeeData] = useState({});
//   const [getFee, setGetFee] = useState({});
//   console.log(email);

//   useEffect(() => {
//     axios
//       .get(
//         `/api/v1/adminRoute/getAllStudents?email=${email}`,
//         {
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         const data = response.data.allStudent[0];
//         setStudentData(data);
//         console.log("Student data ", data);
//       })
//       .catch((error) => {
//         console.error("error fetching Student data : ", error);
//       });
//   }, [email]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [examData, setExamData] = useState([
//     {
//       FeeMonth: "January",
//       feeStatus: "Paid",
//       feeAmount: 8000,
//       feeDate: "07/11/2023",
//     },
//   ]);
//   // const [feeData, setFeeData] = useState([]);
//   const [formData, setFormData] = useState({
//     studentId: "",
//     feeAmount: "",
//     FeeMonth: "",
//     feeDate: "",
//     feeStatus: "",
//   });

//   // const handleModalOpen = () => {
//   //   axios
//   //     .get(
//   //       `/api/v1/adminRoute/getFees?className=${studentData.class}`,
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     )
//   //     .then((response) => {
//   //       // const dataa = response.data;
//   //       // setGetFee("data[0].amount");
//   //       // if(dataa.length > 1) {
//   //       //   setGetFee(dataa[0].amount);
//   //       // }
//   //       console.log("amount", " data[0]");
//   //       setIsModalOpen(true);
//   //     })
//   //     .catch((error) => {
//   //       toast(error.mmessage);
//   //       console.error("error fetching Fee data: ", error.message);
//   //     });
//   // };

//   const handleModalOpen = () => {
//     axios
//       .get(
//         `/api/v1/adminRoute/getFees?className=${studentData.class}`,
//         {
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         // const dataa = response.data;
//         // setGetFee("data[0].amount");
//         // if(dataa.length > 1) {
//         //   setGetFee(dataa[0].amount);
//         // }
//         console.log("amount", response.data[0]);
//         setIsModalOpen(true);
//       })
//       .catch((error) => {
//         toast(error.message); // Corrected from "toast(error.mmessage);"
//         console.error("error fetching Fee data: ", error.message);
//       });
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleFeeChange = (e) => {
//     setFormData({ ...formData, feeAmount: e.target.value });
//   };

//   const handleMonthsChange = (e) => {
//     setFormData({ ...formData, FeeMonth: e.target.value });
//   };

//   const handleFeeStatusChange = (e) => {
//     setFormData({ ...formData, feeStatus: e.target.value });
//   };

//   const handleSubjectChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].feeName = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleDateChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].additionalFeeDate = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleStartTimeChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].startTime = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleEndTimeChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].endTime = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleTotalMarksChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].subjectTotalMarks = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };
//   const handleFeeType = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].feeType = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleAddSubject = () => {
//     const updatedExamInfo = [
//       ...formData.additionalType,
//       {
//         feeName: "",
//         additionalFeeDate: "",
//         feeType: "",
//         startTime: "",
//         endTime: "",
//         subjectTotalMarks: "",
//       },
//     ];
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };
//   const handleMonthChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     const newExamData = {
//       studentId: studentId,
//       feeHistory: [
//         {
//           paidAmount: formData.feeAmount,
//           month: formData.FeeMonth,
//           status: formData.feeStatus,
//           date: formData.feeDate,
//           studentId: studentId,
//           // additionalType: formData.additionalType,
//         },
//       ],
//     };

//     const apiUrl = "api/v1/fees/createFeeStatus";
//     axios
//       .post(apiUrl, newExamData, {
//         withCredentials: true,
//         // headers: {
//         //   "Content-Type": "multipart/form-data",
//         // },
//       })
//       .then((response) => {
//         console.log("Data Post Seccessfully : ", response);
//         console.log("Data for getting ", response.data.data.feeHistory);
//         const feesthistorydata = response.data.data.feeHistory;

//         // Combine the existing data with the new data from feesthistorydata
//         // const updatedExamData = [...initialExamData, ...feesthistorydata];

//         setExamData(feesthistorydata);

//         setExamData({
//           FeeMonth: "January",
//           feeStatus: "Paid",
//           feeAmount: 8000,
//           feeDate: "07/11/2023",
//         });
//       })
//       .catch((error) => {
//         console.error("Error Posting Data :", error);
//       });

//     // setExamData([...examData, newExamData]);

//     setFormData({
//       feeAmount: "",
//       FeeMonth: "",
//       feeStatus: "",
//       feeDate: "",
//       // additionalType: [
//       //   {
//       //     feeName: '',
//       //     additionalFeeDate: '',
//       //     // startTime: '',
//       //     feeType:'',
//       //     // endTime: '',
//       //     subjectTotalMarks: '',
//       //   }
//       // ],
//     });

//     // console.log("P2 examData", feeDate);

//     console.log("P2 formData", formData);

//     setIsModalOpen(false);
//   };

//   return (
//     <div className="py-8 px-4 md:px-8">
//       <div className=" flex justify-center mt-4">
//         {studentData.image && studentData.image.url ? (
//           <img
//             className="w-[80px] h-[80px] rounded-full"
//             src={studentData.image.url}
//             alt="Image"
//           />
//         ) : (
//           <p>No image available</p>
//         )}
//       </div>

//       <div className=" ">
//         <h2 cclassName="w-[130px]  text-[14px] ">
//           Name : {studentData.fullName}
//         </h2>
//         <h2 cclassName="w-[130px]  text-[14px] ">
//           Email : {studentData.email}
//         </h2>
//       </div>

//       {/* {
//    console.log("P3 Sdata", studentData._id)
// } */}
//       <div className="flex justify-center">
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleModalOpen}
//         >
//           Create Fee
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
//             <div className="flex justify-between">
//               {/* <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Fee Form</h2> */}
//               <span className="text-2xl font-semibold mb-4 text-indigo-600">
//                 Fee Form
//               </span>
//               <span className="text-2xl font-semibold mb-4 text-indigo-600">
//                 Fee Amounts : {getFee}
//               </span>
//               {console.log("p2", getFee)}
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div className="mb-4">
//                 <label className="block text-gray-600">Months</label>
//                 <select
//                   className="w-full border rounded-lg p-2"
//                   value={formData.FeeMonth}
//                   onChange={handleMonthsChange}
//                 >
//                   <option>Select Months </option>
//                   <option value="January">January</option>
//                   <option value="February">February</option>
//                   <option value="March">March</option>
//                   <option value="April">April</option>
//                   <option value="May">May</option>
//                   <option value="June">June</option>
//                   <option value="July">July</option>
//                   <option value="August">August</option>
//                   <option value="September">September</option>
//                   <option value="October">October</option>
//                   <option value="November">November</option>
//                   <option value="December">December</option>
//                   {/* Add options for Class 2 to 12 */}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-600">Fee Status</label>
//                 <select
//                   className="w-full border rounded-lg p-2"
//                   value={formData.feeStatus}
//                   onChange={handleFeeStatusChange}
//                 >
//                   <option>Select Status</option>
//                   <option value="paid">Paid</option>
//                   <option value="unPaid">UnPaid</option>
//                   <option value="dues">Dues</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-600">Date</label>
//                 <input
//                   type="date"
//                   name="feeDate" // Make sure to provide the name
//                   className="w-full border rounded-lg p-2"
//                   value={formData.feeDate}
//                   onChange={handleMonthChange}
//                   // type="date"
//                   // className="w-full border rounded-lg p-2"
//                   // value={formData.FeeDate}
//                   // // onChange={(e) => handleDateChange(e, index)}
//                   // onChange={handleMonthChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-600">Fee Amount</label>
//                 <input
//                   type="number"
//                   className="w-full border rounded-lg p-2"
//                   value={formData.feeAmount}
//                   onChange={handleFeeChange}
//                 />
//               </div>
//             </div>
//             {/* <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Additional Fee</h2>
//             <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">

//               {formData.additionalType.map((additionalType, index) => (
//                 <div key={index} className="mb-4 border rounded p-4">

//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div className="mb-4">
//               <label className="block text-gray-600">Additional FeeType</label>
//               <select
//                 className="w-full border rounded-lg p-2"
//                 value={additionalType.feeType}
//                 // value={examInfo.subjectName}
//                 // onChange={handleClassChange}
//                 // onChange={handleFeeType}
//                 onChange={(e) => handleFeeType(e, index)}
//                 // onChange={(e) => handleSubjectChange(e, index)}
//               >
//                 <option >Select Type </option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>

//               </select>
//             </div>
//                     <div>
//                       <label className="block text-gray-600">Date</label>
//                       <input
//                         type="date"
//                         className="w-full border rounded-lg p-2"
//                         value={additionalType.additionalFeeDate}
//                         onChange={(e) => handleDateChange(e, index)}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-gray-600">Amount</label>
//                       <input
//                         type="number"
//                         className="w-full border rounded-lg p-2"
//                         value={additionalType.subjectTotalMarks}
//                         onChange={(e) => handleTotalMarksChange(e, index)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
//               onClick={handleAddSubject}
//             >
//               +
//             </button> */}
//             {/* <button
//               className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               onClick={handleModalClose}
//             >
//               Cancel
//             </button> */}
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//               <button
//                 // className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleModalClose}
//               >
//                 {/* {   &#x2716;} */}
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
//           Exam Data
//         </h2>
//         <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
//           <table className="w-full border-collapse table-auto">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border text-left px-4 py-2">Months</th>
//                 <th className="border text-left px-4 py-2">Status</th>
//                 <th className="border text-left px-4 py-2">Total Amount</th>
//                 {/* <th className="border text-left px-4 py-2">Amount</th> */}
//                 <th className="border text-left px-4 py-2">Fee Paid Date</th>
//                 <th className="border text-left px-4 py-2">Additional Fee</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.map((data, index) => (
//                 <tr key={index}>
//                   {console.log("data", data)}
//                   <td className="border px-4 py-2">{data.FeeMonth}</td>
//                   <td className="border px-4 py-2">{data.feeStatus}</td>
//                   {/* <td className="border px-4 py-2">10000</td> */}

//                   <td className="border px-4 py-2">{data.feeAmount}</td>
//                   <td className="border px-4 py-2">{data.feeDate}</td>
//                   <td className="border px-4 py-2">
//                     {/* {data.additionalType.length > 0 ? (
//                         data.additionalType.map((subject, i) => (
//                         <div key={i}>

//                           <div className='flex'>
//                             <p className='font-bold w-[100px] '> feeType :</p>
//                        {subject.feeType}
//                           </div>
//                           <div className='flex'>
//                           <p className='font-bold w-[100px]'>Amount:</p>
//                       {subject.subjectTotalMarks}
//                           </div>

//                           <div className='flex'>
//                         <p className='font-bold w-[100px] '> Date:</p>
//                           {subject.additionalFeeDate}
//                           </div>

//                         </div>
//                       ))) :( <div>No data found</div>)
//                     } */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFeeStatus;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const StudentFeeStatus = () => {
  
  const { email } = useParams();
  const [studentData, setStudentData] = useState({});

  const studentId = studentData._id;
  const [feeData, setFeeData] = useState({});
  const [getFee, setGetFee] = useState({});
  useEffect(() => {
    axios
      .get(
        `/api/v1/adminRoute/getAllStudents?email=${email}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data.allStudent[0];
        setStudentData(data);
      })
      .catch((error) => {
        console.error("error fetching Student data : ", error);
      });
  }, [email]);

  // useEffect(() => {
  //   axios.post(`api/v1/fees/createFeeStatus`, {
  //     withCredentials: true
  //   }).then((response) => {
  //     const data = response.data.allStudent[0];
  //     setFeeData(data);
  //   }).catch((error) => {
  //     console.error("error fetching fee data : ", error)
  //   })
  // }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examData, setExamData] = useState([]);
  // const [feeData, setFeeData] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    feeAmount: "",
    FeeMonth: "",
    feeDate: "",
    feeStatus: "",
    // additionalType: [
    //   {
    //     feeName: '',
    //     additionalFeeDate: '',
    //     // startTime: '',
    //     feeType:'',
    //     // endTime: '',
    //     subjectTotalMarks: '',
    //   },
    // ],
  });

  const handleModalOpen = () => {
    axios
      .get(
        `/api/v1/adminRoute/getFees?className=${studentData.class}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data;
        setGetFee(" data[0].amount");
        console.log("amount", "data[0]");
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("error fetching Fee data: ", error);
      });
  };

  // const handleModalOpen = () => {
  // //  useEffect(()=>{
  // //     axios.get(`api/v1/getFees`,{
  // //       withCredentials:true
  // //     }).then((response)=>{
  // //       const data=response
  // //       setGetFee(data)
  // //       // console.log("fee data",data)
  // //     }).catch((error) => {
  // //         console.error("error fetching Fee data : ", error)
  // //       })
  // //   },[])

  //   setIsModalOpen(true);
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFeeChange = (e) => {
    setFormData({ ...formData, feeAmount: e.target.value });
  };

  const handleMonthsChange = (e) => {
    setFormData({ ...formData, FeeMonth: e.target.value });
  };

  const handleFeeStatusChange = (e) => {
    setFormData({ ...formData, feeStatus: e.target.value });
  };

  const handleSubjectChange = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].feeName = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };

  const handleDateChange = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].additionalFeeDate = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };

  const handleStartTimeChange = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].startTime = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };

  const handleEndTimeChange = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].endTime = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };

  const handleTotalMarksChange = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].subjectTotalMarks = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };
  const handleFeeType = (e, index) => {
    const updatedExamInfo = [...formData.additionalType];
    updatedExamInfo[index].feeType = e.target.value;
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };

  const handleAddSubject = () => {
    const updatedExamInfo = [
      ...formData.additionalType,
      {
        feeName: "",
        additionalFeeDate: "",
        feeType: "",
        startTime: "",
        endTime: "",
        subjectTotalMarks: "",
      },
    ];
    setFormData({ ...formData, additionalType: updatedExamInfo });
  };
  const handleMonthChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const newExamData = {
      studentId: studentId,
      feeHistory: [
        {
          paidAmount: formData.feeAmount,
          month: formData.FeeMonth,
          status: formData.feeStatus,
          date: formData.feeDate,
          studentId: studentId,
          // additionalType: formData.additionalType,
        },
      ],
    };
    const apiUrl = "api/v1/fees/createFeeStatus";
    axios
      .post(apiUrl, newExamData, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      })
      .then((response) => {
        console.log("Data Post Seccessfully : ", response);
      })
      .catch((error) => {
        console.error("Error Posting Data :", error);
      });

    setExamData([...examData, newExamData]);

    setFormData({
      feeAmount: "",
      FeeMonth: "",
      feeStatus: "",
      feeDate: "",
      // additionalType: [
      //   {
      //     feeName: '',
      //     additionalFeeDate: '',
      //     // startTime: '',
      //     feeType:'',
      //     // endTime: '',
      //     subjectTotalMarks: '',
      //   }
      // ],
    });

    // console.log("P2 examData", feeDate);

    console.log("P2 formData", formData);

    setIsModalOpen(false);
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className=" flex justify-center mt-4">
        {studentData.image && studentData.image.url ? (
          <img
            className="w-[80px] h-[80px] rounded-full"
            src={studentData.image.url}
            alt="Image"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className=" ">
        <h2 cclassName="w-[130px]  text-[14px] ">
          Name : {studentData.fullName}
        </h2>
        <h2 cclassName="w-[130px]  text-[14px] ">
          Email : {studentData.email}
        </h2>
      </div>

      {/* {
   console.log("P3 Sdata", studentData._id)
} */}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleModalOpen}
        >
          Create Fee
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
            <div className="flex justify-between">
              {/* <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Fee Form</h2> */}
              <span className="text-2xl font-semibold mb-4 text-indigo-600">
                Fee Form
              </span>
              <span className="text-2xl font-semibold mb-4 text-indigo-600">
                Fee Amounts : {getFee}
              </span>
              {console.log("p2", getFee)}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-gray-600">Months</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={formData.FeeMonth}
                  onChange={handleMonthsChange}
                >
                  <option>Select Months </option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                  {/* Add options for Class 2 to 12 */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Fee Status</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={formData.feeStatus}
                  onChange={handleFeeStatusChange}
                >
                  <option>Select Status</option>
                  <option value="paid">Paid</option>
                  <option value="unPaid">UnPaid</option>
                  <option value="dues">Dues</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600">Date</label>
                <input
                  type="date"
                  name="feeDate" // Make sure to provide the name
                  className="w-full border rounded-lg p-2"
                  value={formData.feeDate}
                  onChange={handleMonthChange}
                  // type="date"
                  // className="w-full border rounded-lg p-2"
                  // value={formData.FeeDate}
                  // // onChange={(e) => handleDateChange(e, index)}
                  // onChange={handleMonthChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Fee Amount</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={formData.feeAmount}
                  onChange={handleFeeChange}
                />
              </div>
            </div>
            {/* <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Additional Fee</h2>
            <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">
                 
              {formData.additionalType.map((additionalType, index) => (
                <div key={index} className="mb-4 border rounded p-4">
                 
                  <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="mb-4">
              <label className="block text-gray-600">Additional FeeType</label>
              <select
                className="w-full border rounded-lg p-2"
                value={additionalType.feeType}
                // value={examInfo.subjectName}
                // onChange={handleClassChange}
                // onChange={handleFeeType}
                onChange={(e) => handleFeeType(e, index)}
                // onChange={(e) => handleSubjectChange(e, index)}
              >
                <option >Select Type </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
               
                
              </select>
            </div>
                    <div>
                      <label className="block text-gray-600">Date</label>
                      <input
                        type="date"
                        className="w-full border rounded-lg p-2"
                        value={additionalType.additionalFeeDate}
                        onChange={(e) => handleDateChange(e, index)}
                      />
                    </div>
                   
                    <div>
                      <label className="block text-gray-600">Amount</label>
                      <input
                        type="number"
                        className="w-full border rounded-lg p-2"
                        value={additionalType.subjectTotalMarks}
                        onChange={(e) => handleTotalMarksChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
              onClick={handleAddSubject}
            >
              +
            </button> */}
            {/* <button
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleModalClose}
            >
              Cancel
            </button> */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                // className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleModalClose}
              >
                {/* {   &#x2716;} */}
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Exam Data
        </h2>
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-left px-4 py-2">Months</th>
                <th className="border text-left px-4 py-2">Status</th>
                <th className="border text-left px-4 py-2">Total Amount</th>
                <th className="border text-left px-4 py-2">Amount</th>
                <th className="border text-left px-4 py-2">Fee Paid Date</th>
                <th className="border text-left px-4 py-2">Additional Fee</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((data, index) => (
                <tr key={index}>
                  {console.log("data", data)}
                  <td className="border px-4 py-2">{data.FeeMonth}</td>
                  <td className="border px-4 py-2">{data.feeStatus}</td>
                  <td className="border px-4 py-2">10000</td>

                  <td className="border px-4 py-2">{data.feeAmount}</td>
                  <td className="border px-4 py-2">{data.feeDate}</td>
                  <td className="border px-4 py-2">
                    {/* {data.additionalType.length > 0 ? (
                        data.additionalType.map((subject, i) => (
                        <div key={i}>
                         
                          <div className='flex'>
                            <p className='font-bold w-[100px] '> feeType :</p>
                       {subject.feeType}
                          </div>
                          <div className='flex'>
                          <p className='font-bold w-[100px]'>Amount:</p>
                      {subject.subjectTotalMarks}
                          </div>

                          <div className='flex'>
                        <p className='font-bold w-[100px] '> Date:</p>
                          {subject.additionalFeeDate}
                          </div> 
                         
                        </div>
                      ))) :( <div>No data found</div>)
                    } */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeStatus;

// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import axios from 'axios'

// const StudentFeeStatus = () => {

//   const { email } = useParams();
//   const [studentData, setStudentData] = useState({})
//   useEffect(() => {
//     axios.get(`/api/v1/adminRoute/getAllStudents?email=${email}`, {
//       withCredentials: true
//     }).then((response) => {
//       const data = response.data.allStudent[0];
//       setStudentData(data);
//     }).catch((error) => {
//       console.error("error fetching Student data : ", error)
//     })
//   }, [email])

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [feeDate, setFeeDate] = useState([]);
//   const [formData, setFormData] = useState({

//     monthName: '',
//     status: '',
//     dateInfo: [
//       {

//         examDate: '',

//       },
//     ],
//   });

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleClassChange = (e) => {
//     setFormData({ ...formData, monthName: e.target.value });
//   };

//   const handleSectionChange = (e) => {
//     setFormData({ ...formData, status: e.target.value });
//   };

//   const handleDateChange = (e, index) => {
//     const updatedExamInfo = [...formData.dateInfo];
//     updatedExamInfo[index].examDate = e.target.value;
//     setFormData({ ...formData, dateInfo: updatedExamInfo });
//   };

//   const handleSubmit = () => {

//     const newExamData = {

//       monthName: formData.monthName,
//       status: formData.status,
//       dateInfo: formData.dateInfo,
//     };

//     setFeeDate([...feeDate, newExamData]);

//     setFormData({

//       monthName: '',
//       status: '',
//       dateInfo: [
//         {

//           examDate: '',

//         },
//       ],
//     });

//     console.log("P2 examData", feeDate);

//     console.log("P2 formData", formData);

//     setIsModalOpen(false);
//   };

//   return (
//     <div className="py-8 px-4 md:px-8">

//       <div className=" flex justify-center mt-4">
//         {studentData.image && studentData.image.url ? (
//           <img
//             className="w-[80px] h-[80px] rounded-full"
//             src={studentData.image.url}
//             alt="Image"
//           />
//         ) : (
//           <p>No image available</p>
//         )}
//       </div>

//       <div className=" ">
//         <h2 cclassName="w-[130px]  text-[14px] ">Name :  {studentData.fullName}</h2>
//         <h2 cclassName="w-[130px]  text-[14px] ">Email : {studentData.email}</h2>

//       </div>

//       <div className="flex justify-center">
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleModalOpen}
//         >
//           Create Fee
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
//             <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Fee Form</h2>
//             <div className="mb-4">
//               <label className="block text-gray-600">Months</label>
//               <select
//                 className="w-full border rounded-lg p-2"
//                 value={formData.monthName}
//                 onChange={handleClassChange}
//               >
// <option >Select Months </option>
// <option value="January">January</option>
// <option value="February">February</option>
// <option value="March">March</option>
// <option value="April">April</option>
// <option value="May">May</option>
// <option value="June">June</option>
// <option value="July">July</option>
// <option value="August">August</option>
// <option value="September">September</option>
// <option value="October">October</option>
// <option value="November">November</option>
// <option value="December">December</option>

//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600">Fee Status</label>
//               <select
//                 className="w-full border rounded-lg p-2"
//                 value={formData.status}
//                 onChange={handleSectionChange}
//               >
//                 <option>Select Status</option>
//                 <option value="paid" >Paid</option>
//                 <option value="unPiad">UnPaid</option>
//                 <option value="pending">Pending</option>

//               </select>
//               {/* <div>
//                       <label className="block text-gray-600">Fee Paid Date</label>
//                       <input
//                         type="date"
//                         className="w-full border rounded-lg p-2"
//                         value={examDate}
//                         // value={dateInfo.examDate}
//                         onChange={ handleDateChange}
//                         // onChange={(e) => handleDateChange(e, index)}
//                       />
//                     </div> */}
//             </div>

//             <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">
//               {formData.dateInfo.map((dateInfo, index) => (
//                 <div key={index} className="mb-4 border rounded p-4">

//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     <div>
//                       <label className="block text-gray-600">Fee Paid Date</label>
//                       <input
//                         type="date"
//                         className="w-full border rounded-lg p-2"
//                         value={dateInfo.examDate}
//                         onChange={(e) => handleDateChange(e, index)}
//                       />
//                     </div>

//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end gap-2 mt-4 ">
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-700 text-white justify-endfont-semibold py-2 px-4 rounded"
//                 onClick={handleModalClose}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>

//         </div>
//       )}

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
//           Fee Status
//         </h2>
//         <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
//           <table className="w-full border-collapse table-auto">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border text-left px-4 py-2">Month</th>

//                 <th className="border text-left px-4 py-2">Status</th>
//                 <th className="border text-left px-4 py-2">Paid date</th>

//               </tr>
//             </thead>
//             <tbody>
//               {feeDate.map((data, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{data.monthName}</td>
//                   <td className="border px-4 py-2">{data.status}</td>

//                   <td className="border px-4 py-2">
//                     {data.dateInfo.map((subject, i) => (

//                       <div key={i}>

//                         <div>
//                           {subject.examDate}
//                         </div>

//                       </div>
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFeeStatus;

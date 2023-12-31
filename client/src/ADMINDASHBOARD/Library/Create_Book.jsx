import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Modal from "react-modal";
import axios from "axios";
import "../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";
import InputForm from "../../Dynamic/Form/InputForm";
const modalStyle = {
  content: {
    width: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  },
};

function Create_Book() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    quantity: "",
    category: "",
    className: "",
    subject: ""
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);


  const isFormValid = () => {
    return formData.bookName && formData.authorName && formData.category && formData.className && formData.subject;
  };
  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get("/api/v1/adminRoute/getAllBooks", {
        withCredentials: true,
      })
      .then((response) => {
        if (Array.isArray(response.data.listOfAllBooks)) {
          // Update the state with the array
          setSubmittedData(response.data.listOfAllBooks);
          console.log(response.data.listOfAllBooks);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [shouldFetchData]);

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      console.log("P2", formData);
      setLoading(true);
      const response = axios.post(
        "/api/v1/adminRoute/createBook",
        formData,
        {
          withCredentials: true,
        }
      );
      setFormData({
        bookName: "",
        authorName: "",
        quantity: "",
        category: "",
        className: "",
        subject: ""
      });
      setSubmittedData([...submittedData, formData]);
      setLoading(false);
      toast.success("Form submitted successfully!");
      setShouldFetchData(true)
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };


  // const handleSubmit = async () => {
   

  //   try {
  //     setLoading(true);
  //     const response = axios.post(
  //       "/api/v1/adminRoute/createClass",
  //       formData,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setFormData({
  //       className: "",
  //       subject: "",
  //       section: "",
  //     });
  //     setSubmittedData([...submittedData, formData]);
  //     setLoading(false);
  //     toast.success("Form submitted successfully!");
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("An error occurred while submitting the form.");
  //   }
  // };

  const handleDelete = async (_id) => {
    try {
      // Make an API request to delete the row from the server
      const response = await axios.delete(
        `/api/v1/adminRoute/deleteBook/${_id}`,
        { withCredentials: true }
      );
      console.log("Book deleted successfully");

      // Update the state to remove the deleted data from the data table
      setSubmittedData((prevData) =>
        prevData.filter((item) => item._id !== _id)
      );

      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting Book:", error);
      toast.error("An error occurred while deleting the Book.");
    }
  };

  // const handleDelete = async (className) => {
  //   console.log("P2 className", className)
  //   const response = await axios.get(`/api/v1/adminRoute/getAllClass?className=${className}`, {withCredentials: true});
  //   console.log("P2 response", response.data.classList);
  //   axios
  //     .delete(`/api/v1/adminRoute/deleteClass?_id=${response.data.classList[0]._id}`, { withCredentials: true })
  //     .then((response) => {
  //       console.log("Teacher data deleted successfully");

  //       // Update the state to remove the deleted data from the data table
  //       const updatedData = submittedData.filter((item) => item.email !== email);
  //       setSubmittedData(updatedData);

  //       toast.success("Teacher data deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting teacher data:", error);
  //       toast.error("An error occurred while deleting the teacher data.");
  //     });
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formFields = [
    {
      label: "Book Name",
      name: "bookName",
      type: "text",
      value: formData.bookName,
      required: true,
    },
    {
      label: "Author Name",
      name: "authorName",
      type: "text",
      value: formData.authorName,
      required: true,
    },

    {
      label: "Quantity",
      name: "quantity",
      type: "Number",
      value: formData.quantity,
      required: true,
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      value: formData.category,
      required: true,
    },
    {
      label: "Class Name",
      name: "className",
      type: "text",
      value: formData.className,
      required: true,
    },
    {
      label: "Subject",
      name: "subject",
      type: "text",
      value: formData.subject,
      required: true,
    },

  ];

  return (
    <div className=" mt-12  mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4">Create Book Details</h1>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Add Book
      </button>
      {isModalOpen && <div className="modal-blur"></div>}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Form"
        style={modalStyle}
        overlayClassName="overlay"
      >
        <h1 style={{ fontSize: 30, fontWeight: 800, textAlign: "center" }}>
          Create Book Details
        </h1>
        <InputForm
          fields={formFields}
          handleChange={handleFieldChange}
          handleImageChange={handleImageChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
          }}
        >
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {loading ? (
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              " Submit"
            )}
          </button>
          <button
            onClick={closeModal}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
    </div>
  );
}

export default Create_Book;

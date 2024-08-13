import axios from "axios";
import { OnRun } from "../../../config/config.js";
import { useEffect, useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const InsuranceConsultant = ({ access, config, setConfig }) => {
  const [consultantList, setConsultantList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [consultantInput, setConsultantInput] = useState("");

  const getConsultantList = () => {
    axios({
      method: "POST",
      url: `${OnRun}/marketing/insurance_consultant`,
      data: { access: access },
    }).then((response) => {
      setConsultantList(response.data);
      console.log("Consultant List:", response.data);
    });
  };

  useEffect(() => {
    getConsultantList();
  }, []);

  const handle_add_consultant = () => {
    if (consultantInput) {
      const selectedConsultant = consultantList.find(
        (consultant) => consultant.name === consultantInput
      );
      if (selectedConsultant) {
        const consultant_list = config.insurance.consultant || [];
        consultant_list.push(selectedConsultant.nationalCode);
        const insurance = { ...config.insurance, consultant: consultant_list };
        setConfig({ ...config, insurance });
        setConsultantInput("");
      } else {
        toast.error("مشاور انتخابی شما صحیح نمیباشد");
      }
    }
  };

  const handleDelete = (nationalCodeToRemove) => {
    const consultant_list = (config.insurance.consultant || []).filter(
      (nationalCode) => nationalCode !== nationalCodeToRemove
    );
    const insurance = { ...config.insurance, consultant: consultant_list };
    setConfig({ ...config, insurance });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const availableConsultants = consultantList.filter(
    (consultant) =>
      !(config.insurance.consultant || []).includes(consultant.nationalCode)
  );
  return (
    <>
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <button
          onClick={toggleDropdown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          مشاور
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            dir="rtl"
            className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg"
          >
            <ToastContainer />
            <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
              <input
                list="consultants"
                value={consultantInput}
                onChange={(event) => setConsultantInput(event.target.value)}
                placeholder="جستجوی مشاور"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{ marginBottom: 16, backgroundColor: "white" }}
              />
              <datalist id="consultants">
                {availableConsultants.map((consultant, index) => (
                  <option key={index} value={consultant.name} />
                ))}
              </datalist>

              <Button
                onClick={handle_add_consultant}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                افزودن
              </Button>

              <Stack
                direction="row"
                spacing={1}
                mt={2}
                justifyContent="flex-start"
                sx={{ flexWrap: "wrap" }}
              >
                {(config.insurance.consultant || []).map(
                  (nationalCode, index) => {
                    const consultant = consultantList.find(
                      (c) => c.nationalCode === nationalCode
                    );
                    return (
                      <Chip
                        key={`consultant-${index}`}
                        label={consultant ? consultant.name : nationalCode}
                        onDelete={() => handleDelete(nationalCode)}
                        deleteIcon={
                          <button
                            style={{ color: "white", marginRight: "5px" }}
                            className="ml-2 mr-2 text-white bg-red-500 hover:bg-red-700 rounded-full p-1 transition duration-300 focus:outline-none shadow-md hover:shadow-lg"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        }
                        style={{
                          backgroundColor: "blue",
                          color: "white",
                          borderRadius: "16px",
                          fontSize: "0.875rem",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full cursor-pointer shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                      />
                    );
                  }
                )}
              </Stack>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InsuranceConsultant;

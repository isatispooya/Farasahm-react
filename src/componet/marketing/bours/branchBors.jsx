import React, { useState, useEffect } from "react";

import { Button, Chip, Stack, TextField } from "@mui/material";
import axios from "axios";
import { OnRun } from '../../../config/config';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const BranchBors = ({ access, config, setConfig }) => {
  const [branchInput, setBranchInput] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [dropdown, setdropdown] = useState(false);



 
    const fetchBranchList = async () => {
      try {
        const response = await axios.post(
          `${OnRun}/marketing/bours_branch`,
          { access: access }
        );
        setBranchList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch Branch list", error);
      }
    };
    fetchBranchList();
  ;
  const Remove = (branch) => {
    const branch_list = (config.bours.branch || []).filter(
      (i) => i !== branch
    );
    const bours = { ...config.bours, branch: branch_list };
    setConfig({ ...config, bours: bours });
  };

  const openDropDown = () => {
    setdropdown(!dropdown);
  };
  const availablebranch = branchList.filter(
    (branch) => !config.bours.branch.includes(branch)
  );
  const handleBranchSelect = (e) => {
    setBranchInput(e.target.value);
  };

  const Addbranch = () => {
    if (branchInput) {
      const available = branchList.includes(branchInput);
      if (available) {
        const branch_list = [...(config.bours.branch || [])];
        branch_list.push(branchInput);
        const bours = { ...config.bours, branch: branch_list };
        setConfig({ ...config, bours: bours });
        setBranchInput("");
      } else {
        toast.error("لطفا یک شرکت  معتبر انتخاب کنید");
      }
    }
  };

  return (
    <>
      <div dir="rtl" className="p-1 max-w-3xl mx-auto bg-gray-100 rounded-lg">
        <button
          onClick={openDropDown}
          className="w-full text-xl font-semibold text-gray-700 bg-gray-200 p-2 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          شعبه
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`inline-block ml-2 h-5 w-5 transform transition-transform duration-300 ${
              dropdown ? "rotate-180" : "rotate-0"
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
        {dropdown && (
          <div
            dir="rtl"
            className="p-4 max-w-3xl mx-auto bg-gray-100 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ToastContainer />
            <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
              <TextField
                select
                value={branchInput}
                onChange={handleBranchSelect}
                label="شعب"
                variant="outlined"
                SelectProps={{ native: true }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{ marginBottom: 16 }}
              >
                <option value="" disabled></option>
                {availablebranch.map((i, index) => (
                  <option key={index}>{i}</option>
                ))}
              </TextField>

              <Button
                onClick={Addbranch}
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
                {(config.bours.branch || []).map((branch, index) => (
                  <Chip
                    key={`branch-${index}`}
                    label={branch}
                    onDelete={() => Remove(branch)}
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
                ))}
              </Stack>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BranchBors;

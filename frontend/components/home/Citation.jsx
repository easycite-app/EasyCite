import { Fragment, useEffect, useState, useReducer } from "react";
import Interweave from "interweave";
import GetAuthor from "../../utils/GetAuthor";
import axios from "../axios";
import { toast } from "react-toastify";

const citationReducer = (state, action) => {
  switch (action.type) {
    case "CITATION_INIT":
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case "CITATION_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "CITATION_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "CITATION_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const Citation = ({ metadata, styleSelected, sourceSelected }) => {
  const [citation, dispatchCitation] = useReducer(citationReducer, {
    data: "",
    isLoading: false,
    isError: false,
  });

  const handleCitation = () => {
    dispatchCitation({ type: "CITATION_LOADING" });
    let authors = GetAuthor(metadata);

    let data = {
      ...metadata,
      authors: authors,
      style: styleSelected.citationFile,
      type: sourceSelected,
    };
    console.log(authors);
    console.log(data);
    axios
      .post("/cite", data)
      .then((res) => {
        dispatchCitation({
          type: "CITATION_SUCCESS",
          payload: res.data.data[0],
        });
      })
      .catch((error) => {
        dispatchCitation({
          type: "CITATION_FAILURE",
        });
        toast.error(
          error.response?.data?.message ??
            "Server Error! Please try again later"
        );
      });
  };

  useEffect(() => {
    handleCitation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-around max-w-4xl mt-10 sm:w-full">
      <div
        href="https://nextjs.org/docs"
        className="p-6 mt-6 text-left border w-full rounded-xl "
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Citation Preview</h3>
          <span className="flex justify-end">
            <button className="cursor-pointer flex flex-row bg-gray-100 text-gray-700 hover:text-gray-50 hover:bg-purple-500 p-2 rounded-md uppercase text-sm mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button className="cursor-pointer flex flex-row bg-gray-100 text-gray-700 hover:text-gray-50 hover:bg-purple-500 p-2 rounded-md uppercase text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              Copy
            </button>
          </span>
        </div>
        <div className="mt-4 text-base font-light select-all text-black">
          <Interweave content={citation.data} />
        </div>
      </div>
      <div className="mt-6 flex justify-end items-center">
        <button className="cursor-pointer bg-black text-gray-50 hover:text-white hover:bg-purple-700 py-2 px-3 rounded-md uppercase">
          Add to reference list
        </button>
      </div>
    </div>
  );
};

export default Citation;
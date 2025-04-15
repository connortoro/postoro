"use client";

import React from "react";
import { useState } from "react";
import { addPost } from "../actions/posts";
import StatusIcon from "./status-icon";
import Link from "next/link";

export default function PostForm() {
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setFileError("Please upload only image files (JPEG, PNG, GIF, WEBP)");
      return false;
    }

    if (file.size > maxSize) {
      setFileError("File size must be less than 5MB");
      return false;
    }

    setFileError("");
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      } else {
        e.target.value = ""; // Reset input
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData();
    formData.append("body", body);
    if (file) {
      formData.append("image", file, file.name);
    }

    const res = await addPost(formData);

    setStatus(res?.status);
    setBody("");
    setFile(null);
    // Reset file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Function to truncate filename
  const truncateFilename = (filename: string, maxLength: number = 20) => {
    if (filename.length <= maxLength) return filename;
    const extension = filename.split(".").pop();
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf("."));
    const truncatedName =
      nameWithoutExt.substring(0, maxLength - 4) + "..." + extension;
    return truncatedName;
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex flex-col items-start space-y-4 mb-[1.2rem] ml-[20px]"
    >
      <textarea
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        className="focus:outline-none focus:ring-2 focus:ring-neutral-200 h-[15rem] w-[30rem] rounded-[12px] resize-none outline-1 outline-neutral-400 p-[.5rem]"
        required
        maxLength={500}
      ></textarea>

      <div className="flex flex-row justify-between w-full px-[.2rem]">
        <div className="relative">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-neutral-200 hover:bg-neutral-300 text-neutral-950 px-4 py-2 rounded transition-colors duration-200 flex items-center space-x-2 w-[200px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">
              {file ? truncateFilename(file.name) : "Choose an image"}
            </span>
          </label>
          {fileError && (
            <p className="text-red-500 text-sm mt-1">{fileError}</p>
          )}
        </div>

        <div className="flex flex-row items-center justify-center space-x-4">
          <button
            type="submit"
            className="hover:cursor-pointer w-[5rem] h-[2.3rem] rounded-[10px] outline-1 outline-neutral-400"
          >
            Submit
          </button>
          <StatusIcon status={status} />
          {status === "failure" && (
            <p className="text-red-400">
              Please Set Username in{" "}
              <Link href={"/settings"}>
                <b className="text-lg">Settings</b>
              </Link>
            </p>
          )}
        </div>
        </div>
    </form>
  );
}

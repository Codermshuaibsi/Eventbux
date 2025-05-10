"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const EmailVerificationPopup = ({ eventUrl, closePopup }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSubmit = async () => {
    try {
      setError("");
      if (!email) {
        setError("Please enter your email");
        return;
      }
      await axios.post("http://localhost:5000/api/generate-otp", { email });
      setIsOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setError("");
      if (!otp) {
        setError("Please enter OTP");
        return;
      }
      const response = await axios.post("http://localhost:5000/api/verify-otp", { otp });
      if (response.data.message === "OTP verified successfully") {
        setIsOtpVerified(true);
        setTimeout(() => {
          
          router.push(eventUrl);
        }, 2000); 
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed");
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Email Verification</h2>
        {isOtpSent && !isOtpVerified ? (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 rounded-md"
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Enter Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
            <button
              onClick={handleEmailSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2 rounded-md"
            >
              Send OTP
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {isOtpVerified && <p className="text-green-500 mt-4">Email verified successfully!</p>}
        <button
          onClick={closePopup}
          className="mt-4 w-full text-sm text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default EmailVerificationPopup;

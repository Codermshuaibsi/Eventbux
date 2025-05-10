// components/EventCardExample.js
"use client"
import React, { useState } from "react";
import EmailVerificationPopup from "./EmailVerificationPopup"; // Import the popup component
import { motion } from "framer-motion";


const EventCardExample = ({
    eventName,
    eventDate,
    eventLocation,
    eventDescription,
    eventImage,
    eventUrl,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <motion.div
                className="max-w-xs rounded-xl bg-blend-screen shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >

                <img
                    src={eventImage}
                    alt={eventName}
                    className="w-full h-48 object-cover rounded-t-xl"
                />


                <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-100">{eventName}</h3>
                    <p className="mt-2 text-sm text-gray-600">{eventDate}</p>
                    <p className="text-sm text-gray-300">{eventLocation}</p>


                    <p className="mt-4 text-gray-700 text-sm">
                        {eventDescription.length > 100
                            ? eventDescription.substring(0, 100) + "..."
                            : eventDescription}
                    </p>


                    <div className="my-3">
                        <button
                            onClick={openPopup}
                            className="mx-auto bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            GET TICKET
                        </button>
                    </div>
                </div>
            </motion.div>

            {isPopupOpen && (
                <EmailVerificationPopup
                    eventUrl={eventUrl}
                    closePopup={closePopup}
                />
            )}
        </>
    );
};

export default EventCardExample;

// pages/index.js
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Carousel from './components/Carousel';
import EventCardExample from './components/Card';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { MarqueeDemo } from './components/MarqueeDemo';

export default function Home() {
  const [type, settype] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!type || !city) {
      alert('Please enter both event type and city.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Fetch new events from Ticketmaster & store in DB
      const postResponse = await fetch('http://localhost:5000/api/fetch-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, type }),
      });

      if (!postResponse.ok) {
        throw new Error('Failed to fetch new events');
      }

      // 2. Get stored events from DB
      const getResponse = await fetch('http://localhost:5000/api/events');
      if (!getResponse.ok) {
        throw new Error('Failed to load events from database');
      }

      const getData = await getResponse.json();
      setEvents(getData.events || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Carousel />
      </motion.div>

      {/* Welcome Section */}
      <motion.div
        className="container mx-auto text-center mt-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
          Welcome To Eventbux
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover and explore exciting events happening in your city!
        </p>
      </motion.div>

      <MarqueeDemo />

      {/* Search Section */}
      <motion.div
        className="container mx-auto mt-12 px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md flex flex-col md:flex-row gap-6 align-middle items-center justify-center">
          {/* Event Type Input */}
          <div className="w-full md:w-1/3">
            <label className="block mb-2 text-sm font-semibold text-white">Event Type</label>
            <input
              type='text'
              value={type}
              onChange={(e) => settype(e.target.value)}
              className="w-full border bg-gray-900 text-white appearance-none rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter event type (e.g. Music, Sports)"
            />
          </div>

          {/* City Input */}
          <div className="w-full md:w-1/3">
            <label className="block mb-2 text-sm font-semibold text-white">City</label>
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border bg-gray-900 text-white appearance-none rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter city name (e.g. Delhi, Mumbai)"
            />
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto">
            <ShinyButton onClick={handleSearch} className="mt-5">
              Click me
            </ShinyButton>
          </div>
        </div>
      </motion.div>

      {/* Display Events */}
      {loading && <p className="text-center mt-8 text-blue-500">Loading events...</p>}
      {error && <p className="text-center mt-8 text-red-500">{error}</p>}

      <div className="container mx-auto mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div
              key={event.id}
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <EventCardExample
                eventName={event.name}
                eventDate={event.date}
                eventLocation={event.city}
                eventDescription={event.genre}
                eventImage={event.image || "/placeholder.jpg"}
                eventUrl={event.url}
              />
            </motion.div>
          ))
        ) : (
          !loading && <p className="text-center col-span-3 text-gray-400">No events found.</p>
        )}
      </div>
    </>
  );
}

import { FaInstagram, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-white">Eventbux</h2>
                <p className="mt-2 text-sm text-gray-400">
                    Discover and explore exciting events near you.
                </p>

                {/* Social Icons */}
                <div className="flex justify-center mt-4 space-x-5">
                    <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
                    <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
                    <a href="#" className="hover:text-white"><FaFacebook size={20} /></a>
                    <a href="#" className="hover:text-white"><FaGithub size={20} /></a>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Eventbux. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

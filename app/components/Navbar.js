const Navbar = () => {

    return (
        <nav className="">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
                        Eventbux
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;

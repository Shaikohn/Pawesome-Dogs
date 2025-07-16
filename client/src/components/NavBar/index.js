import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white/70 backdrop-blur sticky top-0 z-50">
            <Link
                to="/dogs"
                className="text-2xl font-bold text-sky-600 hover:text-sky-700 transition-transform duration-200 hover:scale-105"
            >
                Pawesome Dogs
            </Link>
            <div className="flex gap-6 text-base font-medium">
                <Link
                    to="/dogs"
                    className="text-gray-700 hover:text-sky-600 transition-all duration-200 hover:scale-105 hover:underline underline-offset-4"
                >
                    Home
                </Link>
                <Link
                    to="/dogs/create"
                    className="text-gray-700 hover:text-sky-600 transition-all duration-200 hover:scale-105 hover:underline underline-offset-4"
                >
                    Create a Breed
                </Link>
            </div>
        </nav>
    );
}
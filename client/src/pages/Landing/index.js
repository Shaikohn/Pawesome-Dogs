import { NavLink } from "react-router-dom";
import pug from "../../assets/pug.jpg";
import golden from "../../assets/golden.jpg";
import family from "../../assets/family.jpg";
import littleDog from "../../assets/littleDog.jpg";

export default function Landing() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-sky-50 to-sky-100 text-gray-800">
            <h1 className="text-5xl font-bold mb-6 text-center animate-fade-in text-sky-600">
                Welcome to Pawesome Dogs
            </h1>
            <p className="text-lg mb-10 max-w-xl text-center animate-fade-in delay-100">
                Discover a wide variety of dog breeds, apply filters, find your favorite, and learn more about each one.
            </p>
            <NavLink
                to="/dogs"
                className="bg-sky-500 hover:bg-sky-600 transition px-6 py-3 rounded-xl text-lg font-semibold text-white shadow animate-fade-in delay-200"
            >
                Enter the App
            </NavLink>

            {/* Features */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-16 w-full max-w-5xl animate-fade-in delay-300">
                <div className="bg-white bg-opacity-70 backdrop-blur rounded-xl p-5 shadow text-center">
                    <h4 className="font-bold text-lg mb-1 text-sky-700">100+ Breeds</h4>
                    <p className="text-sm">Explore a complete dog breed database.</p>
                </div>
                <div className="bg-white bg-opacity-70 backdrop-blur rounded-xl p-5 shadow text-center">
                    <h4 className="font-bold text-lg mb-1 text-sky-700">Advanced Filters</h4>
                    <p className="text-sm">Search by size, temperament, and more.</p>
                </div>
                <div className="bg-white bg-opacity-70 backdrop-blur rounded-xl p-5 shadow text-center">
                    <h4 className="font-bold text-lg mb-1 text-sky-700">Create Your Own Breed</h4>
                    <p className="text-sm">Add your own dog breed and make it part of the app.</p>
                </div>
            </div>

            {/* Footer */}
            <p className="italic text-gray-600 mt-14 text-center max-w-xl animate-fade-in delay-500">
                “A dog is the only thing on earth that loves you more than he loves himself.” – Josh Billings
            </p>

            <div className="flex gap-4 mt-12 opacity-80 animate-fade-in delay-700">
                {[pug, golden, family, littleDog].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="dog"
                        className="w-20 h-20 object-cover rounded-full border-4 border-sky-200 shadow-md hover:scale-105 transition"
                    />
                ))}
            </div>
        </section>
    );
}
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDogs } from "../../redux/actions";
import Dog from "../../components/Home/ListOfDogs";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import Sort from "../../components/Home/Sort";
import Swal from "sweetalert2";
import Filters from "../../components/Home/Filters/Filters";

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.filteredDogs);
    const [search, setSearch] = useState("");
    const filtered = allDogs.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;
    const max = Math.ceil(filtered?.length / perPage);

    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);

    function filteredDog() {
        if (search.length === 0) {
            return allDogs;
        }
        if (filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Sorry, we couldn't find that breed",
                icon: "error",
                timer: 3000,
            });
            setCurrentPage(1);
            setSearch("");
        }
    return filtered;
    }

    function handleNextPage() {
        if (currentPage < max) {
            setCurrentPage(currentPage + 1);
        }
    }

    function handlePrevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleOnSearch(e) {
        setCurrentPage(1);
        setSearch(e.target.value);
    }

    return (
        <div className="min-h-screen bg-sky-50">
        <NavBar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-sky-700 tracking-tight mt-8 animate-fade-in">
                🐶 Explore the Most Amazing Dog Breeds in the World 🐾
            </h1>
            <p className="text-lg sm:text-xl text-center text-sky-600 mt-4 mb-8 max-w-3xl mx-auto animate-fade-in delay-100">
                Filter, sort, and discover your ideal companion among over 100 unique breeds.
            </p>
            {allDogs.length !== 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search Dogs"
                        value={search}
                        onChange={handleOnSearch}
                        className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition text-gray-700"
                    />
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* <CreatedByUser setCurrentPage={setCurrentPage} />
                        <FilterByTemperament setCurrentPage={setCurrentPage} /> */}
                        <Filters setCurrentPage={setCurrentPage} />
                        <Sort setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            )}

            {allDogs.length !== 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredDog()
                            .slice((currentPage - 1) * perPage, currentPage * perPage)
                            .map((d) => {
                                if (Array.isArray(d.temperaments)) {
                                    d.temperaments = d.temperaments.map((t) => t.name);
                                    d.temperaments = d.temperaments.join(", ");
                                    d.temperament = d.temperaments;
                                }
                                if (!d.weight_min || ["Na", "NaN", "aN"].includes(d.weight_min)) {
                                    if (!d.weight_max || ["Na", "NaN", "aN"].includes(d.weight_max)) {
                                        d.weight_min = "8";
                                    } else {
                                        d.weight_min = (d.weight_max - 2).toString();
                                    }
                                }
                                if (!d.weight_max || ["Na", "NaN", "aN"].includes(d.weight_max)) {
                                    if (!d.weight_min || ["Na", "NaN", "aN"].includes(d.weight_min)) {
                                        d.weight_max = "12";
                                    } else {
                                        d.weight_max = (parseInt(d.weight_min) + 7).toString();
                                    }
                                } 
                                if (!d.temperament) {
                                    d.temperament = "Stubborn, Active, Happy, Dutiful, Confident";
                                }

                                return (
                                    <Dog
                                        key={d.id}
                                        id={d.id}
                                        image={d.image}
                                        name={d.name}
                                        weight_max={d.weight_max}
                                        weight_min={d.weight_min}
                                        temperament={d.temperament}
                                        temperaments={d.temperaments}
                                        origin={d.origin}
                                    />
                                );
                        })}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center items-center flex-wrap gap-2 mt-8 text-sky-700 font-semibold">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md border border-sky-600 hover:bg-sky-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &#8592;
                        </button>
                        {[...Array(max).keys()]
                            .slice(
                                Math.max(currentPage - 3, 0),
                                Math.min(currentPage + 2, max)
                            )
                            .map((pageIndex) => (
                                <button
                                    key={pageIndex + 1}
                                    onClick={() => setCurrentPage(pageIndex + 1)}
                                    className={`px-3 py-1 rounded-md border ${currentPage === pageIndex + 1 ? "bg-sky-600 text-white border-sky-600" : "border-sky-600 text-sky-700 hover:bg-sky-200"}`}
                                >
                                    {pageIndex + 1}
                                </button>
                        ))}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === max}
                            className="px-3 py-1 rounded-md border border-sky-600 hover:bg-sky-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &#8594;
                        </button>
                    </div>
                </>
        ) : (
            <div className="flex justify-center mt-24">
                <Spinner />
            </div>
        )}
    </main>
    </div>
);
}

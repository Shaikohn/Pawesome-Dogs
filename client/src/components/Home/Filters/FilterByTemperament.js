import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, filterByTemperament } from "../../../redux/actions";

export default function FilterByTemperament({ setCurrentPage }) {
    const dispatch = useDispatch();
    const temp = useSelector((state) => state.temperaments);

    function handleFilter(e) {
        const value = e.target.value;
        setCurrentPage(1);
        dispatch(filterByTemperament(value));
    }

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch]);

    return (
        <div className="mb-4">
            <select
                onChange={handleFilter}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition text-sm"
                defaultValue=""
            >
                <option value="" disabled>Select One</option>
                <option value="All">All Temperaments</option>
                {temp &&
                    temp.map((t, i) => (
                        <option key={i} value={t.name}>
                            {t.name}
                        </option>
                ))}
            </select>
        </div>
    );
}

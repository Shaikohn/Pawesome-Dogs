import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament, filterByTemperament } from "../../../redux/actions";
import { filterCreatedDogs } from "../../../redux/actions";

export default function Filters({ setCurrentPage }) {
    const dispatch = useDispatch();
    const temp = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(getTemperament());
    }, [dispatch]);

    function handleFilter() {
        const dogValue = document.getElementById("dogs").value;
        let temperamentValue = document.getElementById("temperaments").value;
        setCurrentPage(1);
        console.log(dogValue, temperamentValue);
        
        if (temperamentValue === "All") {
            dispatch(filterCreatedDogs(dogValue));
        } else {
            dispatch(filterCreatedDogs(dogValue));
            dispatch(filterByTemperament(temperamentValue));
            
        }
    }

    return (
        <>
        <div className="mb-4">
            <select
                onChange={handleFilter}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition text-sm"
                id="dogs"
            >
                <option value="All">All Dogs</option>
                <option value="Api">API Dogs</option>
                <option value="Created by users">Users Dogs</option>
            </select>
        </div>
        <div className="mb-4">
            <select
                onChange={handleFilter}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition text-sm"
                defaultValue="All"
                id="temperaments"
            >
                <option value="All">All Temperaments</option>
                {temp &&
                    temp.map((t, i) => (
                        <option key={i} value={t.name}>
                            {t.name}
                        </option>
                ))}
            </select>
        </div>
        </>
    );
}

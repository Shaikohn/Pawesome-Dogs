/* import { Link } from "react-router-dom"; */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDogs } from "../../redux/actions";
import Dog from "../../components/Home/ListOfDogs";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import CreatedByUser from "../../components/Home/Filters/CreatedByUser";
import FilterByTemperament from "../../components/Home/Filters/FilterByTemperament";
import styles from "./index.module.css"
import Sort from "../../components/Home/Sort";

export default function Home() {
    let dispatch = useDispatch()
    let allDogs = useSelector((state) => state.allDogs)
    console.log(allDogs)
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    function filteredDogs() {
        if(search.length === 0) {
            return allDogs.slice(currentPage, currentPage + 8);
        } 
        const filtered = allDogs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
        if(filtered.length === 0) {
            console.log("Sorry, we couldn't find that breed")
        } 
        return filtered.slice(currentPage, currentPage + 8)
    }

    function handleNextPage() {
        if(allDogs.filter(d => d.name.includes(search)).length > currentPage + 8) {
            setCurrentPage(currentPage + 8)

        }
    }

    function handlePrevPage() {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 8)
        }
    }

    function handleOnSearch(e) {
        setCurrentPage(0)
        setSearch(e.target.value)
    }

    return (
        <div>
            <NavBar />
            <h1 className={styles.title}>Search your favorite breeds!</h1>
            <div className={styles.pagesContainer} >
                <button className={styles.pagesButtons} onClick={handlePrevPage}>{"<"}</button>
                <input className={styles.inputs} onChange={handleOnSearch} placeholder="Search Dogs" type="text" value={search} />
                <CreatedByUser currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <FilterByTemperament currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Sort currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <button className={styles.pagesButtons} onClick={handleNextPage}>{">"}</button>
            </div>
            {
                allDogs.length !== 0 ? filteredDogs().map((d) => {

                    if(Array.isArray(d.temperaments)) {
                        d.temperaments = d.temperaments.map(t => t.name)
                        d.temperaments = d.temperaments.join(", ")
                        d.temperament = d.temperaments
                    }
                    if(!d.weight_min || d.weight_min === "Na" || d.weight_min === "NaN" || d.weight_min === "aN") {
                        if(!d.weight_max || d.weight_max === "Na" || d.weight_max === "NaN" || d.weight_max === "aN") {
                            d.weight_min = "8"
                        } else {
                            d.weight_min = (d.weight_max - 2).toString();
                        }
                    }
                    
                    if(!d.weight_max || d.weight_max === "Na" || d.weight_max === "NaN" || d.weight_max === "aN") {
                    if(!d.weight_min || d.weight_min === "Na" || d.weight_min === "NaN" || d.weight_min === "aN") {
                            d.weight_max = "12"
                        } else {
                            d.weight_max = (parseInt(d.weight_min) + 7).toString();
                        }
                    }

                    return <Dog 
                    id={d.id}
                    image={d.image} 
                    name={d.name} 
                    weight_max={d.weight_max} 
                    weight_min={d.weight_min}
                    temperament={d.temperament}
                    temperaments={d.temperaments}  
                    key={d.id} /> 
                }) : <Spinner /> 
            }
        </div>
    )
}
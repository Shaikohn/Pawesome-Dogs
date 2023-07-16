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
import Swal from "sweetalert2"
import LeftArrow from "../../components/SVG/LeftArrow";
import RightArrow from "../../components/SVG/RightArrow";

export default function Home() {
    let dispatch = useDispatch()
    let allDogs = useSelector((state) => state.filteredDogs)
    const [search, setSearch] = useState('')
    const filtered = allDogs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    let [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const max = Math.ceil(filtered?.length / perPage)

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    function filteredDog() {
        if(search.length === 0) {
            return allDogs
        } 
        if(filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that breed',
                icon: "error",
                timer: 3000,
            });
            setCurrentPage(1)
            setSearch("")
        } 
        return filtered
    }

    function handleNextPage() {
        if(currentPage < max) {
            /* setInput(input + 1) */
            setCurrentPage(currentPage + 1)
        }
    }

    function handlePrevPage() {
        if(currentPage > 1) {
            /* setInput(input - 1) */
            setCurrentPage(currentPage - 1)
        }
    }

    function handleOnSearch(e) {
        setCurrentPage(1)
        setSearch(e.target.value)
    }

    return (
        <div>
            <NavBar />
            <h1 className={styles.title}>Search your favorite breeds!</h1>
            {
                allDogs.length !== 0 ?
                <div className={styles.floatContainer} >
                <input className={styles.inputs} onChange={handleOnSearch} placeholder="Search Dogs" type="text" value={search} />
                <CreatedByUser currentPage={currentPage} setCurrentPage={setCurrentPage}  />
                <FilterByTemperament currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Sort currentPage={currentPage} setCurrentPage={setCurrentPage}  />
                <div className={styles.pagesContainer}>
                    <button className={styles.pagesButtons} onClick={handlePrevPage}><LeftArrow /></button>
                    {currentPage} of {max}
                    <button className={styles.pagesButtons} onClick={handleNextPage}><RightArrow /></button>
                </div>
            </div> : ''
            }
            {
                allDogs.length !== 0 ? filteredDog()
                .slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
                .map((d) => {
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

                    if(!d.temperament) {
                        d.temperament = "Stubborn, Active, Happy, Dutiful, Confident"
                    }

                    return <Dog 
                    id={d.id}
                    image={d.image} 
                    name={d.name} 
                    weight_max={d.weight_max} 
                    weight_min={d.weight_min}
                    temperament={d.temperament}
                    temperaments={d.temperaments}  
                    key={d.id}
                    origin={d.origin} /> 
                }) : <Spinner /> 
            }
        </div>
    )
}
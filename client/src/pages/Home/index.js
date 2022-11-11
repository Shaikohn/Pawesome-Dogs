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

export default function Home() {
    let dispatch = useDispatch()
    let allDogs = useSelector((state) => state.allDogs)
    console.log('All dogs', allDogs)
    let [currentPage, setCurrentPage] = useState(0)
    let [numberPage, setNumberPage] = useState(1)
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
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that breed',
                icon: "error",
                timer: 3000,
            });
            setCurrentPage(0)
            setNumberPage(1)
            setSearch("")
        } 
        return filtered.slice(currentPage, currentPage + 8)
    }

    function handleNextPage() {
        if(allDogs.filter(d => d.name.includes(search)).length > currentPage + 8) {
            setCurrentPage(currentPage + 8)
            setNumberPage(numberPage + 1)
        }
    }

    function handlePrevPage() {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 8)
            setNumberPage(numberPage - 1)
        }
    }

    function handleOnSearch(e) {
        setCurrentPage(0)
        setSearch(e.target.value)
        setNumberPage(1)
    }

    return (
        <div>
            <NavBar />
            <h1 className={styles.title}>Search your favorite breeds!</h1>
            <div className={styles.pagesContainer} >
                {numberPage}
                <button className={styles.pagesButtons} onClick={handlePrevPage}>{"<"}</button>
                <input className={styles.inputs} onChange={handleOnSearch} placeholder="Search Dogs" type="text" value={search} />
                <CreatedByUser currentPage={currentPage} setCurrentPage={setCurrentPage} setNumberPage={setNumberPage}  />
                <FilterByTemperament currentPage={currentPage} setCurrentPage={setCurrentPage} setNumberPage={setNumberPage} />
                <Sort currentPage={currentPage} setCurrentPage={setCurrentPage} setNumberPage={setNumberPage}  />
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
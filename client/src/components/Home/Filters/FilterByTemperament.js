import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTemperament, filterByTemperament } from "../../../redux/actions"
import styles from "./Temperament.module.css"


export default function FilterByTemperament({setCurrentPage}) {

    const dispatch = useDispatch()
    const temp = useSelector(state => state.temperaments)

    function handleFilter(e) {
        const value = e.target.value
        setCurrentPage(1)
        dispatch(filterByTemperament(value))
    }

    useEffect(() => {
        dispatch(getTemperament())
    }, [dispatch])

    return (
        <div>
            <select className={styles.selector} onChange={handleFilter}>
                <option defaultValue disabled>Select One</option>
                <option value="All">All Temperaments</option>
                    {temp && temp.map((t, i) => {
                        return (
                            <option value={t.name} key={i}>{t.name}</option>
                            )
                    })}
            </select>
        </div>
    )
}
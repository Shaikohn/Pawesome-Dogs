import { useDispatch } from "react-redux"
import { filterCreatedDogs } from "../../../redux/actions"
import styles from "./User.module.css"


export default function CreatedByUser ({setCurrentPage}) {

    const dispatch = useDispatch()

    function handleSelect(e) {
        const value = e.target.value
        setCurrentPage(1)
        dispatch(filterCreatedDogs(value))
    }

    return (
        <div>
            <select className={styles.selector} onChange={handleSelect}>
                <option defaultValue value="All">All Dogs</option>
                <option value="Api">API Dogs</option>
                <option value="Created by users">Users Dogs</option>
            </select>
        </div>
    )
}
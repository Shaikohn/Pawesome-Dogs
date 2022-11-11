import { useDispatch } from "react-redux";
import { orderByName, orderByWeight } from "../../../redux/actions";
import styles from "./index.module.css"

export default function Sort({currentPage, setCurrentPage, setNumberPage}) {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "name_asc" || value === "name_dsc") {
            setCurrentPage(0)
            setNumberPage(1)
            dispatch(orderByName(value))
        } 
        if(value === "weight_asc" || value === "weight_dsc") {
            setCurrentPage(0)
            setNumberPage(1)
            dispatch(orderByWeight(value))
        }
    } 


    return (
        <div>
            <select className={styles.sortSelector} defaultValue={"name_asc"} onChange={handleChange}>
                <option value="name_asc"> Name (ASC) </option>
                <option value="name_dsc" > Name (DSC) </option>
                <option value="weight_asc"> Weight (ASC) </option>
                <option value="weight_dsc"> Weight (DSC) </option>
            </select>
        </div>
    )
}
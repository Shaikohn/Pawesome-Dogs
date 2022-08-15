import { Link } from "react-router-dom"
import styles from "./index.module.css"

export default function Dog ({name, image, id, temperament, temperaments, weight_min, weight_max}) {

    if(Array.isArray(temperaments)) {
        temperaments = temperaments.map(t => t.name)
        temperaments = temperaments.join(", ")
    }

    if(!weight_min || weight_min === "Na" || weight_min === "NaN" || weight_min === "aN") {
        if(!weight_max || weight_max === "Na" || weight_max === "NaN" || weight_max === "aN") {
            weight_min = "8"
        } else {
            weight_min = (weight_max - 2).toString();
        }
    }
    
    if(!weight_max || weight_max === "Na" || weight_max === "NaN" || weight_max === "aN") {
    if(!weight_min || weight_min === "Na" || weight_min === "NaN" || weight_min === "aN") {
            weight_max = "12"
        } else {
            weight_max = (parseInt(weight_min) + 7).toString();
        }
    }

    if(!temperament) {
        temperament = "Stubborn, Active, Happy, Dutiful, Confident"
    }

    return (
        <Link className={styles.linkStyle} to={`/dogs/${id}`}>
        <div key={id} className={styles.container}>
            <div className={styles.div_image} >
                <img alt={name} className={styles.image} src={image} />
            </div>
            <div className={styles.div_info}>
                <div>
                    <h3> {name} </h3>
                </div>
                <div>
                    <h4> {`${weight_min} - ${weight_max}`} KG </h4>
                </div>
                <div>
                    {temperament ? temperament : temperaments} 
                </div>
            </div>
        </div>
        </Link>
    )
}
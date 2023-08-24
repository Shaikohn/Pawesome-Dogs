import { Link } from "react-router-dom"
import styles from "./index.module.css"

export default function Dog ({name, image, id, temperament, weight_min, weight_max, origin}) {
    return (
        <Link className={styles.container} to={`/dogs/${id}`} key={id}>
            <div className={styles.div_image} >
                <img alt={name} className={styles.image} src={`https://api.thedogapi.com/v1/images/${image}`} />
            </div>
            <div className={styles.div_info}>
                <div>
                    <p className={styles.name}> {name} ({`${weight_min} - ${weight_max}`} KG)  </p>
                </div>
                <div>
                    <p className={styles.temperaments}>{temperament}</p>
                </div>
                {/* <div>
                    <p>{origin}</p>
                </div> */}
            </div>
        </Link>
    )
}
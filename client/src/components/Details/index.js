import styles from "./index.module.css"

export default function Details({dog}) {
    
    if(Array.isArray(dog.temperaments)) {
        dog.temperaments = dog.temperaments.map(t => t.name)
        dog.temperaments = dog.temperaments.join(", ")
    }

    if(!dog.weight_min || dog.weight_min === "Na" || dog.weight_min === "NaN" || dog.weight_min === "aN") {
        if(!dog.weight_max || dog.weight_max === "Na" || dog.weight_max === "NaN" || dog.weight_max === "aN") {
            dog.weight_min = "8"
        } else {
            dog.weight_min = (dog.weight_max - 2).toString();
        }
    }

    if(!dog.weight_max || dog.weight_max === "Na" || dog.weight_max === "NaN" || dog.weight_max === "aN") {
        if(!dog.weight_min || dog.weight_min === "Na" || dog.weight_min === "NaN" || dog.weight_min === "aN") {
            dog.weight_max = "12"
        } else {
            dog.weight_max = (parseInt(dog.weight_min) + 7).toString();
        }
    }

    if(!dog.height_max) {
        if(!dog.height_min) {
            dog.height_max = "42"
        } else {
            dog.height_max = (parseInt(dog.height_min) + 3).toString();
        }
    }

    if(!dog.life_span_max) {
        if(!dog.life_span_min) {
            dog.life_span_max = "19"
        } else {
            dog.life_span_max = (parseInt(dog.life_span_min) + 2).toString();
        }
    }

    if(!dog.temperament) {
        dog.temperament = "Stubborn, Active, Happy, Dutiful, Confident"
    }


    return (
        <div>
            {
            <div className={styles.container} key={dog?.id}>
                <div>
                    <img alt={dog?.name} className={styles.image} src={dog?.image} /> 
                </div>
            <div className={styles.infoContainer}>
                <div>
                    <h1 className={styles.title}> {dog?.name} </h1>
                </div>
                <div>
                    <p className={styles.info}> Life span: {`${dog?.life_span_min} - ${dog?.life_span_max}` } years </p>
                </div>
                <div>
                    <p className={styles.info}> Weight: {`${dog?.weight_min} - ${dog?.weight_max}`} KG </p>
                </div>
                <div>
                <div>
                    <p className={styles.info}> Height: {`${dog?.height_min} - ${dog?.height_max}`} CM</p>
                </div>
                    <p className={styles.info}>Temperament: {dog?.temperaments ? dog?.temperaments : dog?.temperament}   </p>
                </div>
            </div>
        </div> 
            }
            
        </div>
    )
}
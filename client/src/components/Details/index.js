export default function Details({ dog }) {
    if (Array.isArray(dog.temperaments)) {
        dog.temperaments = dog.temperaments.map(t => t.name).join(", ");
    }

    if (!dog.weight_min || dog.weight_min === "Na" || dog.weight_min === "NaN" || dog.weight_min === "aN") {
        if (!dog.weight_max || dog.weight_max === "Na" || dog.weight_max === "NaN" || dog.weight_max === "aN") {
            dog.weight_min = "8";
        } else {
            dog.weight_min = (dog.weight_max - 2).toString();
        }
    }

    if (!dog.weight_max || dog.weight_max === "Na" || dog.weight_max === "NaN" || dog.weight_max === "aN") {
        if (!dog.weight_min || dog.weight_min === "Na" || dog.weight_min === "NaN" || dog.weight_min === "aN") {
            dog.weight_max = "12";
        } else {
            dog.weight_max = (parseInt(dog.weight_min) + 7).toString();
        }
    }

    if (!dog.height_max) {
        if (!dog.height_min) {
            dog.height_max = "42";
        } else {
            dog.height_max = (parseInt(dog.height_min) + 3).toString();
        }
    }

    if (!dog.life_span_max) {
        if (!dog.life_span_min) {
            dog.life_span_max = "19";
        } else {
            dog.life_span_max = (parseInt(dog.life_span_min) + 2).toString();
        }
    }

    if (!dog.temperament) {
        dog.temperament = "Stubborn, Active, Happy, Dutiful, Confident";
    }

    return (
        <div className="min-h-screen bg-sky-50 py-16 px-4 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-sky-200 py-5 rounded-t-2xl text-center shadow mb-6 animate-zoom-in">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-800 flex justify-center items-center gap-2">
                    🐾 Meet {dog?.name}
                </h2>
            </div>
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden animate-zoom-in">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={dog?.image}
                            alt={dog?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-center gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                            <div className="flex items-center gap-2">
                                <span className="text-sky-600 text-xl">🎂</span>
                                <p><strong>Life Span:</strong> {dog.life_span_min} - {dog.life_span_max} years</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sky-600 text-xl">⚖️</span>
                                <p><strong>Weight:</strong> {dog.weight_min} - {dog.weight_max} KG</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sky-600 text-xl">📏</span>
                                <p><strong>Height:</strong> {dog.height_min} - {dog.height_max} CM</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-sky-600 text-xl">🧠</span>
                                <p><strong>Temperament:</strong> {dog.temperaments || dog.temperament}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 bg-sky-100 p-4 rounded-xl text-center shadow w-full max-w-4xl animate-zoom-in">
                <p className="italic text-sky-700">
                    “Every dog has its day – make this one unforgettable.”
                </p>
            </div>
        </div>
    );
}
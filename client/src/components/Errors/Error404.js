import { useHistory } from "react-router-dom";
import sad_dog from "../../assets/dog-sad.gif";
import NavBar from "../NavBar";

export default function Error404() {
    const history = useHistory();

    function handleClick() {
        history.goBack();
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 flex flex-col items-center justify-center px-6 py-16 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-sky-700 mb-6 animate-fade-in">
                    Oops! This page doesn't exist 🐾
                </h1>
                <p className="text-lg text-sky-600 mb-10 animate-fade-in delay-100">
                    Maybe the dog chewed up the URL...
                </p>
                <img
                    src={sad_dog}
                    alt="Sad Dog"
                    className="w-60 h-auto mb-10 rounded-xl shadow-lg animate-fade-in delay-200"
                />
                <button
                    onClick={handleClick}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition animate-fade-in delay-300"
                >
                    ⬅️ Go Back
                </button>
            </div>
        </>
    );
}
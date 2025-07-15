import spinner from "../../assets/spinner.png"

export default function Spinner() {
    return (
        <div className="flex justify-center items-center">
            <img
                src={spinner}
                alt="Loading..."
                className="w-48 h-48 animate-spin"
                style={{ animationDuration: '2.5s' }}
            />
        </div>
    );
}
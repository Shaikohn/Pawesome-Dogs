import { Link } from "react-router-dom";

export default function Dog({ name, image, id, temperament, weight_min, weight_max }) {
  return (
    <Link
      to={`/dogs/${id}`}
      className="bg-blue-50 rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
    >
      <img
        alt={name}
        src={image}
        className="w-full h-48"
      />
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-blue-900 mb-1">{name}</h3>
        <p className="text-sm text-blue-800 mb-1">
          Peso: {weight_min} - {weight_max} kg
        </p>
        <p className="text-sm text-blue-700 italic">{temperament}</p>
      </div>
    </Link>
  );
}
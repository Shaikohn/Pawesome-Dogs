import { useDispatch } from "react-redux";
import { orderByName, orderByWeight } from "../../../redux/actions";

export default function Sort({ setCurrentPage }) {
  const dispatch = useDispatch();

  function handleChange(e) {
    const value = e.target.value;
    setCurrentPage(1);
    if (value === "name_asc" || value === "name_dsc") {
      dispatch(orderByName(value));
    } else if (value === "weight_asc" || value === "weight_dsc") {
      dispatch(orderByWeight(value));
    }
  }

  return (
    <div className="mb-4">
      <select
        onChange={handleChange}
        defaultValue="name_asc"
        className="px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition text-sm"
      >
        <option value="name_asc">Name (ASC)</option>
        <option value="name_dsc">Name (DSC)</option>
        <option value="weight_asc">Weight (ASC)</option>
        <option value="weight_dsc">Weight (DSC)</option>
      </select>
    </div>
  );
}

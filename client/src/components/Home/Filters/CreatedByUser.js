import { useDispatch } from "react-redux";
import { filterCreatedDogs } from "../../../redux/actions";

export default function CreatedByUser({ setCurrentPage }) {
  const dispatch = useDispatch();

  function handleSelect(e) {
    const value = e.target.value;
    setCurrentPage(1);
    dispatch(filterCreatedDogs(value));
  }

  return (
    <div className="mb-4">
      <select
        onChange={handleSelect}
        className="px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-300 transition text-sm"
      >
        <option value="All">All Dogs</option>
        <option value="Api">API Dogs</option>
        <option value="Created by users">Users Dogs</option>
      </select>
    </div>
  );
}

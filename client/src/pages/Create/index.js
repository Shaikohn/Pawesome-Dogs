import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/NavBar';
import { getTemperament, postDog } from '../../redux/actions';
import Swal from "sweetalert2"
import addBreedImage from "../../assets/addBreed.jpg"

function validate(value) {
  let errors = {};
  if (!value.image) errors.image = "An image is required!";
  if (!value.name) errors.name = "Name is required!";
  else if (!/[A-Z]+$/i.test(value.name)) errors.name = "The name should only contain letters!";
  else if (value.name.length >= 25) errors.name = "The name should contain less than 25 characters!";

  if (!value.life_span_max) errors.life_span_max = "Life span max is required!";
  else if (!/^[0-9]+$/.test(value.life_span_max)) errors.life_span_max = "The max should only contain numbers!";

  if (!value.life_span_min) errors.life_span_min = "Life span min is required!";
  else if (parseInt(value.life_span_min) < 0) errors.life_span_min = "The min should be more than 0 years!";
  else if (parseInt(value.life_span_min) >= parseInt(value.life_span_max)) errors.life_span_min = "The min should be less than the max!";
  else if (!/^[0-9]+$/.test(value.life_span_min)) errors.life_span_min = "The min should only contain numbers!";

  if (!value.weight_max) errors.weight_max = "Weight max is required!";
  else if (parseInt(value.weight_max) > 90) errors.weight_max = "The max should be less than 90 KG!";
  else if (!/^[0-9]+$/.test(value.weight_max)) errors.weight_max = "The max should only contain numbers!";

  if (!value.weight_min) errors.weight_min = "Weight min is required!";
  else if (parseInt(value.weight_min) < 0) errors.weight_min = "The min should be more than 0 KG!";
  else if (parseInt(value.weight_min) >= parseInt(value.weight_max)) errors.weight_min = "The min should be less than the max!";
  else if (!/^[0-9]+$/.test(value.weight_min)) errors.weight_min = "The min should only contain numbers!";

  if (!value.height_max) errors.height_max = "Height max is required!";
  else if (parseInt(value.height_max) > 85) errors.height_max = "The max should be less than 85 CM!";
  else if (!/^[0-9]+$/.test(value.height_max)) errors.height_max = "The max should only contain numbers!";

  if (!value.height_min) errors.height_min = "Height min is required!";
  else if (parseInt(value.height_min) < 0) errors.height_min = "The min should be more than 0 CM!";
  else if (parseInt(value.height_min) >= parseInt(value.height_max)) errors.height_min = "The min should be less than the max!";
  else if (!/^[0-9]+$/.test(value.height_min)) errors.height_min = "The min should only contain numbers!";

  if (value.temperament.length === 0) errors.temperament = "At least one temperament is required!";
  return errors;
}

export default function Create() {
    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)
    const [errors, setErrors] = useState({});
    const [selectNameState, setSelectNameState] = useState([])
    const [input, setInput] = useState({
        image:"",
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperament: []
    })

    useEffect(()=> {
        dispatch(getTemperament())
    }, [dispatch])

    function handleChange(e){
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(validate({ ...input, [e.target.name]: e.target.value }))
    }

    function handleSelect(e){
        if(input.temperament.includes(e.target.value)) return;
        const selectName = e.target.value;
        if(selectName === "default") return;

        setInput({...input , temperament:[...input.temperament, selectName]})
        setSelectNameState([...selectNameState, temperaments.find(e => e.id === parseInt(selectName))])
    }

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length === 0) {
            dispatch(postDog(input))
            setInput({
                image:"",
                name: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_span_min: "",
                life_span_max: "",
                temperament: []
            })
            setSelectNameState([])
            Swal.fire({ title: "Success", text: 'Dog created!', icon: "success", timer: 3000 });
        } else {
            Swal.fire({ title: "Error", text: 'Complete all the info!', icon: "error", timer: 3000 });
        } 
    }

    function handleDelete(e) {
        setInput({...input, temperament : input.temperament.filter(t => t !== e.target.value)})
        setSelectNameState(selectNameState.filter(t => t.id !== parseInt(e.target.value)))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
            <NavBar />
            <div className="max-w-5xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 backdrop-blur rounded-xl p-8 shadow-md">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-sky-700 tracking-tight mb-4 animate-fade-in">
  🐾 Let's Create a New Best Friend! 🐶
</h1>
<p className="text-center text-sky-600 text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
  Fill in the details below to design your own unique dog breed and add it to our collection.
</p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <input name="name" type="text" placeholder="Name" value={input.name} onChange={handleChange} className="w-full px-4 py-2 rounded-xl ring-1 ring-sky-200 shadow-md bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                        <input name="image" type="text" placeholder="Insert an image URL" value={input.image} onChange={handleChange} className="w-full px-4 py-2 rounded-xl ring-1 ring-sky-200 shadow-md bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-sky-700">Life Span (Years)</label>
                            <div className="flex gap-2">
                                <input name="life_span_min" placeholder="Min" value={input.life_span_min} onChange={handleChange} className="w-full px-3 py-2 rounded-xl ring-1 ring-sky-200 bg-white bg-opacity-90 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                                <input name="life_span_max" placeholder="Max" value={input.life_span_max} onChange={handleChange} className="w-full px-3 py-2 rounded-xl ring-1 ring-sky-200 bg-white bg-opacity-90 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-sky-700">Weight (KG)</label>
                            <div className="flex gap-2">
                                <input name="weight_min" placeholder="Min" value={input.weight_min} onChange={handleChange} className="w-full px-3 py-2 rounded-xl ring-1 ring-sky-200 bg-white bg-opacity-90 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                                <input name="weight_max" placeholder="Max" value={input.weight_max} onChange={handleChange} className="w-full px-3 py-2 rounded-xl ring-1 ring-sky-200 bg-white bg-opacity-90 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-sky-700">Height (CM)</label>
                            <div className="flex gap-2">
                                <input name="height_min" placeholder="Min" value={input.height_min} onChange={handleChange} className="w-full px-3 py-2 rounded-xl ring-1 ring-sky-200 bg-white bg-opacity-90 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                                <input name="height_max" placeholder="Max" value={input.height_max} onChange={handleChange} className="w-full px-3 py-2 rounded-xl ring-1 ring-sky-200 bg-white bg-opacity-90 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400 transition" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-sky-700">Temperaments</label>
                        <select name="temperament" multiple value={input.temperament} onChange={handleSelect} className="w-full h-40 px-4 py-2 rounded-xl ring-1 ring-sky-200 shadow-md bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400 transition overflow-y-auto">
                            {temperaments.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {selectNameState.map((e, i) => (
                                <span key={i} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    {e.name}
                                    <button type='button' value={e.id} onClick={handleDelete} className="text-red-500 hover:text-red-700">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <input type="submit" value="Create a new breed" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition" />
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="mt-6 text-red-500 text-sm space-y-1">
                            {Object.values(errors).map((err, i) => <p key={i}>• {err}</p>)}
                        </div>
                    )}
                    <div className="mt-8 bg-sky-100 bg-opacity-70 rounded-xl p-4 text-sky-800 shadow-inner text-sm sm:text-base text-center max-w-2xl mx-auto">
  💡 <strong>Tip:</strong> You can use any valid image URL or you can try with a random URL from <a href="https://api.thedogapi.com/v1/images/search" target="_blank" rel="noopener noreferrer" className="text-sky-600 underline hover:text-sky-800">The Dog API</a>!
</div>
                </form>
                
            </div>
        </div>
    )
}
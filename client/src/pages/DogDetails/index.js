import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Details from "../../components/Details";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import { clearPage, getDogDetails } from "../../redux/actions";

export default function DogDetails() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const dog = useSelector((state) => state.details) 
    console.log(dog)
    useEffect(() => {
        dispatch(getDogDetails(id))
        return () => {
            dispatch(clearPage())
        }
    }, [dispatch, id])

    return (
        <div>
            <NavBar />
            {
                dog[0] === undefined ? <Spinner /> : <Details dog={dog[0]} />
            }
        </div>
    )
}
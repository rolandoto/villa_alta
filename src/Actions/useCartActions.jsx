import { addItemToCart, loadingCart, removetoCart ,removeALL} from "../reducers/CartReduccers"
import { useDispatch } from "react-redux"

const useCartActions =() =>{

    const dispatch =  useDispatch()

    const AddCart = async(product) =>{
        dispatch(loadingCart())
        setTimeout(() => {
            dispatch(addItemToCart(product));
          }, 500); // Simulate a loading delay
    }

    const RemoveCart = async(product) =>{
        dispatch(loadingCart())
        setTimeout(() => {
            dispatch(removetoCart(product));
          }, 500); // Simulate a loading delay
    }

    const RemoveCartAll = async(product) =>{
        dispatch(loadingCart())
        setTimeout(() => {
            dispatch(removeALL(product));
          }, 500); // Simulate a loading delay
    }

    return {
        AddCart,
        RemoveCart,
        RemoveCartAll
    }

}

export default useCartActions
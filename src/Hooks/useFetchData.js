import { useEffect } from "react";
import useReservationCreate from "../Actions/useReservationCreate";

const useFetchData = () => {

    const {getCountry} =useReservationCreate()

    useEffect(() => {
      const fetchData = async () => {
        try {
          await getCountry();
        } catch (error) {
          console.error('Error fetching country data:', error);
        }
      };
  
      fetchData();
    }, []);
  };

export default useFetchData
import react from "react"
import Header from "../../Component/Header/Header"
import Masonry from "react-masonry-css";
import { Helmet } from "react-helmet";

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  500: 1,
};

const Gallery =() =>{

    const images = [
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20PREMIUM%20SENCILLA%207/BA%C3%91O%20-%20HAB%206%20Y%207.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%204/SUITE%20DUPLEX%20HAB-4%20CAMA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20PREMIUM%20SENCILLA%207/HABITACION%20PREMIUM%20-%20SENCILLA%207.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20PREMIUM%20SENCILLA%207/HABITACION%20PREMIUM%20SENCILLA%207.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%206/SUITE%20DUPLEX%20-6%20SIN%20BALCON.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%206/SUITE%20DUPLEX%20-HAB%206%20SIN%20BALCON.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%206/SUITE%20DUPLEX%20HAB-6%20CAMA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%201/LOBBY%202PISO.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%201/LOBBY%20HUESPEDES.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%201/SUITE%20DUPLEX%201%20ANTESALA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%202/SUITE%20DUPLEX%202-CAMA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%202/SUITE%20DUPLEX%202.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%202/HAB%20SUITE%20DUPLEX%20-2.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%203/SUITE%20DUPLEX%20-3.jpg?raw=truep",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%203/SUITE%20DUPLEX%20-hab%203.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%203/SUITE%20DUPLEX%20HAB-3%20CAMA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%204/SUITE%20DUPLEX%20HAB-4.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%204/BA%C3%91O%20SUITE%20%23%204.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%204/SUITE%20DUPLEX%20HAB-4%20CAMA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%204/SUITE%20DUPLEX%20HAB-4.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%205/BA%C3%91O%20SUITE%205.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%205/SUITE%20DUPLEX%20-5.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%205/SUITE%20DUPLEX%20-5CAMA.jpg?raw=true",
        "https://github.com/rolandoto/image-pms/blob/main/FOTOS%20HOTEL%20VILLA%20ALTA/HABITACION%20SUITE%20BALCON%205/SUITE%20DUPLEX%20HAB%205.jpg?raw=true",

      ];  

    return <>
        <Header />
        <Helmet>
                <title>Galleria Hotel villa alta guest house</title>
                <meta name="description" content="Habitaciones Black Friday - 10% de Descuento en hotel la naval." />
                <link rel="canonical" href="https://www.villaaltaguesthouse.com/gallery" />
        </Helmet>


        <div className="p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index}`}
            className="w-full mb-4 rounded-xl shadow-md"
          />
        ))}
      </Masonry>
    </div>

        </>

}
export default  Gallery
import react from "react"
import Header from "../../Component/Header/Header"
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  500: 1,
};

const Gallery =() =>{

    const images = [
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",

        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",

        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
        "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
             "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",

                  "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",     "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
                  "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",

                  "https://selvario36hotel.com/wp-content/uploads/2025/04/home-banner-1-desktop-2-1.webp",
      ];  

    return <>
    
        <Header />

        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
            {images.map((src, idx) => (
                <img key={idx} src={src} alt="" className="rounded-xl w-full mb-4" />
            ))}
            </Masonry>

        </>

}
export default  Gallery
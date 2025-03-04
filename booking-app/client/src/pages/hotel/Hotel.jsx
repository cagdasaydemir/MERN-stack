import "./hotel.css"
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch"
import {  useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`)
  const { user } = useContext(AuthContext)
  const { dates, options } = useContext(SearchContext)
  const navigate = useNavigate()
  console.log(dates)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays;
  }
const days = dayDifference(dates[0].startDate, dates[0].endDate)
  const handleOpen = (index) => {
    setSlideNumber(index);
    setSliderOpen(true);
  }
  
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  useEffect(() => {
    if (sliderOpen) {
      document.body
        .style.overflow = 'hidden'
    } else {
      document.body
        .style.overflow = 'unset'
    }

  }, [sliderOpen])

const handleClick = () =>{
  if(user){
    setModalOpen(true)
  }else{
    navigate("/login")
  }
}

  return (
    <div className="container">
      <Navbar />
      <Header type="list" />
      {loading ? "Loading..." :
        (<>
          {sliderOpen && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setSliderOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("left")}
              />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("right")}
              />
            </div>
          )}
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">Excellent location – {data.distance}m from center</span>
              <span className="hotelPriceHighlight"> Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
              <div className="hotelImages">
                {data.photos?.map((photo, index) => (
                  <div className="hotelImgWrapper">
                    <img onClick={() => handleOpen(index)} src={photo} className="hotelImg" />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                    {data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                  </h2>
                  <button onClick={handleClick} >Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>)
      }
      {modalOpen && <Reserve setOpen={setModalOpen} hotelId={id}/> }
    </div>
  )
}

export default Hotel
import "./featuredProperties.css"
import useFetch from "../../hooks/useFetch"

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4")
  return (
    <div className="fp">
      {loading ? "Loading" :
       <>
      {data.map((item,i) => (
        <div className="fpItem" key={i}>
          <img src={item.photos[0]} />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Wonderful</span>
          </div>}
        </div>)
      )}
      </>}
    </div>
  )
}

export default FeaturedProperties
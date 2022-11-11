import "./searchItem.css"

const SearchItem = () => {
  return (
    <div className="searchItem" >
      <img src="https://cf.bstatic.com/xdata/images/hotel/square200/263643635.webp?k=14bfc6a889c03f43fdda56aec0c55b077781b744b8bd5baebebc66b0dbb4c625&amp;o=&amp;s=1" alt="TOKYO-W-INN Asakusa" />
      <div className="siDesc">
        <h1 className="siTitle">TOKYO-W-INN Asakusa</h1>
        <span className="siDistance">3.8 km from Center</span>
        <span className="siTaxiOp">Free Airport Taxi</span>
        <span className="siSubtitle">Apartment</span>
        <span className="siFeatures">Entire apartment • 1 bedroom • 1 bathroom • 1 kitchen • 35m²</span>
        <span className="siCancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$123</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
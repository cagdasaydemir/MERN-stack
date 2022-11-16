import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=berlin,madrid,istanbul")

  return (
    <div className="featured">
      {loading ? "Loading please wait" : (<> <div className="featuredItem">
        <img className="featuredImg" src="//bstatic.com/xdata/images/xphoto/1182x887/170335341.jpg?k=4d95afd5a003c6f1ee976ac685a922ecec2e3d2b9bab29501b127d79bb5a74fd&amp;o=?size=S" />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} Properties</h2>
        </div>
      </div>
        <div className="featuredItem">
          <img className="featuredImg" src="//bstatic.com/xdata/images/xphoto/1182x887/170335341.jpg?k=4d95afd5a003c6f1ee976ac685a922ecec2e3d2b9bab29501b127d79bb5a74fd&amp;o=?size=S" />
          <div className="featuredTitles">
            <h1>Madrid</h1>
            <h2>{data[1]} Properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img className="featuredImg" src="//bstatic.com/xdata/images/xphoto/1182x887/170335341.jpg?k=4d95afd5a003c6f1ee976ac685a922ecec2e3d2b9bab29501b127d79bb5a74fd&amp;o=?size=S" />
          <div className="featuredTitles">
            <h1>Istanbul</h1>
            <h2>{data[2]} Properties</h2>
          </div>
        </div></>)}
    </div>
  )
}

export default Featured
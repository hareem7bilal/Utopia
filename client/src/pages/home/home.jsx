import Feed from "../../components/feed/feed"
import Leftbar from "../../components/leftbar/leftbar"
import Rightbar from "../../components/rightbar/rightbar"
import Topbar from "../../components/topbar/topbar"
import "./home.css"


function Home() {
    return (
        <>
       <Topbar/>
       <div className="homeContainer">
       <Leftbar/>
       <Feed/>
       </div>
       </>
    )
}

export default Home


import "../Styles/TrackHeader.css"
import { TrackHeaderInfo } from "./TrackHeaderComponent/TrackHeaderInfo";

export const TrackHeader = (props) => {



    return(
        <div className="trackHeaderContainer">
            <div className="img"></div>
            <div className="trackInfo">
                <TrackHeaderInfo trackName = {props.trackName}/>
            </div>
        </div>
    );
}
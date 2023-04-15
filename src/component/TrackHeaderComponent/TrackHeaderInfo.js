import "../../Styles/TrackHeader.css"

export const TrackHeaderInfo = (props) => {
    return(
        <div className="trackName">
            <div>Song</div>
            <div>{props.trackName}</div>
        </div>
    );
}
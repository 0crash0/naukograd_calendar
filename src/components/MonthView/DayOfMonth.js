import moment from "moment";
import * as events from "events";
function DayOfMonth(props) {


    return (
        <div className={"DayOfMonth" +(props.isToDay ? " ToDay" : "") +(props.isWeekend ? " WeekendDay" : "")+(props.isOtherMonth? " OtherMonth":"") + (props.isHeader? " DayOfWeek":"")}>
            <div className={"divDay"}><h1 className={"Day"}>{props.day}</h1></div>
            {!props.isHeader  &&
                typeof props.events[0] !== 'undefined' &&
                <ul className={"events"}>

                    <button>{(    typeof props.events[0]  !== 'undefined'? props.events[0].title : "event1")}</button>
                    <button>{(    typeof props.events[1]  !== 'undefined'? props.events[1].title : "event2")}</button>
                    <button>{(    typeof props.events[2]  !== 'undefined'? props.events[2].title : "event3")}</button>
                    {(props.events.length>2) &&  <div>more+</div>}
                </ul>

            }

        </div>
    )
}
export default DayOfMonth
import moment from "moment";
import * as events from "events";
function DayOfMonth(props) {
    console.log(props.events)
    return (
        <div className={"DayOfMonth" +(props.isToDay ? " ToDay" : "") +(props.isWeekend ? " WeekendDay" : "")+(props.isOtherMonth? " OtherMonth":"") + (props.isHeader? " DayOfWeek":"")}>
            <h1 className={"Day"}>{props.day}</h1>
            {!props.isHeader ? (
                <div className="events">
                    <div>{(    typeof props.events[0]  !== 'undefined'? props.events[0].title : "event1")}</div>
                    <div>{(    typeof props.events[1]  !== 'undefined'? props.events[1].title : "event2")}</div>
                    <div>{(    typeof props.events[2]  !== 'undefined'? props.events[2].title : "event3")}</div>
                </div>
            ) : ""
            }

        </div>
    )
}
export default DayOfMonth
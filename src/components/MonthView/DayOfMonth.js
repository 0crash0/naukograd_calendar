import moment from "moment";
import * as events from "events";
import React from 'react';
import Popup from "reactjs-popup";

function DayOfMonth(props) {


    return (
        <div className={"DayOfMonth" +(props.isToDay ? " ToDay" : "") +(props.isWeekend ? " WeekendDay" : "")+(props.isOtherMonth? " OtherMonth":"") + (props.isHeader? " DayOfWeek":"")}>
            <div className={"divDay"}><div className={"Day"}>{props.day}</div></div>
            {!props.isHeader && props.isShowEvents  &&
                typeof props.events[0] !== 'undefined' &&
                <ul className={"events"}>

                    <button>{(    typeof props.events[0]  !== 'undefined'? props.events[0].title : "event1")}</button>
                    <button>{(    typeof props.events[1]  !== 'undefined'? props.events[1].title : "event2")}</button>
                    <button>{(    typeof props.events[2]  !== 'undefined'? props.events[2].title : "event3")}</button>
                    {(props.events.length>3 ) &&
                        <Popup
                            trigger={open => (
                                <div className="popup-events">more+</div>
                            )}
                            position="top center"
                            closeOnDocumentClick
                        >
                            <div className="hidden-events">
                            {props.events.slice(3).map((event,idx)=> (
                                <span id={"event"+idx}>{(typeof event !== 'undefined' ? event.title : "event")}</span>
                            ))}
                         </div>
                        </Popup>
                    }
                </ul>

            }

        </div>
    )
}
export default DayOfMonth
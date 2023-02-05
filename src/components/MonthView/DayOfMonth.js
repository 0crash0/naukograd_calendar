function DayOfMonth(props) {

    return (
        <div className={"DayOfMonth" +(props.isToDay ? " ToDay" : "") +(props.isWeekend ? " WeekendDay" : "")+(props.isOtherMonth? " OtherMonth":"") + (props.isHeader? " DayOfWeek":"")}>
            <h1 className={"Day"}>{props.day}</h1>
            {!props.isHeader ? (
                <div className="events">
                    <div>event1</div>
                    <div>event2</div>
                    <div>event3</div>
                </div>
            ) : ""
            }

        </div>
    )
}
export default DayOfMonth
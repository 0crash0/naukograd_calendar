function DayOfMonth(props) {

    return (
        <div className={"DayOfMonth" +(props.isToDay ? " ToDay" : "") +(props.isWeekend ? " WeekendDay" : "")+(props.isOtherMonth? " OtherMonth":"") + (props.isHeader? " DayOfWeek":"")}>
            <h1 className={"Day"}>{props.day}</h1>
        </div>
    )
}
export default DayOfMonth
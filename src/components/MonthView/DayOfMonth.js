function DayOfMonth(props) {

    return (
        <div className={"DayOfMonth" +(props.isWeekend ? ", WeekendDay" : "")+(props.isToDay ? ", ToDay" : "")}>
            <h1 className={"Day"}>{props.day}</h1>
        </div>
    )
}
export default DayOfMonth
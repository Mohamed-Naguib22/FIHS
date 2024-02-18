export default function DateConverter(date: string){
    const fullDate = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
    const todayFullDate = new Date()
    const IsToday = (fullDate?.[0] || '' ) === `${todayFullDate.getFullYear()}-${todayFullDate.getMonth()+1}-${todayFullDate.getUTCDate()}`
    const HourTime = date.match(/T[0-9]{2}/)
    const numericHour = +HourTime![0].slice(1)
    const MinuteTime = date.match(/[0-9]{2}:/)![0].slice(0,-1)
    const PM_OR_AM = numericHour>12?'مساءً':'صباحاً'
    const FinalTimeVal = `${!IsToday?fullDate:''} ${numericHour>12?numericHour-12:numericHour}:${MinuteTime} ${PM_OR_AM}`
    return FinalTimeVal
}
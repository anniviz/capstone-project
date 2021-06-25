export default function sortByTime(array) {
  return array.slice().sort(function (a, b) {
    if (convertToMinutes(a.time) > convertToMinutes(b.time)) return 1
    if (convertToMinutes(a.time) < convertToMinutes(b.time)) return -1
    return 0
  })
}

function convertToMinutes(time) {
  const timeArray = time.split(':')
  const minutes = timeArray[0] * 60 + timeArray[1]
  return Number(minutes)
}

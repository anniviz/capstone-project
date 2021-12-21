export default function createDateString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

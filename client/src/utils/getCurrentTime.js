export default function getCurrentTime() {
  const today = new Date()
  return `${today.getHours()}:${
    today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
  }`
}

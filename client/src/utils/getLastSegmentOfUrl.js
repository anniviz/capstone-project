export default function getLastSegmentOfUrl(location) {
  return location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
}

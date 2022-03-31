export default {
  formatUrl(url) {
    if (url.charAt(url.length - 1) == '/') {
      return url
    } else {
      return `${url}/`
    }
  }
}

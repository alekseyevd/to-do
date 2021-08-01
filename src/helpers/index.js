export const withTags = (str) => {
  str = str.replaceAll('&lt;', '<')
  str = str.replaceAll('&gt;', '>')
  str = str.replaceAll('&#039;', '\'')
  return str
}
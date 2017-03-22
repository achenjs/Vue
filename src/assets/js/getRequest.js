module.exports = function(obj) {
  for(let i in obj) {
    if (obj[i] === '') {
      delete obj[i]
    }
  }
  return obj
}

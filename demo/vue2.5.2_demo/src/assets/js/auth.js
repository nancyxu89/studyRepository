import store from '../../store'

export function hasAuth(key) {
  key && (key = key.trim())
  if (!key) return true

  let keys = key.split('||')
  for (var i = 0, l = keys.length; i < l; i++) {
    let auth = true
    let items = keys[i].split('&&')
    for (var j = 0, n = items.length; j < n; j++) {
      var item = items[j].trim()
      auth = !item || (store.state.user.auths[item])
      if (!auth) {
        break
      }
    }
    if (auth) {
      return true
    }
  }
  return false
}

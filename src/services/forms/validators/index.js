const validators = {
  required(value) {
    if (typeof value === 'string') return value.trim() !== ''

    if (value === null || value === undefined) return false

    return true
  },

  empty(value) {
    if (value === null) return true

    if (typeof (value) === 'string') return value.trim() === ''
  },

  email(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase())
  },

}

export default validators
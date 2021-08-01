export function validateForm(controls) {
  for (let key in controls) {
    if (!controls[key].valid) return false
  }

  return true
}
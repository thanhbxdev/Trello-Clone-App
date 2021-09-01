//onKeyDown
export const saveContentEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}
// input Value Onclick
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
}

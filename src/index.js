const copyButton = document.querySelector('.copy-button')

const getTargetElement = (element) => {
  let target
  try {
    target = document.querySelector(`${element}`)
  } catch (error) {}
  return target
}

const getInputValue = () => {
  const input = getTargetElement('.copy-input')
  if (!input) return
  return input.value
}

const copy = (element) => {
  const range = document.createRange()
  range.selectNode(element)
  window.getSelection()?.removeAllRanges()
  window.getSelection()?.addRange(range)
  document.execCommand('copy')
  window.getSelection()?.removeAllRanges()
  alert('Copied!')
}

const copyHandler = () => {
  const elementName = getInputValue()
  if (!elementName) {
    alert('Please enter a value')
    return
  }
  const target = getTargetElement(elementName)
  console.log('!!!!', parent)
  if (!target) {
    alert('Target element not found')
    return
  }
  copy(target)
}

copyButton.addEventListener('click', copyHandler)

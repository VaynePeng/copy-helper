const copyButton = document.querySelector('.copy-button')

const getTargetElement = (element) => {
  let target
  try {
    target = document.querySelector(`${element}`)
  } catch (error) {}
  return target
}

const getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

const toast = (text, time) => {
  let toast = getTargetElement('#toast')
  let toast_box = getTargetElement('.toast_box')
  toast.innerHTML = text
  toast_box.style.display = 'inline-block'
  setTimeout(function () {
    setTimeout(function () {
      toast_box.style.display = 'none'
    }, 1000)
  }, time)
}

const getInputValue = () => {
  const input = getTargetElement('.copy-input')
  if (!input) return
  return input.value
}

const copy = (name) => {
  try {
    const element = document.querySelector(name || 'html')
    if (!element) return 'Element not found'
    // reset user-select
    element.style.cssText += 'user-select: auto;'
    const range = document.createRange()
    range.selectNode(element)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    const text = window.getSelection().toString()
    if (!text) return 'No text to copy'
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    return 'Copied!'
  } catch (error) {
    return error.message
  }
}

const copyHandler = async () => {
  const name = getInputValue() || 'html'
  const tab = await getCurrentTab()
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      function: copy,
      args: [name]
    })
    .then((response) => {
      const message = response[0].result
      toast(message, 1000)
    })
}

copyButton.addEventListener('click', copyHandler)

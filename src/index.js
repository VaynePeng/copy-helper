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

const getElement = async (element) => {
  const tab = await getCurrentTab()
  chrome.tabs.sendMessage(tab.id, { element }, (response) => {
    alert(response)
    return response
  })
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

const copy = (element) => {
  // const range = document.createRange()
  // range.selectNode(element)
  // window.getSelection().removeAllRanges()
  // window.getSelection().addRange(range)
  // document.execCommand('copy')
  // window.getSelection().removeAllRanges()
  toast('Copied!', 1000)
}

const copyHandler = () => {
  const elementName = getInputValue() || 'html'
  const target = getElement(elementName)
  if (!target) {
    toast('Element not found', 1000)
    return
  }
  copy(target)
}

copyButton.addEventListener('click', copyHandler)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { element } = message
  const node = document.querySelector(element | 'html')
  sendResponse('!!!' + node)
})

var results = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  results[sender.tab.id] = request;
  // classify(sender.tab.id, request);
  sendResponse({ received: "result" });
});

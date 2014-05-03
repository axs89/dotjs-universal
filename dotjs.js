chrome.runtime.sendMessage({}, function(response) {
  if (response.isActivated) {
    var hostname = location.hostname.replace(/^www\./, '')
    $.ajax({
      url: chrome.extension.getURL('styles/' + hostname + '.css'),
      dataType: 'text',
      success: function(data){
        var stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.innerHTML = data;
        document.body.appendChild(stylesheet);
      }
    })

    $.ajax({
      url: chrome.extension.getURL('scripts/' + hostname + '.js'),
      dataType: 'text',
      success: function(data){
        eval(data);
      },
    });

    $.ajax({
      url: chrome.extension.getURL('scripts/default.js'),
      dataType: 'text',
      success: function(data){
        eval(data);
      },
    });
  }
});

(function(){

  var LOAD_COMPLETE = 'complete';
  var callbacks = [];
  var listenerAdded = false;
  var etype, rtt, dlink, sdata;
  var conn;

  function onConnCaptured(callback){
    callbacks.push(callback)
    reportConnection()
  }

  function initCalculate(){
    if(connectionIsSupported()){
      conn = navigator.connection
      etype = conn.effectiveType
      rtt = conn.rtt
      dlink = conn.downlink
      sdata = conn.saveData
    }

    if(listenerAdded)
      window.removeEventListener('load', initCalculate)

    reportConnection()
  }

  function reportConnection(){
    if(etype !== undefined){
      callbacks.forEach(function(callback){
        callback(etype, rtt, dlink, sdata, conn)
      });
      callbacks = []
    }
  }

  function connectionIsSupported(){
    return 'connection' in navigator
  }

  if(document.readyState !== undefined && document.readyState === LOAD_COMPLETE){
    initCalculate();
  }else{
    listenerAdded = true
    window.addEventListener('load', initCalculate)
  }

  self['perfMetrics'] = self['perfMetrics'] || {};
  self['perfMetrics']['onConnCaptured'] = onConnCaptured;
}())

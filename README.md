## Network Information
Capture browser network informations

## Usage

```js
perfMetrics.onConnCaptured(function(etype, rtt, dlink, sdata, conn){
  console.log(`etype: ${etype}, rtt: ${etype}, dlink: ${dlink}, sdata: ${sdata}`)
  console.log(conn)
})
```
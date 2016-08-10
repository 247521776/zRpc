/**
 * Created by cavasblack on 16/8/10.
 */

import zkCli from "../lib/zkCli"
var zk = new zkCli()
zk.mkdirp("/demo", function (err, data) {
    console.log("create", err, data);
    // zk.watchFile("/demo", function(){})
    zk.watchDir("/demo", console.log)
    var index = 0;
    setInterval(function () {
        index++;
        // zk.create("/demo/"+index,index,function(){})
        // zk.mkdirp("/demo/" + index, function () {})
        zk.del("/demo"+index,console.log)
    }, 1000);
})
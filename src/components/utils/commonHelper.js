


exports.epochConverter=function(time) {
    var myDate = new Date( time * 1000);
    return myDate.toGMTString()
}



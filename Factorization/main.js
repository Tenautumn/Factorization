var wdnmd;

function getModID(){
    return wdnmd;
}

var __modid__ = getModID();

function fz(uid){
    var modid = getModID();
    return (modid?modid + "_":"") + uid;
}

console.log(fz("测试"));
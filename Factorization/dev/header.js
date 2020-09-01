// libraries
IMPORT("ChargeItem");
IMPORT("EnergyNet");
IMPORT("MaiSui's ModAPI");
IMPORT("StorageInterface");
IMPORT("TileRender");

const Color = android.graphics.Color;

const GUI_SCALE = 3.2;

// energy
const EU = EnergyTypeRegistry.assureEnergyType("Eu",1);

function power(tier){
    return 32 * Math.pow(4,tier - 1);
}

// ==================================================================================================== //

function getModID(){
    var info = FileTools.ReadJSON(__dir__ + "mod.info");
    return info.modid;
}

function fz(uid){
    var modid = getModID();
    return (modid?modid + "_":"") + uid;
}

var __modid__ = getModID();

// ==================================================================================================== //
// libraries
IMPORT("ChargeItem");
IMPORT("EnergyNet");
IMPORT("MaiSui's ModAPI");

const GUI_SCALE = 3.2;

// energy
const EU = EnergyTypeRegistry.assureEnergyType("Eu",1);

function fz(uid){
    var info = FileTools.ReadJSON(__dir__ + "mod.info");
    return (info.modid + "_" || "") + uid;
}

function power(tier){
    return 32 * Math.pow(4,tier - 1);
}
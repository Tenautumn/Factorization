// [扳手]Wrench
var item_wrench = IDRegistry.genItemID("wrench");
Item.createItem("wrench","Wrench",{name:"wrench"},{stack:1});

Item.registerUseFunction(item_wrench,function(coords,item,block){
    if(Machine.isMachine(block.id)){
        var tile = World.getTileEntity(coords.x,coords.y,coords.z);
        var energy = tile.data.energy;
        var storage = tile.getEnergyStorage();
        Game.message(Translation.translate("Energy Storage: ") + (storage?energy + "/" + storage:energy) + " Eu");
    }
});
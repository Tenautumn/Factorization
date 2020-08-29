// [青铜扳手]Bronze Wrench
IDRegistry.genItemID("wrenchBronze");
Item.createItem("wrenchBronze","Bronze Wrench",{name:"wrench"});

Item.registerUseFunction("wrenchBronze",function(coords,item,block){
    if(Machine.isMachine(block.id)){
        var tile = World.getTileEntity(coords.x,coords.y,coords.z);
        var energy = tile.data.energy;
        var storage = tile.getEnergyStorage();
        Game.message(Translation.translate("Energy Storage: ") + (storage?energy + "/" + storage:energy) + " Eu");
    }
});
// [扳手]Wrench
IDRegistry.genItemID("wrenchBronze");
Item.createItem("wrenchBronze","Wrench",{name:"bronze_wrench"},{stack:1});

Item.registerUseFunction("wrenchBronze",function(coords,item,block){
    if(Machine.isMachine(block.id)){
        var tile = World.getTileEntity(coords.x,coords.y,coords.z);
        var energy = tile.data.energy;
        var storage = tile.getEnergyStorage();
        Game.message(Translation.translate("Energy Storage: ") + (storage?energy + "/" + storage:energy) + " Eu");
    }
});
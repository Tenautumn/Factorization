// [粘性树脂]Latex
IDRegistry.genItemID("latex");
Item.createItem("latex","Latex",{name:"latex"});

// [橡胶]Rubber
IDRegistry.genItemID("rubber");
Item.createItem("rubber","Rubber",{name:"rubber"});

Callback.addCallback("PreLoaded",function(){
    Recipes.addFurnace(ItemID.latex,ItemID.rubber);
});

// [铀矿石]Uranium Ore
IDRegistry.genItemID("uraniumChunk");
Item.createItem("uraniumChunk","Uranium Ore",{name:"uranium"});

// [铱矿石]Iridium Ore
IDRegistry.genItemID("iridiumChunk");
Item.createItem("iridiumChunk","Iridium Ore",{name:"iridium"});

// [钢锭]Steel Ingot
IDRegistry.genItemID("ingotSteel");
Item.createItem("ingotSteel","Steel Ingot",{name:"steel_ingot"});

Callback.addCallback("PreLoaded",function(){
    Recipes.addFurnace(265,ItemID.ingotSteel);
});
// [粘性树脂]Latex
var item_latex = IDRegistry.genItemID("latex");
Item.createItem("latex","Latex",{name:"latex"});

// [橡胶]Rubber
var item_rubber = IDRegistry.genItemID("rubber");
Item.createItem("rubber","Rubber",{name:"rubber"});

Callback.addCallback("PreLoaded",function(){
    Recipes.addFurnace(item_latex,item_rubber);
});

// [铀矿石]Uranium Ore
var item_uranium = IDRegistry.genItemID("uraniumChunk");
Item.createItem("uraniumChunk","Uranium Ore",{name:"uranium"});

// [铱矿石]Iridium Ore
var item_iridium = IDRegistry.genItemID("iridiumChunk");
Item.createItem("iridiumChunk","Iridium Ore",{name:"iridium"});

// [钢锭]Steel Ingot
var item_steel_ingot = IDRegistry.genItemID("ingotSteel");
Item.createItem("ingotSteel","Steel Ingot",{name:"steel_ingot"});

Callback.addCallback("PreLoaded",function(){
    Recipes.addFurnace(265,item_steel_ingot);
});
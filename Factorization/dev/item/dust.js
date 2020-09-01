// [铁粉]Iron Dust
var item_dust_iron = IDRegistry.genItemID("dustIron");
Item.createItem("dustIron","Iron Dust",{name:"iron_dust"});

// [金粉]Gold Dust
var item_dust_gold = IDRegistry.genItemID("dustGold");
Item.createItem("dustGold","Gold Dust",{name:"gold_dust"});

// [铜粉]Copper Dust
var item_dust_copper = IDRegistry.genItemID("dustCopper");
Item.createItem("dustCopper","Copper Dust",{name:"copper_dust"});

// [锡粉]Tin Dust
var item_dust_tin = IDRegistry.genItemID("dustTin");
Item.createItem("dustTin","Tin Dust",{name:"tin_dust"});

// Group
Item.addCreativeGroup("dust",Translation.translate("Dust"),[
    item_dust_iron  ,
    item_dust_gold  ,
    item_dust_copper,
    item_dust_tin   ,
]);
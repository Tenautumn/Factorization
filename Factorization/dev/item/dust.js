// [铁粉]Iron Dust
IDRegistry.genItemID("dustIron");
Item.createItem("dustIron","Iron Dust",{name:"iron_dust"});

// [金粉]Gold Dust
IDRegistry.genItemID("dustGold");
Item.createItem("dustGold","Gold Dust",{name:"gold_dust"});

// [铜粉]Copper Dust
IDRegistry.genItemID("dustCopper");
Item.createItem("dustCopper","Copper Dust",{name:"copper_dust"});

// [锡粉]Tin Dust
IDRegistry.genItemID("dustTin");
Item.createItem("dustTin","Tin Dust",{name:"tin_dust"});

// Group
Item.addCreativeGroup("dust",Translation.translate("Dust"),[
    ItemID.dustIron  ,
    ItemID.dustGold  ,
    ItemID.dustCopper,
    ItemID.dustTin   ,
]);
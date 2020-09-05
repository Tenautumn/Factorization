// [电路板]Circuit
IDRegistry.genItemID("circuitBasic");
Item.createItem("circuitBasic","Circuit",{name:"circuit_basic"});

Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:ItemID.circuitBasic,count:1,data:0},[
        "aaa",
        "bcb",
        "aaa"
    ],["a",ItemID.wireCopperInsulated,0,"b",331,0,"c",ItemID.ingotSteel,0]);
});

// [高级电路板]Advanced Circuit
IDRegistry.genItemID("circuitAdvanced");
Item.createItem("circuitAdvanced","Advanced Circuit",{name:"circuit_advanced"});
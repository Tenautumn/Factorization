// [电路板]Circuit
var item_circuit_basic = IDRegistry.genItemID("circuitBasic");
Item.createItem("circuitBasic","Circuit",{name:"circuit_basic"});

Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:item_circuit_basic,count:1,data:0},[
        "aaa",
        "bcb",
        "aaa"
    ],["a",item_copper_wire,0,"b",331,0,"c",item_steel_ingot,0]);
});

// [高级电路板]Advanced Circuit
var item_circuit_advanced = IDRegistry.genItemID("circuitAdvanced");
Item.createItem("circuitAdvanced","Advanced Circuit",{name:"circuit_advanced"});
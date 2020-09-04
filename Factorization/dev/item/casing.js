// [机器外壳]Machine Casing
var item_machine_casing_basic = IDRegistry.genItemID("machineCasingBasic");
Item.createItem("machineCasingBasic","Machine Casing",{name:"machine_casing_basic",meta:0});

Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:item_machine_casing_basic,count:1,data:0},[
        "aaa",
        "a a",
        "aaa"
    ],["a",item_steel_ingot,0]);

    Recipes.addShapeless({id:item_steel_ingot,count:1,data:0},[{id:item_machine_casing_basic,data:0}]);
});

// [高级机器外壳]Advanced Machine Casing
var item_machine_casing_advanced = IDRegistry.genItemID("machineCasingAdvanced");
Item.createItem("machineCasingAdvanced","Advanced Machine Casing",{name:"machine_casing_advanced",meta:0});
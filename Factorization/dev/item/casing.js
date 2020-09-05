// [机器外壳]Machine Casing
IDRegistry.genItemID("machineCasingBasic");
Item.createItem("machineCasingBasic","Machine Casing",{name:"machine_casing_basic",meta:0});

Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:ItemID.machineCasingBasic,count:1,data:0},[
        "aaa",
        "a a",
        "aaa"
    ],["a",ItemID.ingotSteel,0]);

    Recipes.addShapeless({id:ItemID.ingotSteel,count:1,data:0},[{id:ItemID.machineCasingBasic,data:0}]);
});

// [高级机器外壳]Advanced Machine Casing
IDRegistry.genItemID("machineCasingAdvanced");
Item.createItem("machineCasingAdvanced","Advanced Machine Casing",{name:"machine_casing_advanced",meta:0});
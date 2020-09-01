// [机器外壳]Machine Casing
var item_machine_casing = IDRegistry.genItemID(fz("machineCasing"));
Item.createItem(fz("machineCasing"),"Machine Casing",{name:"machine_casing_basic",meta:0});

Callback.addCallback("PreLoaded",function(){
    Recipes.addShaped({id:item_machine_casing,count:1,data:0},[
        "aaa",
        "a a",
        "aaa"
    ],["a",item_steel_ingot,0]);

    Recipes.addShapeless({id:item_steel_ingot,count:1,data:0},[{id:item_machine_casing,data:0}]);
});

// [高级机器外壳]Advanced Machine Casing
var item_machine_casing_advanced = IDRegistry.genItemID(fz("machineCasingAdvanced"));
Item.createItem(fz("machineCasingAdvanced"),"Advanced Machine Casing",{name:"machine_casing_advanced",meta:0});
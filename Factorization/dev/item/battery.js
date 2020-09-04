// [电池]Battery
var item_battery = IDRegistry.genItemID("battery");
Item.createItem("battery","Battery",{name:"battery",meta:0},{stack:1,isTech:true});
ChargeItemRegistry.registerExtraItem(item_battery,"Eu",10000,power(1),1,"storage",true,true);

Item.registerIconOverrideFunction(item_battery,function(item){
	return {name:"battery",meta:Math.round((27 - item.data) / 26 * 4)};
});

ItemName.registerTooltipAddFunction(item_battery,function(item){
    return Translation.translate("Energy: ") + ChargeItemRegistry.getEnergyStored(item) + "/" + ChargeItemRegistry.getMaxCharge(item.id) + "Eu";
},"storage");

// Group
Item.addCreativeGroup("battery",Translation.translate("Battery"),[
    item_battery
]);
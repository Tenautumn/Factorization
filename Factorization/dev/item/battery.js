// [电池]Battery
IDRegistry.genItemID("battery");
Item.createItem("battery","Battery",{name:"battery",meta:0},{stack:1,isTech:true});
ChargeItemRegistry.registerExtraItem(ItemID.battery,"Eu",10000,power(1),1,"storage",true,true);

Item.registerIconOverrideFunction(ItemID.battery,function(item){
	return {name:"battery",meta:Math.round((27 - item.data) / 26 * 4)};
});

ItemName.registerTooltipAddFunction(ItemID.battery,function(item){
    return Translation.translate("Energy: ") + ChargeItemRegistry.getEnergyStored(item) + "/" + ChargeItemRegistry.getMaxCharge(item.id) + "Eu";
},"storage");

// Group
Item.addCreativeGroup("battery",Translation.translate("Battery"),[
    ItemID.battery
]);
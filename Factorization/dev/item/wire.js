// [铜质导线]Copper Wire
IDRegistry.genItemID("wireCopper");
Item.createItem("wireCopper","Copper Wire",{name:"copper_wire",meta:0});

IDRegistry.genBlockID("wireCopper");
Block.createBlock("wireCopper",[
	{name:"Copper Wire",texture:[["copper_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireCopper,"stone");

Machine.registerWire("wireCopper",power(1));
TileRenderer.setupWireModel(BlockID.wireCopper,-1,0.5,"fz-wire");

// [绝缘铜质导线]Insulated Copper Wire
IDRegistry.genItemID("wireCopperInsulated");
Item.createItem("wireCopperInsulated","Insulated Copper Wire",{name:"copper_wire",meta:1});

IDRegistry.genBlockID("wireCopperInsulated");
Block.createBlock("wireCopperInsulated",[
	{name:"Insulated Copper Wire",texture:[["copper_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireCopperInsulated,"stone");

Machine.registerWire("wireCopperInsulated",power(1));
TileRenderer.setupWireModel(BlockID.wireCopperInsulated,-1,0.625,"fz-wire");

// [钻石导线]Crystal Wire
IDRegistry.genItemID("wireCrystal");
Item.createItem("wireCrystal","Crystal Wire",{name:"crystal_wire",meta:0});

IDRegistry.genBlockID("wireCrystal");
Block.createBlock("wireCrystal",[
	{name:"Crystal Wire",texture:[["crystal_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireCrystal,"stone");

Machine.registerWire("wireCrystal",power(3));
TileRenderer.setupWireModel(BlockID.wireCrystal,-1,0.5,"fz-wire");

// [绝缘钻石导线]Insulated Crystal Wire
IDRegistry.genItemID("wireCrystalInsulated");
Item.createItem("wireCrystalInsulated","Insulated Crystal Wire",{name:"crystal_wire",meta:1});

IDRegistry.genBlockID("wireCrystalInsulated");
Block.createBlock("wireCrystalInsulated",[
	{name:"Insulated Crystal Wire",texture:[["crystal_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireCrystalInsulated,"stone");

Machine.registerWire("wireCrystalInsulated",power(3));
TileRenderer.setupWireModel(BlockID.wireCrystalInsulated,-1,0.625,"fz-wire");

// [金质导线]Golden Wire
IDRegistry.genItemID("wireGolden");
Item.createItem("wireGolden","Golden Wire",{name:"golden_wire",meta:0});

IDRegistry.genBlockID("wireGolden");
Block.createBlock("wireGolden",[
	{name:"Golden Wire",texture:[["golden_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireGolden,"stone");

Machine.registerWire("wireGolden",power(2));
TileRenderer.setupWireModel(BlockID.wireGolden,-1,0.5,"fz-wire");

// [绝缘金质导线]Insulated Golden Wire
IDRegistry.genItemID("wireGoldenInsulated");
Item.createItem("wireGoldenInsulated","Insulated Golden Wire",{name:"golden_wire",meta:1});

IDRegistry.genBlockID("wireGoldenInsulated");
Block.createBlock("wireGoldenInsulated",[
	{name:"Insulated Golden Wire",texture:[["golden_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireGoldenInsulated,"stone");

Machine.registerWire("wireGoldenInsulated",power(2));
TileRenderer.setupWireModel(BlockID.wireGoldenInsulated,-1,0.625,"fz-wire");

// [钢质导线]Steel Wire
IDRegistry.genItemID("wireSteel");
Item.createItem("wireSteel","Steel Wire",{name:"steel_wire",meta:0});

IDRegistry.genBlockID("wireSteel");
Block.createBlock("wireSteel",[
	{name:"Steel Wire",texture:[["steel_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireSteel,"stone");

Machine.registerWire("wireSteel",power(4));
TileRenderer.setupWireModel(BlockID.wireSteel,-1,0.5,"fz-wire");

// [绝缘钢质导线]Insulated Steel Wire
IDRegistry.genItemID("wireSteelInsulated");
Item.createItem("wireSteelInsulated","Insulated Steel Wire",{name:"steel_wire",meta:1});

IDRegistry.genBlockID("wireSteelInsulated");
Block.createBlock("wireSteelInsulated",[
	{name:"Insulated Steel Wire",texture:[["steel_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.wireSteelInsulated,"stone");

Machine.registerWire("wireSteelInsulated",power(4));
TileRenderer.setupWireModel(BlockID.wireSteelInsulated,-1,0.625,"fz-wire");

// [超导体]Super Conductor
IDRegistry.genItemID("superConductor");
Item.createItem("superConductor","Super Conductor",{name:"super_conductor"});

IDRegistry.genBlockID("superConductor");
Block.createBlock("superConductor",[
	{name:"Super Conductor",texture:[["super_conductor",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(BlockID.superConductor,"stone");

Machine.registerWire("superConductor",power(9));
TileRenderer.setupWireModel(BlockID.superConductor,-1,0.5,"fz-wire");
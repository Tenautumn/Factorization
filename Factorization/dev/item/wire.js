// [铜质导线]Copper Wire
var item_copper_wire = IDRegistry.genItemID("wireCopper");
Item.createItem("wireCopper","Copper Wire",{name:"copper_wire",meta:0});

var block_copper_wire = IDRegistry.genBlockID("wireCopper");
Block.createBlock("wireCopper",[
	{name:"Copper Wire",texture:[["copper_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_copper_wire,"stone");

Machine.registerWire("wireCopper",power(1));
TileRenderer.setupWireModel(block_copper_wire,-1,0.5,"fz-wire");

// [绝缘铜质导线]Insulated Copper Wire
var item_copper_wire_insulated = IDRegistry.genItemID("wireCopperInsulated");
Item.createItem("wireCopperInsulated","Insulated Copper Wire",{name:"copper_wire",meta:1});

var block_copper_wire_insulated = IDRegistry.genBlockID("wireCopperInsulated");
Block.createBlock("wireCopperInsulated",[
	{name:"Insulated Copper Wire",texture:[["copper_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_copper_wire_insulated,"stone");

Machine.registerWire("wireCopperInsulated",power(1));
TileRenderer.setupWireModel(block_copper_wire_insulated,-1,0.625,"fz-wire");

// [钻石导线]Crystal Wire
var item_crystal_wire = IDRegistry.genItemID("wireCrystal");
Item.createItem("wireCrystal","Crystal Wire",{name:"crystal_wire",meta:0});

var block_crystal_wire = IDRegistry.genBlockID("wireCrystal");
Block.createBlock("wireCrystal",[
	{name:"Crystal Wire",texture:[["crystal_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_crystal_wire,"stone");

Machine.registerWire("wireCrystal",power(3));
TileRenderer.setupWireModel(block_crystal_wire,-1,0.5,"fz-wire");

// [绝缘钻石导线]Insulated Crystal Wire
var item_crystal_wire_insulated = IDRegistry.genItemID("wireCrystalInsulated");
Item.createItem("wireCrystalInsulated","Insulated Crystal Wire",{name:"crystal_wire",meta:1});

var block_crystal_wire_insulated = IDRegistry.genBlockID("wireCrystalInsulated");
Block.createBlock("wireCrystalInsulated",[
	{name:"Insulated Crystal Wire",texture:[["crystal_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_crystal_wire_insulated,"stone");

Machine.registerWire("wireCrystalInsulated",power(3));
TileRenderer.setupWireModel(block_crystal_wire_insulated,-1,0.625,"fz-wire");

// [金质导线]Golden Wire
var item_golden_wire = IDRegistry.genItemID("wireGolden");
Item.createItem("wireGolden","Golden Wire",{name:"golden_wire",meta:0});

var block_golden_wire = IDRegistry.genBlockID("wireGolden");
Block.createBlock("wireGolden",[
	{name:"Golden Wire",texture:[["golden_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_golden_wire,"stone");

Machine.registerWire("wireGolden",power(2));
TileRenderer.setupWireModel(block_golden_wire,-1,0.5,"fz-wire");

// [绝缘金质导线]Insulated Golden Wire
var item_golden_wire_insulated = IDRegistry.genItemID("wireGoldenInsulated");
Item.createItem("wireGoldenInsulated","Insulated Golden Wire",{name:"golden_wire",meta:1});

var block_golden_wire_insulated = IDRegistry.genBlockID("wireGoldenInsulated");
Block.createBlock("wireGoldenInsulated",[
	{name:"Insulated Golden Wire",texture:[["golden_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_golden_wire_insulated,"stone");

Machine.registerWire("wireGoldenInsulated",power(2));
TileRenderer.setupWireModel(block_golden_wire_insulated,-1,0.625,"fz-wire");

// [钢质导线]Steel Wire
var item_steel_wire = IDRegistry.genItemID("wireSteel");
Item.createItem("wireSteel","Steel Wire",{name:"steel_wire",meta:0});

var block_steel_wire = IDRegistry.genBlockID("wireSteel");
Block.createBlock("wireSteel",[
	{name:"Steel Wire",texture:[["steel_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_steel_wire,"stone");

Machine.registerWire("wireSteel",power(4));
TileRenderer.setupWireModel(block_steel_wire,-1,0.5,"fz-wire");

// [绝缘钢质导线]Insulated Steel Wire
var item_steel_wire_insulated = IDRegistry.genItemID("wireSteelInsulated");
Item.createItem("wireSteelInsulated","Insulated Steel Wire",{name:"steel_wire",meta:1});

var block_steel_wire_insulated = IDRegistry.genBlockID("wireSteelInsulated");
Block.createBlock("wireSteelInsulated",[
	{name:"Insulated Steel Wire",texture:[["steel_wire",1]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_steel_wire_insulated,"stone");

Machine.registerWire("wireSteelInsulated",power(4));
TileRenderer.setupWireModel(block_steel_wire_insulated,-1,0.625,"fz-wire");

// [超导体]Super Conductor
var item_super_conductor = IDRegistry.genItemID("superConductor");
Item.createItem("superConductor","Super Conductor",{name:"super_conductor"});

var block_super_conductor = IDRegistry.genBlockID("superConductor");
Block.createBlock("superConductor",[
	{name:"Super Conductor",texture:[["super_conductor",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_super_conductor,"stone");

Machine.registerWire("superConductor",power(9));
TileRenderer.setupWireModel(block_super_conductor,-1,0.5,"fz-wire");
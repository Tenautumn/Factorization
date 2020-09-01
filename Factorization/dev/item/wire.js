// [铜质导线]Copper Wire
var item_copper_wire = IDRegistry.genItemID(fz("wireCopper"));
Item.createItem(fz("wireCopper"),"Copper Wire",{name:"copper_wire"});

var block_copper_wire = IDRegistry.genBlockID(fz("wireCopper"));
Block.createBlock(fz("wireCopper"),[
	{name:"Copper Wire",texture:[["copper_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_copper_wire,"stone");

// [钻石导线]Crystal Wire
var item_crystal_wire = IDRegistry.genItemID(fz("wireCrystal"));
Item.createItem(fz("wireCrystal"),"Crystal Wire",{name:"crystal_wire"});

var block_crystal_wire = IDRegistry.genBlockID(fz("wireCrystal"));
Block.createBlock(fz("wireCrystal"),[
	{name:"Crystal Wire",texture:[["crystal_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_crystal_wire,"stone");

// [金质导线]Golden Wire
var item_golden_wire = IDRegistry.genItemID(fz("wireGolden"));
Item.createItem(fz("wireGolden"),"Golden Wire",{name:"golden_wire"});

var block_golden_wire = IDRegistry.genBlockID(fz("wireGolden"));
Block.createBlock(fz("wireGolden"),[
	{name:"Golden Wire",texture:[["golden_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_golden_wire,"stone");

// [钢质导线]Steel Wire
var item_steel_wire = IDRegistry.genItemID(fz("wireSteel"));
Item.createItem(fz("wireSteel"),"Steel Wire",{name:"steel_wire"});

var block_steel_wire = IDRegistry.genBlockID(fz("wireSteel"));
Block.createBlock(fz("wireSteel"),[
	{name:"Steel Wire",texture:[["steel_wire",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_steel_wire,"stone");

// [超导体]Super Conductor
var item_super_conductor = IDRegistry.genItemID(fz("superConductor"));
Item.createItem(fz("superConductor"),"Super Conductor",{name:"super_conductor"});

var block_super_conductor = IDRegistry.genBlockID(fz("superConductor"));
Block.createBlock(fz("superConductor"),[
	{name:"Super Conductor",texture:[["super_conductor",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_super_conductor,"stone");

// Place
Machine.registerWire(fz("wireCopper")    ,power(1));
Machine.registerWire(fz("wireCrystal")   ,power(3));
Machine.registerWire(fz("wireGolden")    ,power(2));
Machine.registerWire(fz("wireSteel")     ,power(4));
Machine.registerWire(fz("superConductor"),power(9));

// Model
TileRenderer.setupWireModel(block_copper_wire    ,-1,0.5,"fz-wire");
TileRenderer.setupWireModel(block_crystal_wire   ,-1,0.5,"fz-wire");
TileRenderer.setupWireModel(block_golden_wire    ,-1,0.5,"fz-wire");
TileRenderer.setupWireModel(block_steel_wire     ,-1,0.5,"fz-wire");
TileRenderer.setupWireModel(block_super_conductor,-1,0.5,"fz-wire");
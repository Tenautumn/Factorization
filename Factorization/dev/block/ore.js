Block.createSpecialType({
	base:1,
	solid:true,
	destroytime:2
},"ore");

// [铀矿石]Uranium Ore
IDRegistry.genBlockID("oreUranium");
Block.createBlock("oreUranium",[
    {name:"Uranium Ore",texture:[["uranium_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(BlockID.oreUranium,"stone",2,true);

Block.registerDropFunction("oreUranium",function(coords,id,data,level,enchant){
    if(level >= 2){
        if(enchant.silk) return [[id,1,data]];

        var drop = [[ItemID.uranium,1,0]];
        if(Math.random() < 0.5) drop.push([ItemID.dustIron,1,0]);
        ToolAPI.dropOreExp(coords,3,7,enchant.experience);
        return drop;
	}
	return [];
},2);

// [铱矿石]Iridium Ore
IDRegistry.genBlockID("oreIridium");
Block.createBlock("oreIridium",[
    {name:"Iridium Ore",texture:[["iridium_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(BlockID.oreIridium,"stone",2,true);

Block.registerDropFunction("oreIridium",function(coords,id,data,level,enchant){
    if(level >= 2){
        if(enchant.silk) return [[id,1,data]];

        var drop = [[ItemID.iridium,1,0]];
        if(Math.random() < 0.5) drop.push([ItemID.dustGold,1,0]);
        ToolAPI.dropOreExp(coords,12,21,enchant.experience);
        return drop;
	}
	return [];
},2);

// [混合粉尘矿石]Blended Dust Ore
IDRegistry.genBlockID("oreBlend");
Block.createBlock("oreBlend",[
    {name:"Blended Dust Ore",texture:[["blend_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(BlockID.oreBlend,"stone",2,true);

Block.registerDropFunction("oreBlend",function(coords,id,data,level,enchant){
    if(level >= 2){
        if(enchant.silk) return [[id,1,data]];

        var drop = [];
        drop.push([ItemID.dustIron  ,Math.floor(Math.random() * 3  ),0]);
        drop.push([ItemID.dustGold  ,Math.floor(Math.random() * 2  ),0]);
        drop.push([ItemID.dustCopper,Math.floor(Math.random() * 2  ),0]);
        drop.push([ItemID.dustTin   ,Math.floor(Math.random() * 2  ),0]);
        drop.push([331              ,Math.floor(Math.random() * 6  ),0]);
        drop.push([ItemID.uranium   ,Math.floor(Math.random() * 1.5),0]);
        drop.push([351              ,Math.floor(Math.random() * 3  ),4]);
        ToolAPI.dropOreExp(coords,3,6,enchant.experience);
        return drop;
	}
	return [];
},2);

// [铜矿石]Copper Ore
IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper",[
    {name:"Copper Ore",texture:[["copper_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(BlockID.oreCopper,"stone",1,true);
Block.setDestroyLevel("oreCopper",1);

// [锡矿石]Tin Ore
IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin",[
    {name:"Tin Ore",texture:[["tin_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(BlockID.oreTin,"stone",1,true);
Block.setDestroyLevel("oreTin",1);

Item.addCreativeGroup("ore",Translation.translate("Ore"),[
	BlockID.oreUranium,
	BlockID.oreIridium,
	BlockID.oreBlend,
	BlockID.oreCopper,
	BlockID.oreTin
]);

var OreGenerator = {
    randomCoords:function(random,chunkX,chunkZ,minHeight,maxHeight){
		return {x:chunkX*16 + random.nextInt(16),y:random.nextInt((maxHeight || 128) - (minHeight || 0) + 1) - (minHeight || 0),z:chunkZ*16 + random.nextInt(16)};
    }
}

Callback.addCallback("GenerateChunkUnderground",function(chunkX,chunkZ,random){
    for(let i = 0;i < random.nextInt(13);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,4,56);
        World.setBlock(coords.x,coords.y,coords.z,BlockID.oreUranium,0);
    }

    if(random.nextDouble() < 0.25){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,4,48);
        World.setBlock(coords.x,coords.y,coords.z,BlockID.oreIridium,0);
    }

    for(let i = 0;i < random.nextInt(2);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,4,20);
        GenerationUtils.generateOre(coords.x,coords.y,coords.z,BlockID.oreBlend,0,5,false,random.nextInt());
    }

    for(let i = 0;i < random.nextInt(6);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,8,60);
        GenerationUtils.generateOre(coords.x,coords.y,coords.z,BlockID.oreCopper,0,10,false,random.nextInt());
    }

    for(let i = 0;i < random.nextInt(4);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,8,60);
        GenerationUtils.generateOre(coords.x,coords.y,coords.z,BlockID.oreTin,0,8,false,random.nextInt());
    }
});
Block.createSpecialType({
	base:1,
	solid:true,
	destroytime:2
},"ore");

// [铀矿石]Uranium Ore
var block_uranium_ore = IDRegistry.genBlockID(fz("oreUranium"));
Block.createBlock(fz("oreUranium"),[
    {name:"Uranium Ore",texture:[["uranium_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(block_uranium_ore,"stone",2,true);

Block.registerDropFunction(block_uranium_ore,function(coords,id,data,level,enchant){
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
var block_iridium_ore = IDRegistry.genBlockID(fz("oreIridium"));
Block.createBlock(fz("oreIridium"),[
    {name:"Iridium Ore",texture:[["iridium_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(block_iridium_ore,"stone",2,true);

Block.registerDropFunction(block_iridium_ore,function(coords,id,data,level,enchant){
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
var block_blended_dust_ore = IDRegistry.genBlockID(fz("oreBlendedDust"));
Block.createBlock(fz("oreBlendedDust"),[
    {name:"Blended Dust Ore",texture:[["blended_dust_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(block_blended_dust_ore,"stone",2,true);

Block.registerDropFunction(block_blended_dust_ore,function(coords,id,data,level,enchant){
    if(level >= 2){
        if(enchant.silk) return [[id,1,data]];

        var drop = [];
        drop.push([ItemID.dustIron  ,Math.floor(Math.random()*3  ),0]);
        drop.push([ItemID.dustGold  ,Math.floor(Math.random()*2  ),0]);
        drop.push([ItemID.dustCopper,Math.floor(Math.random()*2  ),0]);
        drop.push([ItemID.dustTin   ,Math.floor(Math.random()*2  ),0]);
        drop.push([331              ,Math.floor(Math.random()*6  ),0]);
        drop.push([ItemID.uranium   ,Math.floor(Math.random()*1.5),0]);
        drop.push([351              ,Math.floor(Math.random()*3  ),4]);
        ToolAPI.dropOreExp(coords,3,6,enchant.experience);
        return drop;
	}
	return [];
},2);

// [铜矿石]Copper Ore
var block_copper_ore = IDRegistry.genBlockID(fz("oreCopper"));
Block.createBlock(fz("oreCopper"),[
    {name:"Copper Ore",texture:[["copper_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(block_copper_ore,"stone",1,true);
Block.setDestroyLevel(block_copper_ore,1);

// [锡矿石]Tin Ore
var block_tin_ore = IDRegistry.genBlockID(fz("oreTin"));
Block.createBlock(fz("oreTin"),[
    {name:"Tin Ore",texture:[["tin_ore",0]],inCreative:true}
],"ore");
ToolAPI.registerBlockMaterial(block_tin_ore,"stone",1,true);
Block.setDestroyLevel(block_tin_ore,1);

// Group
Item.addCreativeGroup("ore",Translation.translate("Ore"),[
	block_uranium_ore     ,
	block_iridium_ore     ,
	block_blended_dust_ore,
	block_copper_ore      ,
	block_tin_ore         ,
]);

var OreGenerator = {
    randomCoords:function(random,chunkX,chunkZ,minHeight,maxHeight){
        return {x:Math.floor((chunkX + random.nextDouble()) * 16),y:Math.floor(minHeight + (maxHeight - minHeight) * random.nextDouble()),z:Math.floor((chunkZ + random.nextDouble()) * 16)}
    },

    setOreBlock:function(x,y,z,id,data){
        if(World.getBlockID(x,y,z) == 1) World.setBlock(x,y,z,id,(data || 0));
    },

    genOre:function(x,y,z,id,data){
        for(let x2 = -1;x2 < 2;x2++) for(let y2 = -1;y2 < 2;y2++) for(let z2 = -1;z2 < 2;z2++){
            this.setOreBlock(x + x2,y + y2,z + z2,id,data);
        }
    },
    
    genSmallOre:function(random,x,y,z,id,data){
        for(let x2 = -1;x2 < 2;x2++) for(let y2 = -1;y2 < 2;y2++) for(let z2 = -1;z2 < 2;z2++){
            var key1 = Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2);
            var key2 = random.nextDouble() * random.nextDouble() * 1.5 + random.nextDouble() / 2;
            if(key1 < key2) this.setOreBlock(x + x2,y + y2,z + z2,id,data);
        }
    },
    
    isTerrainTile:function(id){
        return (id == 1 || id == 2 || id == 3 || id == 12 || id == 13 || id == 24 || id == 49 || id == 60);
    },

    genSurfaceOre:function(random,chunkX,chunkZ,id,data,count,size){
        for(let i = 0;i < random.nextInt(count);i++){
            var coords = GenerationUtils.findSurface((chunkX + random.nextDouble()) * 16,96,(chunkZ + random.nextDouble()) * 16);
            coords.y--;
            size++;
    
            var blocks = [];
            var pos = [(random.nextDouble() * 2 - 1) * size,size * 0.7,(random.nextDouble() * 2 - 1) * size];
            for(let x2 = -size;x2 <= size;x2++) for(let z2 = -size;z2 <= size;z2++) for(let y2 = -size;y2 <= size;y2++){
                var x = coords.x + x2;
                var y = coords.y + y2;
                var z = coords.z + z2;
    
                var key = (size * 2 + 1) * (z2 + size) + (x2 + size);

                var block = World.getBlockID(x,y,z);
                if(this.isTerrainTile(block)){
                    blocks[key] = block;
                } else {
                    var sqrt = Math.sqrt(x2 * x2 + y2 * y2 * 0.6 + z2 * z2);
                    var angle = random.nextDouble() * 100 + Math.atan2(x2,z2) * 100;
                    angle = (angle - Math.floor(angle)) * 0.5;

                    if(sqrt + angle < size - 1){
                        World.setBlock(x,y,z,id,data);
                    } else {
                        if(blocks[key] > 0 && sqrt + Math.abs(y2) / size < size && (Math.sqrt(Math.pow(pos[0] - x2,2) + Math.pow(pos[1] - y2,2) + Math.pow(pos[2] - z2,2))) >= (size * random.nextDouble() * 0.8)){
                            World.setBlock(x,y,z,blocks[key]);
                            if(World.getBlockID(x,y - 1,z) == 2) World.setBlock(x,y - 1,z,3);
                            if(World.getBlockID(x,y + 1,z) == 0 && blocks[key] == 2 && random.nextDouble() < 0.6) World.setBlock(x,y + 1,z,31,1);
                        }
                    }
                }
            }
        }
    }
}

Callback.addCallback("GenerateChunkUnderground",function(chunkX,chunkZ,random){
    for(let i = 0;i < random.nextInt(13);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,4,56);
        OreGenerator.genSmallOre(random,coords.x,coords.y,coords.z,block_uranium_ore);
    }

    if(random.nextDouble() < 0.25){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,4,48);
        OreGenerator.genSmallOre(random,coords.x,coords.y,coords.z,block_iridium_ore);
    }

    for(let i = 0;i < random.nextInt(2);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,4,20);
        OreGenerator.genOre(coords.x,coords.y,coords.z,block_blended_dust_ore);
    }

    for(let i = 0;i < random.nextInt(6);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,8,60);
        OreGenerator.genOre(coords.x,coords.y,coords.z,block_copper_ore);
    }

    for(let i = 0;i < random.nextInt(4);i++){
        var coords = OreGenerator.randomCoords(random,chunkX,chunkZ,8,60);
        OreGenerator.genOre(coords.x,coords.y,coords.z,block_tin_ore);
    }

    // Surface Ore
    if(random.nextDouble() < 0.075){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,14,0,1,1.5);
    }
    
    if(random.nextDouble() < 0.250){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,15,0,1,1.2 + random.nextDouble());
    }

    if(random.nextDouble() < 0.125){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,block_uranium_ore,0,1,1);
    }

    if(random.nextDouble() < 0.008){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,block_iridium_ore,0,1,1);
    }

    if(random.nextDouble() < 0.125){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,block_blended_dust_ore,0,1,2);
    }

    if(random.nextDouble() < 0.5){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,block_copper_ore,0,1,2 + random.nextDouble());
    }

    if(random.nextDouble() < 0.5){
        OreGenerator.genSurfaceOre(random,chunkX,chunkZ,block_tin_ore,0,2,1 + random.nextDouble());
    }
});
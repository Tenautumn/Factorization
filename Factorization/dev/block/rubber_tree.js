var DIRT_TILES = {
	2:true,
	3:true,
	60:true
}

// [橡胶树树苗]Rubber Tree Sapling
var item_rubber_tree_sapling = IDRegistry.genItemID("rubberTreeSapling");
Item.createItem("rubberTreeSapling","Rubber Tree Sapling",{name:"rubber_tree_sapling"});

Item.registerUseFunction(item_rubber_tree_sapling,function(coords, item, block){
	var place = coords.relative;
	var tile = World.getBlock(place.x,place.y,place.z);
	if (World.canTileBeReplaced(tile.id,tile.data) && DIRT_TILES[World.getBlockID(place.x,place.y - 1,place.z)]){
		World.setBlock(place.x,place.y,place.z,block_rubber_tree_sapling);
		World.playSound(place.x,place.y,place.z,"dig.grass",1,0.8);
		Player.decreaseCarriedItem(1);
	}
});

var block_rubber_tree_sapling = IDRegistry.genBlockID("rubberTreeSapling");
Block.createBlock("rubberTreeSapling",[
	{name:"Rubber Tree Sapling",texture:[["rubber_tree_sapling",0]],inCreative:false}
],{rendertype:1,destroytime:0});
ToolAPI.registerBlockMaterial(block_rubber_tree_sapling,"plant");

TileRenderer.setEmptyCollisionShape(block_rubber_tree_sapling);
Block.setShape(block_rubber_tree_sapling,1/8,0,1/8,7/8,1,7/8);

Block.registerDropFunction(block_rubber_tree_sapling,function(){
	return [[item_rubber_tree_sapling,1,0]];
});

Block.setRandomTickCallback(block_rubber_tree_sapling,function(x,y,z){
	if(!DIRT_TILES[World.getBlockID(x,y - 1,z)]) World.destroyBlock(x,y,z,true);
	if(Math.random() < 0.05 && World.getLightLevel(x,y,z) >= 9){
		RubberTree.GenTree(coords.x,coords.y,coords.z);
	}
});

Callback.addCallback("ItemUse",function(coords,item,block){
	if(item.id == 351 && item.data == 15 && block.id == block_rubber_tree_sapling){
		for(let i = 0;i < 16;i++){
			var x = coords.x + Math.random();
			var y = coords.z + Math.random();
			var z = coords.y + Math.random();
			Particles.addFarParticle(ParticleType.happyVillager,x,y,z);
		}

		if(Math.random() < 0.25){
			RubberTree.GenTree(coords.x,coords.y,coords.z);
		}

		Player.decreaseCarriedItem(1);
	}
});

Callback.addCallback("DestroyBlock",function(coords){
	if(World.getBlockID(coords.x,coords.y + 1,coords.z) == block_rubber_tree_sapling){
		World.destroyBlock(coords.x,coords.y + 1,coords.z,true);
	}
});

function DestroyLeaves(x,y,z){
	for(let yy = y;yy <= y + (World.getBlockID(x,y + 1,z) == block_rubber_tree_leaves?4:0);yy++) for(let xx = x - 2;xx <= x + 2;xx++) for(let zz = z - 2;zz <= z + 2;zz++){
		if(World.getBlockID(xx,yy,zz) == block_rubber_tree_leaves) World.destroyBlock(xx,yy,zz,true);
	}
}

// [橡胶树原木]Rubber Tree Log
var block_rubber_tree_log = IDRegistry.genBlockID("rubberTreeLog");
Block.createBlock("rubberTreeLog",[
	{name:"Rubber Tree Log",texture:[["rubber_tree_log",1],["rubber_tree_log",1],["rubber_tree_log",0],["rubber_tree_log",0],["rubber_tree_log",0],["rubber_tree_log", 0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(block_rubber_tree_log,"wood");

Block.registerDropFunction(block_rubber_tree_log,function(coords,id){
	DestroyLeaves(coords.x,coords.y,coords.z);
	return [[id,1,0]];
});

Block.setRandomTickCallback(block_rubber_tree_log,function(x,y,z,id,data){
	if(Math.random() < 1/7) World.setBlock(x,y,z,block_rubber_tree_log_latex);
});

// [橡胶树原木]Rubber Tree Log
var block_rubber_tree_log_latex = IDRegistry.genBlockID("rubberTreeLogLatex");
Block.createBlock("rubberTreeLogLatex",[
	{name:"Rubber Tree Log",texture:[["rubber_tree_log",1],["rubber_tree_log",1],["rubber_tree_log_latex",0],["rubber_tree_log_latex",0],["rubber_tree_log_latex",0],["rubber_tree_log_latex",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_rubber_tree_log_latex,"wood");

Block.registerDropFunction(block_rubber_tree_log_latex,function(coords,id){
	DestroyLeaves(coords.x,coords.y,coords.z);
	return [[block_rubber_tree_log,1,0],[item_latex,1,0]];
});

// [橡胶树树叶]Rubber Tree Leaves
var block_rubber_tree_leaves = IDRegistry.genBlockID("rubberTreeLeaves");
Block.createBlock("rubberTreeLeaves",[
	{name:"Rubber Tree Leaves",texture:[["rubber_tree_leaves",0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(block_rubber_tree_leaves,"plant");

Block.registerDropFunction(block_rubber_tree_leaves,function(){
	return (Math.random() < 0.075?[[item_rubber_tree_sapling,1,0]]:[]);
});

var RubberTree = {
	GenTree:function(x,y,z,random){
		if(!random) random = new java.util.Random(Debug.sysTime());

		// Log
		var height = parseInt(random.nextDouble() * 2.5 + 5);
		for(let ys = 0;ys < height;ys++){
			if(ys == parseInt(random.nextDouble() * (height - 2)) + 1){
				World.setBlock(x,y + ys,z,block_rubber_tree_log_latex);
			} else {
				World.setBlock(x,y + ys,z,block_rubber_tree_log);
			}
		}
		
		// Leaves
		var leavesStart = 2 + random.nextInt(2);
		var leavesEnd = height;
		for(let ys = leavesStart;ys < leavesEnd;ys++) for(let xs = -2;xs <= 2;xs++) for(let zs = -2;zs <= 2;zs++){
			if(Math.sqrt(xs*xs + zs*zs)+(random.nextDouble()*0.5+0.5)*Math.pow(Math.abs((leavesEnd+leavesStart)/2-ys)/(leavesEnd-leavesStart),1.5)*1.2 <= 2.5){
				this.setLeaves(x + xs,y + ys,z + zs);
			}
		}

		for(let ys = 0;ys < (2 + parseInt(random.nextDouble() * 1.5));ys++){
			this.setLeaves(x,y + ys + height,z);
		}
	},

	setLeaves:function(x,y,z){
		var id = World.getBlockID(x,y,z);
		if(id == 0 || id == 106){
			World.setBlock(x,y,z,block_rubber_tree_leaves);
		}
	}
}

World.addGenerationCallback("GenerateChunk",function(chunkX,chunkZ,random){
	var coords = GenerationUtils.findSurface(chunkX*16 + random.nextInt(16),96,chunkZ*16 + random.nextInt(16));
	if(World.getBlockID(coords.x,coords.y,coords.z) == 2){
		RubberTree.GenTree(coords.x,coords.y + 1,coords.z,random);
	}
},"rubber_tree");
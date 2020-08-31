// [作物收割机]Crop Harvester
var block_crop_harvester = IDRegistry.genBlockID(fz("cropHarvester"));
Block.createBlock(fz("cropHarvester"),[
    {name:"Crop Harvester",texture:[["machine_bottom",0],["machine_top",0],["crop_harvester",0],["machine_side",0],["machine_side",0],["machine_side",0]],inCreative:false},
    {name:"Crop Harvester",texture:[["machine_bottom",0],["machine_top",0],["machine_side",0],["crop_harvester",0],["machine_side",0],["machine_side",0]],inCreative:true },
    {name:"Crop Harvester",texture:[["machine_bottom",0],["machine_top",0],["machine_side",0],["machine_side",0],["crop_harvester",0],["machine_side",0]],inCreative:false},
    {name:"Crop Harvester",texture:[["machine_bottom",0],["machine_top",0],["machine_side",0],["machine_side",0],["machine_side",0],["crop_harvester",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_crop_harvester,"stone",1,true);

Block.registerDropFunction(block_crop_harvester,function(coords,id,data,level){
    return level >= 1?[[id,1,1]]:[];
},1);

var GuiCropHarvester = new UI.StandartWindow({
	standart:{
		header:{text:{text:Translation.translate("Crop Harvester")}},
		inventory:{standart:true},
		background:{standart:true}
	},
	
	elements:{
        "slotInput1":{type:"slot",x:440,y:120},
        "slotInput2":{type:"slot",x:500,y:120},
        "slotInput3":{type:"slot",x:560,y:120},
        "slotInput4":{type:"slot",x:440,y:180},
        "slotInput5":{type:"slot",x:500,y:180},
        "slotInput6":{type:"slot",x:560,y:180},
        "slotInput7":{type:"slot",x:440,y:240},
        "slotInput8":{type:"slot",x:500,y:240},
        "slotInput9":{type:"slot",x:560,y:240},

        "slotOutput1":{type:"slot",x:680,y:120},
        "slotOutput2":{type:"slot",x:740,y:120},
        "slotOutput3":{type:"slot",x:800,y:120},
        "slotOutput4":{type:"slot",x:680,y:180},
        "slotOutput5":{type:"slot",x:740,y:180},
        "slotOutput6":{type:"slot",x:800,y:180},
        "slotOutput7":{type:"slot",x:680,y:240},
        "slotOutput8":{type:"slot",x:740,y:240},
        "slotOutput9":{type:"slot",x:800,y:240},
	}
});

TileEntity.registerPrototype(block_crop_harvester,{
    defaultValues:{
        progress:0
    },

    getOutputSlot:function(){
        var items = [];
        var slots = this.getTransportSlots().output;
        for(let i in slots){
            items.push(this.container.getSlot(slots[i]));
        }
        return items;
    },

    addItem:function(id,count,data){
        MachineRecipe.addItemBySlot(this.getOutputSlot(),id,Math.floor(count),data);
    },

    onUseBoneMeal:function(x,y,z){
        var block = World.getBlock(x,y,z);
        if((block.id == 59 || block.id == 104 || block.id == 105 || block.id == 141 || block.id == 142 || block.id == 244) && block.data < 7){
            for(let i = 0;i < 9;i++){
                var slot = this.container.getSlot("slotInput" + i);
                if(slot.id == 351 && slot.data == 15){
                    slot.count--;
                    
                    World.setBlock(x,y,z,block.id,Math.min(block.data + (3 + Math.random()*3),7));
                    return;
                }
            }
        }
    },

    getGuiScreen:function(){
		return GuiCropHarvester;
    },

    setSeedBlock:function(x,y,z){
        var seeds = {
            295:59 ,
            361:104,
            362:105,
            391:141,
            392:142,
            458:244
        }

        if(World.getBlockID(x,y,z) == 0){
            for(let i = 0;i < 9;i++){
                var slot = this.container.getSlot("slotInput" + i);
                if(seeds[slot.id] && World.getBlockID(x,y - 1,z) == 60){
                    slot.count--;
                    World.setBlock(x,y,z,seeds[slot.id]);
                    return;
                }
            }
        }
    },

    harvest:function(x,y,z){
        var block = World.getBlock(x,y,z);
        
        if(block.id == 86){
            this.addItem(86,1,0);
            World.destroyBlock(x,y,z);
        }

        if(block.id == 103){
            this.addItem(360,Math.random()*5 + 3,0);
            World.destroyBlock(x,y,z);
        }

        if(block.data == 7){
            var isHarvest = false;

            if(block.id == 59){
                this.addItem(295,Math.random()*3 + 1,0);
                this.addItem(296,1,0);
                isHarvest = true;
            }
            
            if(block.id == 141){
                this.addItem(391,Math.random()*3 + 1,0);
                isHarvest = true;
            }
    
            if(block.id == 142){
                this.addItem(392,Math.random()*3 + 1,0);
                if(Math.random() < 0.02) this.addItem(394,1,0);
                isHarvest = true;
            }
    
            if(block.id == 244){
                this.addItem(458,Math.random()*3,0);
                this.addItem(457,1 + Math.random()*2,0);
                isHarvest = true;
            }
    
            if(isHarvest) World.destroyBlock(x,y,z);
        }
    },

    tick:function(){
        if(World.getThreadTime()%5 == 0){
            var x = this.x - 4 + parseInt(this.data.progress/9);
            var z = this.z - 4 + parseInt(this.data.progress%9);
            var y = this.y;

            this.data.progress++;
            this.data.progress %= 81;
            if(x == this.x && z == this.z){
                World.setBlock(x,y - 1,z,9);
            } else {
                var block = World.getBlockID(x,y - 1,z);
                if((block == 2 || block == 3 || block == 243) && World.getBlockID(x,y,z) == 0){
                    World.destroyBlock(x,y - 1,z);
                    World.setBlock(x,y - 1,z,60,1);
                }

        
                this.onUseBoneMeal(x,y,z);
                this.harvest(x,y,z);
                this.setSeedBlock(x,y,z);
            }
        }

        var containers = StorageInterface.getNearestContainers(this,-1);
        for(let side in containers){
            StorageInterface.extractItemsFromContainer(this,containers[side],parseInt(side));
        }
        StorageInterface.putItems(this.getOutputSlot(),containers);
        
        this.container.validateAll();
    }
});
Machine.setRotationPlaceFunction(block_crop_harvester);
StorageInterface.createInterface(block_crop_harvester,{
	slots:{
        "slotInput1":{input:true},
        "slotInput2":{input:true},
        "slotInput3":{input:true},
        "slotInput4":{input:true},
        "slotInput5":{input:true},
        "slotInput6":{input:true},
        "slotInput7":{input:true},
        "slotInput8":{input:true},
        "slotInput9":{input:true},

        "slotOutput1":{output:true},
        "slotOutput2":{output:true},
        "slotOutput3":{output:true},
        "slotOutput4":{output:true},
        "slotOutput5":{output:true},
        "slotOutput6":{output:true},
        "slotOutput7":{output:true},
        "slotOutput8":{output:true},
        "slotOutput9":{output:true}
    },
    
	isValidInput:function(item){
        var items = {
            295:true,
            361:true,
            362:true,
            391:true,
            392:true,
            458:true,

            "351:15":true
        }

		return items[item.id] || items[item.id + ":" + item.data];
	}
});
// [作物收割机]Crop Harvester
IDRegistry.genBlockID("cropHarvester");
Block.createBlock("cropHarvester",[
    {name:"Crop Harvester",texture:[["machine_bottom",0],["machine_top",0],["machine_side",0],["crop_harvester",0],["machine_side",0],["machine_side",0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(BlockID.cropHarvester,"stone",1,true);
Block.setDestroyLevel("cropHarvester",1);

var GuiCropHarvester = new UI.StandartWindow({
	standart:{
		header:{text:{text:Translation.translate("Crop Harvester")}},
		inventory:{standart:true},
		background:{standart:true}
	},
    
    drawing:[
        {type:"bitmap",x:360,y:50,bitmap:"energy_bar_background",scale:GUI_SCALE}
    ],

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

        "slotOutput1":{type:"slot",x:680,y:120,isValid:function(){return false;}},
        "slotOutput2":{type:"slot",x:740,y:120,isValid:function(){return false;}},
        "slotOutput3":{type:"slot",x:800,y:120,isValid:function(){return false;}},
        "slotOutput4":{type:"slot",x:680,y:180,isValid:function(){return false;}},
        "slotOutput5":{type:"slot",x:740,y:180,isValid:function(){return false;}},
        "slotOutput6":{type:"slot",x:800,y:180,isValid:function(){return false;}},
        "slotOutput7":{type:"slot",x:680,y:240,isValid:function(){return false;}},
        "slotOutput8":{type:"slot",x:740,y:240,isValid:function(){return false;}},
        "slotOutput9":{type:"slot",x:800,y:240,isValid:function(){return false;}},

        "scaleEnergy":{type:"scale",x:360+GUI_SCALE*3,y:50+GUI_SCALE*3,direction:1,value:0.5,bitmap:"energy_bar_scale",scale:GUI_SCALE},
		"textStorage":{type:"text",font:{color:Color.BLACK},x:450,y:65,width:300,height:30,text:"0/0 Eu"}
	}
});

Machine.registerMachine(BlockID.cropHarvester,{
    defaultValues:{
        meta:0,
        progress:0,
        energy_consumption:3
    },

    getEnergyStorage:function(){
        return 2000;
    },

    getOutputSlot:function(){
        var items = [];
        var slots = this.getTransportSlots().output;
        for(let i in slots){
            items.push(this.container.getSlot(slots[i]));
        }
        return items;
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
            295:59 ,// 7
            361:104,// 7
            362:105,// 7
            391:141,// 3
            392:142,// 3
            458:244,// 3
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
        var slot = this.getOutputSlot();
        
        if(block.id == 86){
            MachineRecipe.addItemBySlot(slot,86,1,0);
            World.destroyBlock(x,y,z);
        }

        if(block.id == 103){
            MachineRecipe.addItemBySlot(slot,360,Math.floor(Math.random()*5 + 3),0);
            World.destroyBlock(x,y,z);
        }

        var isHarvest = false;

        if(block.data == 7){
            if(block.id == 59){
                MachineRecipe.addItemBySlot(slot,295,Math.floor(Math.random()*3 + 1),0);
                MachineRecipe.addItemBySlot(slot,296,1,0);
                this.addItem(296,1,0);
                isHarvest = true;
            }
            
            if(block.id == 141){
                MachineRecipe.addItemBySlot(slot,391,Math.floor(Math.random()*3 + 1),0);
                isHarvest = true;
            }
        }

        if(block.data == 3){
            if(block.id == 142){
                MachineRecipe.addItemBySlot(slot,392,Math.floor(Math.random()*3 + 1),0);
                if(Math.random() < 0.02) MachineRecipe.addItemBySlot(slot,394,1,0);
                isHarvest = true;
            }
    
            if(block.id == 244){
                MachineRecipe.addItemBySlot(slot,458,Math.floor(Math.random()*3),0);
                MachineRecipe.addItemBySlot(slot,457,Math.floor(Math.random()*2 + 1),0);
                isHarvest = true;
            }
        }

        if(isHarvest) World.destroyBlock(x,y,z);
    },

    tick:function(){
        if(World.getThreadTime()%5 == 0){
            if(this.data.energy >= this.data.energy_consumption){
                this.data.energy -= this.data.energy_consumption;
                
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
        }
        
        var containers = StorageInterface.getNearestContainers(this,-1);
        for(let side in containers){
            StorageInterface.extractItemsFromContainer(this,containers[side],parseInt(side));
        }
        StorageInterface.putItems(this.getOutputSlot(),containers);
        
        this.container.validateAll();

        this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
		this.container.setText("textStorage",this.data.energy + "/" + this.getEnergyStorage() + " Eu");
    },
        
    energyReceive:BasicEnergyReceive
});
TileRenderer.setRotationPlaceFunction(BlockID.cropHarvester);
StorageInterface.createInterface(BlockID.cropHarvester,{
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
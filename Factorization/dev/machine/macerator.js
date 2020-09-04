// [打粉机]Macerator
var block_macerator = IDRegistry.genBlockID("macerator");
Block.createBlock("macerator",[
    {name:"Macerator",texture:[["machine_bottom",0],["macerator_top",0],["machine_side",0],["macerator",0],["machine_side",0],["machine_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(block_macerator,[["machine_bottom",0],["macerator_top",0],["machine_side",0],["macerator",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(block_macerator,0,[["machine_bottom",0],["macerator_top",0],["machine_side",0],["macerator",0],["machine_side",0],["machine_side",0]]);
TileRenderer.registerRotationModel(block_macerator,4,[["machine_bottom",0],["macerator_top",1],["machine_side",0],["macerator",0],["machine_side",0],["machine_side",0]]);

ToolAPI.registerBlockMaterial(block_macerator,"stone",1,true);
Block.setDestroyLevel(block_macerator,1);

Callback.addCallback("PreLoaded",function(){
    MachineRecipe.addMachineRecipeFor("macerator",[
        {input:[{id:14,count:1,data:0}],output:[{id:item_dust_gold,count:2,data:0}]},
        {input:[{id:15,count:1,data:0}],output:[{id:item_dust_iron,count:2,data:0}]},
        {input:[{id:41,count:1,data:0}],output:[{id:item_dust_gold,count:9,data:0}]},
        {input:[{id:42,count:1,data:0}],output:[{id:item_dust_iron,count:9,data:0}]},
        {input:[{id:265,count:1,data:0}],output:[{id:item_dust_iron,count:1,data:0}]},
        {input:[{id:266,count:1,data:0}],output:[{id:item_dust_gold,count:1,data:0}]}
    ]);
});

var GuiMacerator = new UI.StandartWindow({
	standart:{
		header:{text:{text:Translation.translate("Macerator")}},
		inventory:{standart:true},
		background:{standart:true}
	},
	
	drawing:[
        {type:"bitmap",x:580,y:180,bitmap:"arrow_bar_background",scale:GUI_SCALE},
        {type:"bitmap",x:360,y:50,bitmap:"energy_bar_background",scale:GUI_SCALE}
    ],
	
	elements:{
		"slotInput":{type:"slot",x:500,y:180,isValid:function(id,count,data,container){
			return MachineRecipe.isValidInput("macerator",id,data);
        }},
        
        "slotOutput":{type:"slot",x:680,y:180,isValid:function(id,count,data,container){
			return false;
		}},

        "scaleProgress":{type:"scale",x:580,y:180,direction:0,value:0.5,bitmap:"arrow_bar_scale",scale:GUI_SCALE},

		"scaleEnergy":{type:"scale",x:360+GUI_SCALE*3,y:50+GUI_SCALE*3,direction:1,value:0.5,bitmap:"energy_bar_scale",scale:GUI_SCALE},
		"textStorage":{type:"text",font:{color:Color.BLACK},x:450,y:65,width:300,height:30,text:"0/0 Eu"}
	}
});


Machine.registerMachine(block_macerator,{
    defaultValues:{
        meta:0,
        progress:0,
        isActive:false,
        energy_consumption:3
    },

    getEnergyStorage:function(){
        return 2000;
    },

	getGuiScreen:function(){
		return GuiMacerator;
    },
    
    getTier:function(){
        return 2;
    },
    
    tick:function(){
        var recipe = MachineRecipe.getMachineRecipe("macerator",[this.container.getSlot("slotInput")]);
        if(recipe){
            if(this.data.energy >= this.data.energy_consumption){
                this.data.energy -= this.data.energy_consumption;
                this.data.progress += 1 / 400;
                this.activate();

                if(this.data.progress.toFixed(3) >= 1){
                    MachineRecipe.setRecipeOutputBySlot(recipe,[this.container.getSlot("slotInput")],[this.container.getSlot("slotOutput")]);
                    this.data.progress = 0;
                }
            } else {
                this.deactivate();
            }
        } else {
            this.deactivate();
            this.data.progress = 0;
        }
        
        this.container.setScale("scaleProgress",this.data.progress);
		this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
		this.container.setText("textStorage",this.data.energy + "/" + this.getEnergyStorage() + " Eu");
    },
        
    energyReceive:BasicEnergyReceive
});
TileRenderer.setRotationPlaceFunction(block_macerator);
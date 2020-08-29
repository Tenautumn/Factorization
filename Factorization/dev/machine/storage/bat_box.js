// [电池盒]Bat Box
IDRegistry.genBlockID(fz("batbox"));
Block.createBlock(fz("batbox"),[
	{name:"Bat Box",texture:[["batbox_side",0],["batbox",0],["batbox_side",0],["batbox_side",0],["batbox_side",0],["batbox_side",0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(fz("batbox"),"wood");

var GuiBatBox = new UI.StandartWindow({
	standart:{
		header:{text:{text:Translation.translate("Bat Box")}},
		inventory:{standart:true},
		background:{standart:true}
	},
	
	drawing:[
		{type:"bitmap",x:360,y:50,bitmap:"energy_bar_background",scale:GUI_SCALE},
	],
	
	elements: {
		"scaleEnergy":{type:"scale",x:360+GUI_SCALE*3,y:50+GUI_SCALE*3,value:0.5,bitmap:"energy_bar_scale",scale:GUI_SCALE},
		"textStorage":{type:"text",x:450,y:70,width:300,height:30,text:"0/40000 Eu"}
	}
});

Machine.registerMachine(fz("batbox"),{
	canReceiveEnergy:function(side,type){
		return side == 1;
	},
	
	canExtractEnergy:function(side,type){
		return side != 1;
	},

	getEnergyStorage:function(){
		return 40000;
	},

	getGuiScreen:function(){
		return GuiBatBox;
	},

	tick:function(){
		this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
		this.container.setText("textStorage",this.data.energy + "/" + this.getEnergyStorage() + " Eu");
	}
});
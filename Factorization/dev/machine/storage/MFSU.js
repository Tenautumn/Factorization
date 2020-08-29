// MFSU
IDRegistry.genBlockID(fz("MFSU"));
Block.createBlock(fz("MFSU"),[
	{name:"MFSU",texture:[["mfsu_side",0],["mfsu_front",0],["mfsu_side",0],["mfsu_side",0],["mfsu_side",0],["mfsu_side",0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(fz("MFSU"),"wood");

Item.addCreativeGroup("storage",Translation.translate("Storage"),[BlockID[fz("MFSU")]]);

var GuiMFSU = new UI.StandartWindow({
	standart:{
		header:{text:{text:Translation.translate("MFSU")}},
		inventory:{standart:true},
		background:{standart:true}
	},
	
	drawing:[
		{type:"bitmap",x:360,y:50,bitmap:"energy_bar_background",scale:GUI_SCALE}
	],
	
	elements:{
		"slotEnergyOutput":{type:"slot",x:560,y:180,isValid:function(id,count,data,container){
			return ChargeItemRegistry.isValidItem(id,"Eu",container.tileEntity.getTier());
		}},

		"scaleEnergy":{type:"scale",x:360+GUI_SCALE*3,y:50+GUI_SCALE*3,value:0.5,bitmap:"energy_bar_scale",scale:GUI_SCALE},
		"textStorage":{type:"text",font:{color:Color.BLACK},x:450,y:65,width:300,height:30,text:"0/0 Eu"}
	}
});

Machine.registerStorage(fz("MFSU"),{
	canReceiveEnergy:function(side){
		return side == 1;
	},
	
	canExtractEnergy:function(side){
		return side != 1;
	},

	getEnergyStorage:function(){
		return 600000;
	},

	getGuiScreen:function(){
		return GuiMFSU;
	},

    getTier:function(){
        return 3;
    },

	tick:function(){
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergyOutput"),"Eu",this.data.energy,this.getTier());

		this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
		this.container.setText("textStorage",this.data.energy + "/" + this.getEnergyStorage() + " Eu");
	}
});

/**
var fz_1b0 = fz_26 - fz_15a["x"];
var fz_1b1 = fz_27 - fz_15a["y"];
var fz_1b2 = fz_28 - fz_15a["z"];
var fz_15b = Math["sqrt"](fz_1b0 * fz_1b0 + fz_1b1 * fz_1b1 + fz_1b2 * fz_1b2);
fz_1b0 /= fz_15b;
fz_1b1 /= fz_15b;
fz_1b2 /= fz_15b;
var fz_13 = 0;
for (var fz_1a7 = 0; fz_1a7 < fz_15b; fz_1a7 += 0.75 + Math["random"]() * 0.5) {
    var fz_1b3 = fz_15a["x"] + fz_1b0 * fz_1a7;
    var fz_1b4 = fz_15a["y"] + fz_1b1 * fz_1a7;
    var fz_1b5 = fz_15a["z"] + fz_1b2 * fz_1a7;
    Level["addParticle"](5, fz_1b3, fz_1b4, fz_1b5, 0, 0, 0, 1);
    fz_13++;
    if (fz_13 > 75) {
        break
    }
}
*/
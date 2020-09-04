// [太阳能发电机]Solar Panel
var block_solar_panel = IDRegistry.genBlockID("solarPanel");
Block.createBlock("solarPanel",[
	{name:"Solar Panel",texture:[["machine_bottom",0],["solar_panel",0],["machine_side",0],["machine_side",0],["machine_side",0],["machine_side",0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(block_solar_panel,"stone",1,true);
Block.setDestroyLevel(block_solar_panel,1);

Machine.registerGenerator(block_solar_panel,{
    getEnergyStorage:function(){
		return 20;
    },
    
	tick:function(){
		if(World.getThreadTime()%100 == 0){
            if(GenerationUtils.canSeeSky(this.x,this.y + 1,this.z) && World.getLightLevel(this.x,this.y + 1,this.z) == 15){
                this.data.energy = 10;
            }
        }
    },
    
	energyTick:function(type,src){
		var output = Math.min(32,this.data.energy);
		this.data.energy += src.add(output) - output;
	}
});
function BasicEnergyReceive(type,amount,voltage){
    var add = 0;

    if(voltage > this.getMaxVoltage()){
        if(__config__.getBool("machine.voltage")){
            World.explode(this.x + 0.5,this.y + 0.5,this.z + 0.5,0.5,true);
            World.setBlock(this.x,this.y,this.z,0);
            this.selfDestroy();
            return 1;
        }

        add = Math.min(this.getMaxVoltage(),this.getEnergyStorage() - this.data.energy);
    } else {
        add = Math.min(amount,this.getEnergyStorage() - this.data.energy);
    }

    this.data.energy += add;
    this.data.energy_receive += add;
    this.data.voltage = Math.max(this.data.voltage,voltage);

    return add;
}

function BasicEnergyOutput(type,src){
    this.data.last_energy_receive = this.data.energy_receive;
    this.data.energy_receive = 0;
    this.data.last_voltage = this.data.voltage;
    this.data.voltage = 0;
    
    var output = this.getMaxVoltage();
    if(this.data.energy >= output){
        this.data.energy += src.add(output) - output;
    }
}

var Machine = {
    registerPrototype:function(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

        TileEntity.registerPrototype(id,state);
    },

    registerMachine:function(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

        ICRender.getGroup("fz-wire").add(id,-1);

        if(state.defaultValues){
			state.defaultValues.energy = 0;
			state.defaultValues.voltage = 0;
		} else {
			state.defaultValues = {
                energy:0,
                voltage:0
            }
		}

        state.getEnergyStorage = state.getEnergyStorage || function(){
            return 40000;
        }

        state.getMaxVoltage = state.getMaxVoltage || function(){
            return power(this.getTier());
        }
    
        state.getTier = state.getTier || function(){
            return 1;
        }

        state.getTier = state.getTier || function(){
            this.data.voltage = 0;
        }

        ItemName.registerTooltipAddFunction(id,function(item){
            var tile = TileEntity.getPrototype(item.id);
            return Translation.translate("Power Tier: ") + tile.getTier();
        },"power-tier");

        this.registerPrototype(id,state);
        EnergyTileRegistry.addEnergyTypeForId(id,EU);
    },

    registerGenerator(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

		state.canReceiveEnergy = function(){
			return false;
		},
	
		state.isEnergySource = function(){
			return true;
		},
		
		state.energyTick = state.energyTick || BasicEnergyOutput;
		
		this.registerMachine(id,state);
	},
	
	registerEUStorage(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

		state.isEnergySource = function(){
			return true;
		},
		
		state.energyReceive = state.energyReceive || BasicEnergyReceive;
		
		state.energyTick = state.energyTick || BasicEnergyOutput;
		
		this.registerMachine(id,state);
	},

    isValidEUItem:function(id,count,data,container){
        return ChargeItemRegistry.isValidItem(id,"Eu",container.tileEntity.getTier());
    },
    
    isValidEUStorage:function(id,count,data,container){
        return ChargeItemRegistry.isValidStorage(id,"Eu",container.tileEntity.getTier());
    }
}
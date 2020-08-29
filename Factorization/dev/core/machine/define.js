function BasicEnergyReceive(type,amount,voltage){
    var add = 0;

    if(voltage > this.getMaxVoltage()){
        if(__config__.getBool("machine.voltage")){
            World.setBlock(this.x,this.y,this.z,0);
            World.explode(this.x + 0.5,this.y + 0.5,this.z + 0.5,1.2,true);
            this.selfDestroy();
            return 1;
        }

        add = Math.min(this.getMaxVoltage(),this.getEnergyStorage() - this.data.energy);
    } else {
        add = Math.min(amount,this.getEnergyStorage() - this.data.energy);
    }

    this.data.energy += add;
    this.data.voltage = Math.max(this.data.voltage,voltage);

    return add;
}

function BasicEnergyOutput(type,src){
    this.data.lastVoltage = this.data.voltage;
    this.data.voltage = 0;
    
    var output = this.getMaxVoltage();
    if(this.data.energy >= output){
        this.data.energy += src.add(output) - output;
    }
}

var Machine = {
    machineIDs:{},

    isMachine:function(id){
        return this.machineIDs[id];
    },

    registerMachine:function(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

        this.machineIDs[id] = true;
        ICRender.getGroup("fz-wire").add(id,-1);

        if(state.defaultValues){
			state.defaultValues.energy = 0;
            state.defaultValues.voltage = 0;
            state.defaultValues.lastVoltage = 0;
		} else {
			state.defaultValues = {
                energy:0,
                voltage:0,
                lastVoltage:0
            }
		}

        state.getEnergyStorage = state.getEnergyStorage || function(){
            return 0;
        }

        state.getMaxVoltage = state.getMaxVoltage || function(){
            return power(this.getTier());
        }
        
        state.getTier = state.getTier || function(){
            return 1;
        }

        state.getTier = state.getTier || function(){
            this.data.voltage = 0;
            this.data.lastVoltage = 0;
        }

        ItemName.registerTooltipAddFunction(id,function(item){
            var tile = TileEntity.getPrototype(item.id);
            return Translation.translate("Power Tier: ") + tile.getTier();
        },"power-tier");
 
        TileEntity.registerPrototype(id,state);
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
	
	registerStorage(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

		state.isEnergySource = function(){
			return true;
		},
		
		state.energyReceive = state.energyReceive || BasicEnergyReceive;
		
		state.energyTick = state.energyTick || BasicEnergyOutput;
		
		this.registerMachine(id,state);
    },

    registerTransformer:function(name,tier){
        var id = Block.getNumericId(name);
        if(id == -1) return;
        
        tier++;
        this.registerMachine(id,{
            getOutputSide:function(){
                return World.getBlockData(this.x,this.y,this.z);
            },
        
            canReceiveEnergy:function(side){
                return side != this.getOutputSide();
            },
            
            canExtractEnergy:function(side){
                return side == this.getOutputSide();
            },
        
            getEnergyStorage:function(){
                return this.getMaxVoltage();
            },
        
            energyTick:function(type,src){
                this.data.lastVoltage = this.data.voltage;
                this.data.voltage = 0;
            
                if(this.data.energy >= this.getMaxVoltage()/4){
                    var output = this.data.energy;
                    this.data.energy += src.add(output,this.getMaxVoltage()/4) - output;
                }
            },
        
            getTier:function(){
                return tier;
            },
        
            energyReceive:BasicEnergyReceive
        });
        this.setRotationPlaceFunction(id,true);

        ItemName.removeTooltipByPrefix(id,"power-tier");
        ItemName.registerTooltipAddFunction(id,function(item,name){
            var tile = TileEntity.getPrototype(item.id);
            return "Low: " + power(tile.getTier() - 1) + " EU/t High: " + power(tile.getTier()) + " EU/t";
        });
    },

    getRotationSide:function(isFull){
        var pitch = EntityGetPitch(Player.get());
        if(isFull){
            if(pitch < -45) return 0;
            if(pitch > 45) return 1;
        }
    
        var rotation = Math.floor((EntityGetYaw(Player.get())-45)%360/90);
        if(rotation < 0) rotation += 4;
        rotation = [3,1,2,0][rotation];
        if(isFull) return rotation + 2;
        return rotation;
    },

    setRotationPlaceFunction:function(name,isFull){
        var id = Block.getNumericId(name);
        if(id == -1) return;

        Block.registerPlaceFunction(id,function(coords,item,block){
            var place = World.canTileBeReplaced(block.id,block.data)?coords:coords.relative;
            World.setBlock(place.x,place.y,place.z,item.id,Machine.getRotationSide(isFull));
            World.playSound(place.x,place.y,place.z,"dig.stone",1,0.8)
            World.addTileEntity(place.x, place.y, place.z);
        });
    }
}
function BasicEnergyReceive(type,amount,voltage){
    var add = 0;

    var maxVoltage = this.getMaxVoltage();
    if(voltage > maxVoltage){
        if(__config__.getBool("machine.voltage")){
            World.setBlock(this.x,this.y,this.z,0);
            World.explode(this.x + 0.5,this.y + 0.5,this.z + 0.5,1.2,true);
            this.selfDestroy();
            return 1;
        }

        add = Math.min(maxVoltage,this.getEnergyStorage() - this.data.energy);
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
    
    var maxVoltage = this.getMaxVoltage();
    if(this.data.energy >= maxVoltage){
        this.data.energy += src.add(maxVoltage) - maxVoltage;
    }
}

var Machine = {
    machineIDs:{},

    isMachine:function(id){
        return this.machineIDs[id];
    },

    registerPrototype:function(name,state){
        var id = Block.getNumericId(name);
        if(id == -1) return;

        if(state.defaultValues && state.defaultValues.isActive !== undefined){
            state.defaultValues.meta = 0;
            
            state.renderer = state.renderer || function(){
                TileRenderer.mapAtCoords(this.x,this.y,this.z,this.blockID,this.data.meta + (this.data.isActive?(this.data.full?6:4):0));
            };

            state.setActive = state.setActive || function(active){
                if(this.data.isActive != active){
                    this.data.isActive = active;
                    this.renderer();
                }
            }

            state.activate = state.activate || function(){
                this.setActive(true);
            }

            state.deactivate = state.deactivate || function(){
                this.setActive(false);
            }

            state.destroy = state.destroy || function(){
                BlockRenderer.unmapAtCoords(this.x,this.y,this.z);
            }
		}

        if(!state.init && state.renderer) state.init = state.renderer;

        TileEntity.registerPrototype(id,state);
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
 
        this.registerPrototype(name,state);
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
            defaultValues:{
                meta:0,
                full:true
            },
        
            canReceiveEnergy:function(side){
                return side != this.data.meta;
            },
            
            canExtractEnergy:function(side){
                return side == this.data.meta;
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
        TileRenderer.setRotationPlaceFunction(id,true);

        ItemName.removeTooltipByPrefix(id,"power-tier");
        ItemName.registerTooltipAddFunction(id,function(item,name){
            var tile = TileEntity.getPrototype(item.id);
            return "Low: " + power(tile.getTier() - 1) + " EU/t High: " + power(tile.getTier()) + " EU/t";
        });

        Item.addCreativeGroup("transformer",Translation.translate("Transformer"),[id]);
    },

    wireIDs:{},

    registerWire:function(name,maxVoltage){
        var itemID = Item.getNumericId(name);
        var blockID = Block.getNumericId(name);

        Item.registerUseFunction(itemID,function(coords,item,block){
            var place = coords;
            if(!World.canTileBeReplaced(block.id,block.data)){
                place = coords.relative;
                block = World.getBlock(place.x,place.y,place.z);
                if(!World.canTileBeReplaced(block.id,block.data)) return;
            }
            
            World.setBlock(place.x,place.y,place.z,blockID,0);
            Player.decreaseCarriedItem(1);
            EnergyTypeRegistry.onWirePlaced(place.x,place.y,place.z);
        });

        ItemName.registerTooltipAddFunction(itemID,function(item){
            return Translation.translate("Max Voltage: ") + maxVoltage;
        },"voltage");

        EU.registerWire(blockID,function(voltage){
            for(let key in this.wireMap){
                var x = Math.floor(key.split(":")[0]);
                var y = Math.floor(key.split(":")[1]);
                var z = Math.floor(key.split(":")[2]);

                World.setBlock(x,y,z,0);
                for(let i = 0;i < 32;i++){
                    Particles.addFarParticle(ParticleType.smoke,x + Math.random(),y + Math.random(),z + Math.random(),0,0.01,0);
                }
            }
            EnergyNetBuilder.removeNet(this);
        });

        Block.registerDropFunction(blockID,function(){
            return [[itemID,1,0]];
        });

        Block.registerPopResourcesFunction(blockID,function(coords,block){
            if(Math.random() < 0.25){
                World.drop(coords.x + 0.5,coords.y + 0.5,coords.z + 0.5,itemID,1,0);
            }
            EnergyTypeRegistry.onWireDestroyed(coords.x,coords.y,coords.z,block.id);
        });

        Item.addCreativeGroup("wire",Translation.translate("Wire"),[itemID]);
    }
}
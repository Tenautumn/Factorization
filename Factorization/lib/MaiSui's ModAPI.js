LIBRARY({
    name: "MaiSui's ModAPI",
    version: 1,
    shared: true,
    api: "CoreEngine"
});

// MaiSui's ModAPI lib By MaiSui.

String.prototype.toInitialCase = function(){
    var data = this.toLowerCase().split(/\s+/); 
    for(let i in data) data[i] = data[i].slice(0,1).toUpperCase() + data[i].slice(1);
    return data.join(" ");
}

// ================================================== * Item * ================================================== //

Item.foodEatenFunctions = {}

Item.registerFoodEatenFunctionForID = function(id,state){
    Item.foodEatenFunctions[id] = state;
}

Item.registerFoodEatenFunction = function(name,state){
    var id = Item.getNumericId(name);
    if(id != -1){
        Item.registerEatenFunctionForID(id,state);
        return true;
    }
    return false;
}

Item.onEatenFood = function(food,ratio){
    var item = Player.getCarriedItem();
    Item.foodEatenFunctions[item.id](item,{food:food,ratio:ratio});
}

Callback.addCallback("FoodEaten",function(food,ratio){
    Item.onEatenFood(food,ratio);
});

// ================================================== * Player * ================================================== //

Player.setSneaking = function(sneak){
    Entity.setSneaking(Player.get(),sneak);
}

Player.getSneaking = function(){
    return Entity.getSneaking(Player.get());
}

Player.getItemCountByInventory = function(id,data){
    var count = 0;
    for(let slot = 0;slot < 36;slot++){
        var item = Player.getInventorySlot(slot);
        if(item.id == id && (data == -1 || item.data == (data || 0))) count += item.count;
    }
    return count;
}

Callback.addCallback("EntityDeath",function(entity){
    if(entity == Player.get()) Callback.invokeCallback("PlayerDeath",Player.getPosition());
});

// ================================================== * Chunk * ================================================== //

var Chunk = {
    chunks:{},

    initValues:{},

    isChunk:function(chunkX,chunkZ,dimension){
        return this.chunks[dimension + ":" + chunkX + ":" + chunkZ]?true:false;
    },

    addInitValues:function(data){
        for(let i in data) this.initValues[i] = data[i];
    },

    initChunk:function(chunkX,chunkZ,dimension){
        var key = dimension + ":" + chunkX + ":" + chunkZ;
        if(!this.isChunk(key)) this.chunks[key] = this.initValues;
    },

    getChunk:function(chunkX,chunkZ,dimension){
        this.initChunk(chunkX,chunkZ,dimension);
        return this.chunks[dimension + ":" + chunkX + ":" + chunkZ];
    },

    setChunkData:function(chunkX,chunkZ,data,dimension){
        this.initChunk(chunkX,chunkZ,dimension);
        for(let i in data) this.chunks[dimension + ":" + chunkX + ":" + chunkZ][i] = data[i];
    }
}

Callback.addCallback("GenerateChunk",function(chunkX,chunkZ){
    Chunk.initChunk(chunkX,chunkZ,Player.getDimension());
});

Callback.addCallback("GenerateNetherChunk",function(chunkX,chunkZ){
    Chunk.initChunk(chunkX,chunkZ,Player.getDimension());
});

Callback.addCallback("GenerateEndChunk",function(chunkX,chunkZ){
    Chunk.initChunk(chunkX,chunkZ,Player.getDimension());
});

Saver.addSavesScope("_chunkdatas",
    function read(scope){
        Chunk.chunks = scope || {};
    },
    function save(){
        return Chunk.chunks;
    }
);

// ================================================== * ItemName * ================================================== //

var ItemName = {
    tooltipAddFunctions:{},

    registerTooltipAddFunction:function(id,state,prefix){
        if(!this.tooltipAddFunctions[id]) this.tooltipAddFunctions[id] = [];
        this.tooltipAddFunctions[id].push({func:state,prefix:(prefix || "null")});
    },

    removeTooltip:function(id){
        delete this.tooltipAddFunctions[id];
    },
    
    removeTooltipByPrefix:function(id,prefix){
        var tooltip = this.tooltipAddFunctions[id];
        if(tooltip){
            for(let i in tooltip){
                if(tooltip[i].prefix == prefix){
                    delete tooltip[i];
                }
            }
            return true;
        }
        return false;
    },

    getTooltipFunction:function(item,translation,name){
        var tooltip = "";
        for(let i in this.tooltipAddFunctions[item.id]){
            var data = this.tooltipAddFunctions[item.id][i];
            tooltip += "\n§7" + data.func(item,translation,name);
        }
        return tooltip;
    },
    
    registerNameOverrideFunction:function(id,state){
        Item.registerNameOverrideFunction(id,function(item,translation,name){
            var tooltip = ItemName.getTooltipFunction(item,translation,name);
            return state(item,translation,name,tooltip);
        });
    }
}

Callback.addCallback("LevelLoaded",function(){
    for(let id in ItemName.tooltipAddFunctions){
        Item.registerNameOverrideFunction(parseInt(id),function(item,translation,name){
            return translation + ItemName.getTooltipFunction(item,translation,name);
        });
    }
});

// ================================================== * OreDict * ================================================== //

var OreDict = {
    dicts:{},
    preferreds:{},
    transformings:{},

    getPreferredItem:function(name,isDict){
        var preferred = this.preferreds[name];
        if(preferred) return preferred;

        if(!isDict){
            var dict = this.dicts[name];
            if(dict){
                for(let i in dict){
                    if(i.indexOf(":") != -1){
                        var item = i.split(":");
                        return{id:eval(item[0]),data:item[1]}
                    } else {
                        return {id:eval(i),data:0}
                    }
                }
            }
        }
    },

    addOre:function(name,item){
        if(!this.dicts[name]) this.dicts[name] = {}
        for(let i in item){
            this.dicts[name][item[i].id + ":" + (item[i].data || 0)] = true;
        }
    },

    registerItemUnified:function(name,id,data){
        var item = {}

        if(typeof(id) == "object") item = id;
        if(typeof(id) == "number") item = {id:id,data:data}

        this.preferreds[name] = {id:item.id,data:(item.data || 0)}
        this.transformings[name] = {id:item.id,data:(item.data || 0)}
    }
}

Callback.addCallback("tick",function(){
    if(World.getThreadTime()%20 == 0){
        for(let i in OreDict.transformings){
            var item = OreDict.transformings[i];
            for(let slot = 0;slot < 36;slot++){
                var inv = Player.getInventorySlot(slot);
                if(OreDict.dicts[name][inv.id + ":" + inv.data]){
                    Player.setInventorySlot(slot,item.id,inv.count,(item.data || 0));
                }
            }
        }
    }
});

// ================================================== * MachineRecipe * ================================================== //

var MachineRecipe = {
    recipes:{},

    getRecipe:function(name){
        if(!this.recipes[name]) this.recipes[name] = [];
		return this.recipes[name];
    },

    parseItem:function(item){
        var data = [];
        for(let i in item){
            data.push({id:item[i].id,count:(item[i].count || 1),data:(item[i].data || 0)});
        }
        return data;
    },

    addMachineRecipe:function(name,input,output,extra){
        var recipe = this.getRecipe(name);
        recipe.push({input:this.parseItem(input),output:this.parseItem(output),extra:(extra || {})});
    },

    addMachineRecipeFor:function(name,recipes){
        for(let i in recipes){
            this.addMachineRecipe(name,recipes[i].input,recipes[i].output,recipes[i].extra || {});
        }
    },

    parseInput:function(input){        
        var item = {}
        for(let i in input){
            let source = input[i];
            if(source.id > 0){
                if(!item[source.id]) item[source.id] = 0;
                item[source.id] += source.count;

                if(!item[source.id + ":" + source.data]) item[source.id + ":" + source.data] = 0;
                item[source.id + ":" + source.data] += source.count;
            }
        }
        return item;
    },

    getMachineRecipe:function(name,slotInput){
        var recipe = this.getRecipe(name);
        for(let i in recipe){
            var valid = true;
            for(let i2 in recipe[i].input){
                var source = recipe[i].input[i2];
                var count = this.parseInput(slotInput)[source.id + ((source.data == -1)?"":":" + source.data)];
                if(!count || count < source.count){
                    valid = false;
                    break;
                }
            }

            if(valid) return recipe[i];
        }
    },

    addItemBySlot:function(slots,id,count,data){
        if(count > 0){
            for(let i in slots){
                var slot = slots[i];

                var maxStack = Item.getMaxStack(slot.id);
                if(slot.id == 0 || slot.id == id && slot.data == data && slot.count < maxStack){
                    slot.id = id;
                    slot.data = data;

                    var minCount = maxStack - slot.count;
                    if(minCount < count){
                        slot.count += Math.min(minCount,count);
                        this.addItemBySlot(slot,id,count - minCount,data);
                        return;
                    } else {
                        slot.count += count;
                        return;
                    }
                }
            }
            
            World.drop(this.x + 0.5,this.y + 1.5,this.z + 0.5,id,count,data);
        }
    },

    decreaseItemBySlot:function(slots,id,count,data){
        if(count > 0){
            for(let i in slots){
                var slot = slots[i];
                if(slot.id == id && (data == -1 || slot.data == data) && slot.count < count){
                    var slotCount = slot.count;
                    slot.count -= slotCount;
                    this.decreaseItemBySlot(slot,id,count - slotCount,data);
                    return;
                } else {
                    slot.count -= count;
                    return;
                }
            }
        }
    },

    setRecipeOutputBySlot:function(recipe,input,output){
        for(let i in recipe.output){
            this.addItemBySlot(output,recipe.output[i].id,recipe.output[i].count,recipe.output[i].data);
        }

        for(let i in recipe.input){
            this.decreaseItemBySlot(input,recipe.input[i].id,recipe.input[i].count,recipe.input[i].data);
        }
    },
    
    isValidInput:function(name,id,data){
        var item = {}

        if(typeof(id) == "object") item = id;
        if(typeof(id) == "number") item = {id:id,data:data}
        
        var recipe = this.getRecipe(name);
        for(let i in recipe) for(let i2 in recipe[i].input){
            var input = recipe[i].input[i2];
            if(input.id == item.id && input.data == (item.data || 0)){
                return true;
            }
        }
        return false;
    },

    getSlotAll:function(match,tile){
        var slot = [];
        for(let name in tile.container.slots){
            if(name.match(match)){
                slot.push(tile.container.getSlot(name));
            }
        }
        return slot;
    }
}



EXPORT("Chunk",Chunk);
EXPORT("OreDict",OreDict);
EXPORT("ItemName",ItemName);
EXPORT("MachineRecipe",MachineRecipe);
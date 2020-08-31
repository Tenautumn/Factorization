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

    onTooltipAdd:function(){
        for(let id in ItemName.tooltipAddFunctions){
            Item.registerNameOverrideFunction(parseInt(id),function(item,translation,name){
                var tooltip = "";
                for(let i in ItemName.tooltipAddFunctions[item.id]){
                    var data = ItemName.tooltipAddFunctions[item.id][i];
                    tooltip += "\n§7" + data.func(item,translation,name);
                }
                return translation + tooltip;
            });
        }
    }
}

Callback.addCallback("LevelLoaded",function(){
    ItemName.onTooltipAdd();
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
        for(let i in item) data.push({id:item[i].id,count:(item[i].count || 1),data:(item[i].data || 0)});
        return data;
    },

    addMachineRecipe:function(name,input,output,extra){
        var recipe = this.getRecipe(name);
        recipe.push({input:this.parseItem(input),output:this.parseItem(output),extra:(extra || {})});
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

    addItemBySlot:function(name,id,count,data){
        for(let i in name){
            if(name[i].id == 0 || name[i].id == id && name[i].data == data && name[i].count < Item.getMaxStack(name[i].id)){
                name[i].id = id;
                name[i].data = data;
                var minCount = Item.getMaxStack(name[i].id) - name[i].count;
                if(minCount < count){
                    name[i].count += Math.min(minCount,count);
                    this.addItemBySlot(name,id,count - minCount,data);
                    return;
                } else {
                    name[i].count += count;
                    return;
                }
            }
        }
        
        World.drop(this.x + 0.5,this.y + 1.5,this.z + 0.5,id,count,data);
    },

    setRecipeOutputBySlot:function(recipe,input,output){
        for(let i in recipe.output){
            this.addItemBySlot(output,recipe.output[i].id,recipe.output[i].count,recipe.output[i].data);
        }

        for(let i in recipe.input){
            var count = 0;
            while(count < recipe.input[i].count){
                for(let i2 in input){
                    if(input[i2].id == recipe.input[i].id && (recipe.input[i].data == -1 || input[i2].data == recipe.input[i].data)){
                        input[i2].count -= Math.min(recipe.input[i].count - count,input[i2].count);
                        count += Math.min(recipe.input[i].count - count,input[i2].count);
                    }
                }
            }
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
    }
}

EXPORT("Chunk",Chunk);
EXPORT("ItemName",ItemName);
EXPORT("MachineRecipe",MachineRecipe);
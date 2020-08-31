// [低压变压器]LV-Transformer
var block_transformator_LV = IDRegistry.genBlockID(fz("transformerLV"));
Block.createBlock(fz("transformerLV"),[
	{name:"LV-Transformer",texture:[["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0]],inCreative:false},
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0]],inCreative:true },
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0]],inCreative:false},
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]],inCreative:false},
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0]],inCreative:false},
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_transformator_LV,"wood");
Machine.registerTransformer(fz("transformerLV"),1);

Block.registerDropFunction(block_transformator_LV,function(coords,id){
    return [[id,1,1]];
});

// [中压变压器]MV-Transformer
var block_transformator_MV = IDRegistry.genBlockID(fz("transformerMV"));
Block.createBlock(fz("transformerMV"),[
	{name:"MV-Transformer",texture:[["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0]],inCreative:false},
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0]],inCreative:true },
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0]],inCreative:false},
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]],inCreative:false},
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0]],inCreative:false},
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_transformator_MV,"stone",1,true);
Machine.registerTransformer(fz("transformerMV"),2);

Block.registerDropFunction(block_transformator_MV,function(coords,id,data,level){
    return level >= 1?[[id,1,1]]:[];
},1);

// [高压变压器]HV-Transformer
var block_transformator_HV = IDRegistry.genBlockID(fz("transformerHV"));
Block.createBlock(fz("transformerHV"),[
	{name:"HV-Transformer",texture:[["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0]],inCreative:false},
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0]],inCreative:true },
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0]],inCreative:false},
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]],inCreative:false},
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0]],inCreative:false},
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0]],inCreative:false}
]);
ToolAPI.registerBlockMaterial(block_transformator_HV,"stone",1,true);
Machine.registerTransformer(fz("transformerHV"),3);

Block.registerDropFunction(block_transformator_HV,function(coords,id,data,level){
    return level >= 1?[[id,1,1]]:[];
},1);

Item.addCreativeGroup("transformer",Translation.translate("Transformer"),[
	block_transformator_LV,
	block_transformator_MV,
	block_transformator_HV
]);
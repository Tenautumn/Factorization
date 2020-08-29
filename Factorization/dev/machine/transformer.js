function CreateTransformerBlock(uid,name,texture,tier){
	IDRegistry.genBlockID(fz(uid));
	Block.createBlock(fz(uid),[
		{name:name,texture:[texture[0],texture[1],texture[1],texture[1],texture[1],texture[1]],inCreative:true },
		{name:name,texture:[texture[1],texture[0],texture[1],texture[1],texture[1],texture[1]],inCreative:false},
		{name:name,texture:[texture[1],texture[1],texture[0],texture[1],texture[1],texture[1]],inCreative:false},
		{name:name,texture:[texture[1],texture[1],texture[1],texture[0],texture[1],texture[1]],inCreative:false},
		{name:name,texture:[texture[1],texture[1],texture[1],texture[1],texture[0],texture[1]],inCreative:false},
		{name:name,texture:[texture[1],texture[1],texture[1],texture[1],texture[1],texture[0]],inCreative:false}
	]);
}

// [低压变压器]LV-Transformer
CreateTransformerBlock("transformerLV","LV-Transformer",[["lv_transformer_front",0],["lv_transformer_side",0]]);
ToolAPI.registerBlockMaterial(BlockID[fz("transformerLV")],"wood");

Block.registerDropFunction(fz("transformerLV"),function(coords,id,data,level){
    return [[id,1,0]];
});

Machine.registerTransformer(fz("transformerLV"),1);

// [中压变压器]MV-Transformer
CreateTransformerBlock("transformerMV","MV-Transformer",[["mv_transformer_front",0],["mv_transformer_side",0]]);
ToolAPI.registerBlockMaterial(BlockID[fz("transformerMV")],"stone",1,true);

Block.registerDropFunction(fz("transformerMV"),function(coords,id,data,level){
    return level >= 1?[[id,1,0]]:[];
},1);

Machine.registerTransformer(fz("transformerMV"),2);

// [高压变压器]HV-Transformer
CreateTransformerBlock("transformerHV","HV-Transformer",[["hv_transformer_front",0],["hv_transformer_side",0]]);
ToolAPI.registerBlockMaterial(BlockID[fz("transformerHV")],"stone",1,true);

Block.registerDropFunction(fz("transformerHV"),function(coords,id,data,level){
    return level >= 1?[[id,1,0]]:[];
},1);

Machine.registerTransformer(fz("transformerHV"),3);

Item.addCreativeGroup("transformer",Translation.translate("Transformer"),[
    BlockID[fz("transformerLV")],
    BlockID[fz("transformerMV")],
    BlockID[fz("transformerHV")]
]);
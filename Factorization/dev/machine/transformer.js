// [低压变压器]LV-Transformer
var block_transformator_LV = IDRegistry.genBlockID("transformerLV");
Block.createBlock("transformerLV",[
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(block_transformator_LV,[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]]);
TileRenderer.registerFullRotationModel(block_transformator_LV,0,[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]]);

ToolAPI.registerBlockMaterial(block_transformator_LV,"wood");
Block.setDestroyLevel(block_transformator_LV,1);

Machine.registerTransformer(block_transformator_LV,1);

// [中压变压器]MV-Transformer
var block_transformator_MV = IDRegistry.genBlockID("transformerMV");
Block.createBlock("transformerMV",[
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(block_transformator_MV,[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]]);
TileRenderer.registerFullRotationModel(block_transformator_MV,0,[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]]);

ToolAPI.registerBlockMaterial(block_transformator_MV,"stone",1,true);
Block.setDestroyLevel(block_transformator_MV,1);

Machine.registerTransformer(block_transformator_MV,2);

// [高压变压器]HV-Transformer
var block_transformator_HV = IDRegistry.genBlockID("transformerHV");
Block.createBlock("transformerHV",[
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(block_transformator_HV,[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]]);
TileRenderer.registerFullRotationModel(block_transformator_HV,0,[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]]);

ToolAPI.registerBlockMaterial(block_transformator_HV,"stone",1,true);
Block.setDestroyLevel(block_transformator_HV,1);

Machine.registerTransformer(block_transformator_HV,3);
// [低压变压器]LV-Transformer
IDRegistry.genBlockID("transformerLV");
Block.createBlock("transformerLV",[
	{name:"LV-Transformer",texture:[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(BlockID.transformerLV,[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]]);
TileRenderer.registerFullRotationModel(BlockID.transformerLV,0,[["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_side",0],["lv_transformer_front",0],["lv_transformer_side",0],["lv_transformer_side",0]]);

ToolAPI.registerBlockMaterial(BlockID.transformerLV,"wood");
Machine.registerTransformer(BlockID.transformerLV,1);

// [中压变压器]MV-Transformer
IDRegistry.genBlockID("transformerMV");
Block.createBlock("transformerMV",[
	{name:"MV-Transformer",texture:[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(BlockID.transformerMV,[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]]);
TileRenderer.registerFullRotationModel(BlockID.transformerMV,0,[["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_side",0],["mv_transformer_front",0],["mv_transformer_side",0],["mv_transformer_side",0]]);

ToolAPI.registerBlockMaterial(BlockID.transformerMV,"stone",1,true);
Block.setDestroyLevel("transformerMV",1);
Machine.registerTransformer(BlockID.transformerMV,2);

// [高压变压器]HV-Transformer
IDRegistry.genBlockID("transformerHV");
Block.createBlock("transformerHV",[
	{name:"HV-Transformer",texture:[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]],inCreative:true}
]);
TileRenderer.setStandartModel(BlockID.transformerHV,[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]]);
TileRenderer.registerFullRotationModel(BlockID.transformerHV,0,[["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_side",0],["hv_transformer_front",0],["hv_transformer_side",0],["hv_transformer_side",0]]);

ToolAPI.registerBlockMaterial(BlockID.transformerHV,"stone",1,true);
Block.setDestroyLevel("transformerHV",1);
Machine.registerTransformer(BlockID.transformerHV,3);
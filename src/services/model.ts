import * as tf from '@tensorflow/tfjs';

let model: tf.LayersModel;

export async function loadModel() {
  if (!model) {
    model = await tf.loadLayersModel('/tfjs_model/model.json');
    console.log(model.summary());
  }
  return model;
}

export async function predict(input: tf.Tensor) {
  const loadedModel = await loadModel();
  return loadedModel.predict(input) as tf.Tensor;
}
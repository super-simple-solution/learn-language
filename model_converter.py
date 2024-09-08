from transformers import Wav2Vec2Processor, TFWav2Vec2Model
import tensorflow as tf

# Load the Wav2Vec2 model and processor
model = TFWav2Vec2Model.from_pretrained("facebook/wav2vec2-base-960h")
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")

# Get a dummy input
dummy_input = tf.constant(processor("dummy input for shape", return_tensors="tf").input_values.numpy())

# Export the model to a SavedModel
tf.saved_model.save(model, "wav2vec2_saved_model", signatures={"serving_default": model.call.get_concrete_function(dummy_input)})

# Convert the SavedModel to TFLite
converter = tf.lite.TFLiteConverter.from_saved_model("wav2vec2_saved_model")
tflite_model = converter.convert()

# Save the TFLite model
with open("wav2vec2_model.tflite", "wb") as f:
    f.write(tflite_model)

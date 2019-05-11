import { Schema, model, Types } from 'mongoose';

const writerSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    }
});

export default model('Writer', writerSchema);
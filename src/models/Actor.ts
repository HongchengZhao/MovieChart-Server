import { Schema, model, Types } from 'mongoose';

const actorSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    }
});

export default model('Actor', actorSchema);
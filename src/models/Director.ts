import { Schema, model, Types } from 'mongoose';

const directorSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    }
});

export default model('Director', directorSchema);
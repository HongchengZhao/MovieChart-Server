import { Schema, model } from 'mongoose';

const languageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default model('Language', languageSchema);
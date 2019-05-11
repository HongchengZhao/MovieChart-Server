import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default model('Genre', genreSchema);
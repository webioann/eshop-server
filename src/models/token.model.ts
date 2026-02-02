import { Schema, model, Types } from 'mongoose'

interface ITokenType {
    token: string;
    userId: Types.ObjectId
}

const tokenSchema = new Schema<ITokenType>({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    }
})

const Token = model<ITokenType>('Token', tokenSchema);

export default Token;
import mongoose from "mongoose";

const goal_schema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text:{
        type: String,
        required: [true, 'Add text value']
    }
},
{
    timestamps: true,
}
)

const Goal = mongoose.model("Goal",goal_schema)
export default Goal;
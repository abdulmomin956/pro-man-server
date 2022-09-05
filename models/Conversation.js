const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
        },
        nameId: {
            type: Array,
        },
        members: {
            type: Array,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
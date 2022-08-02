const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ztan.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {


    const addWorkspace = () => {
        try {
            await client.connect()
            const workspaceCollection = client.db("pro-man").collection("workspace");

        } catch {

        }
    }
    const getWorkspaces = () => {
        try {
            await client.connect()
            const workspaceCollection = client.db("pro-man").collection("workspace");

        } catch {

        }
    }
    const getWorkspace = () => {
        try {
            await client.connect()
            const workspaceCollection = client.db("pro-man").collection("workspace");

        } catch {

        }
    }
    const updateWorkspace = () => {
        try {
            await client.connect()
            const workspaceCollection = client.db("pro-man").collection("workspace");

        } catch {

        }
    }
    const deleteWorkspace = () => {
        try {
            await client.connect()
            const workspaceCollection = client.db("pro-man").collection("workspace");

        } catch {

        }
    }

    module.exports = { addWorkspace, getWorkspaces, getWorkspace, updateWorkspace, deleteWorkspace }

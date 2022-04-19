const { response } = require('../app')
const Item = require('../models/item')

const createItem = async (req, res) => {
    try {
        const item = await new Item(request.body)
        await item.save()
        return res.status(201).json({
            item,
        })
    } catch (error) {
        return response.status(500).json({ error: error.message})
    }
}

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({items})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}




module.export = {
    createItem,
    getAllItems
}
'use strict'
class Collection {
    constructor(model) {
        this.model = model
    }
    async create(obj) {
        try {
            return await this.model.create(obj)
        } catch (error) {
            console.log(`error.message${error.message}`);
        }
    }
    get(id) {
        if (id) {
            return this.model.findOne({ where: { id } })
        } else {
            this.model.findAll()
        }
    }

    update(id, obj) {
        try {
            let updatedItem = this.model.findOne({ where: { id } })
            return updatedItem.update(obj)
        } catch (error) {
            console.log(`${error.message}`);
        }
    }
    delete(id) {
        try {
            return this.model.destroy({ where: { id } })
        } catch (error) {
            console.log(`${error.message}`);
        }
    }

}

module.exports = Collection
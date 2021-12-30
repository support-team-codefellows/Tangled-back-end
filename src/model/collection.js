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
          return  this.model.findAll()
        }
    }

    async update(id, obj) {
        try {
            let recordId =  await this.model.findOne({where:{id:id}})
            let updateRecord =   await recordId.update(obj);
            return updateRecord;
        } catch(e) {
            console.error('error in updating record for model',this.model.name, `id:${id}`)
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
import mongoose from 'mongoose';

class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const document = new this.model(data);
        return await document.save();
    }

    async findAll() {
        return await this.model.find();
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async updateById(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async incrementField(id, field) {
        const document = await this.model.findById(id);
        if (!document) {
            throw new Error(`${this.model.modelName} not found`);
        }
        document[field] += 1;
        return await document.save();
    }
}

export default BaseService;

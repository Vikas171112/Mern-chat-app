export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },
    update: async function (id, data) {
      const updatedDoc = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedDoc;
    },
    delete: async function (id) {
      const deletedDocument = await model.findByIdAndDelete(id);
      return deletedDocument;
    },
    getAll: async function () {
      const allDocs = await find();
      return allDocs;
    },
    getById: async function (id) {
      const doc = await findById(id);
      return doc;
    },
  };
}

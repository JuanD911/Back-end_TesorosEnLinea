const Audit = require('../model/audit.model'); // Importa el modelo de auditoría

function auditPlugin(schema, options) {
    // Middleware para creación
    schema.post('save', async function(doc) {
        const audit = new Audit({
            operation: 'create',
            documentId: doc._id,
            after: doc,
            user: 'system' // Aquí puedes obtener el usuario real si está disponible
        });
        await audit.save();
    });

    // Middleware para actualización
    schema.post(/^findOneAnd/, async function(result) {
        const operation = result.op;
        let before;
        if (operation === 'update') {
            before = await this.model.findOne(result.query);
        }
        const after = await this.model.findOne(result.getQuery());
        
        const audit = new Audit({
            operation,
            documentId: after._id,
            before,
            after,
            user: 'system' // Aquí puedes obtener el usuario real si está disponible
        });
        await audit.save();
    });

    // Middleware para eliminación
    schema.post(/^findOneAndDelete/, async function(result) {
        const operation = 'delete';
        const before = await this.model.findOne(result.query);
        const after = null;
        const audit = new Audit({
            operation,
            documentId: before._id,
            before,
            after,
            user: 'system' // Aquí puedes obtener el usuario real si está disponible
        });
        await audit.save();
    });
}

module.exports = auditPlugin;
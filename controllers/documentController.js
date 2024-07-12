// controllers/documentController.js
const {createDocumentService} = require('../services/documentService');

// const getAllDocuments = async (req, res) => {
//     const documents = await documentService.getAllDocuments();
//     res.json(documents);
// };

// const getDocumentById = async (req, res) => {
//     const document = await documentService.getDocumentById(req.params.id);
//     if (document) {
//         res.json(document);
//     } else {
//         res.status(404).json({ message: 'Document not found' });
//     }
// };

const addDocumentController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newDocument = await createDocumentService({ title, content });
        return res.status(201).json({
            message: "Document added successfully",
            document: newDocument
        });
    } catch (error) {
        if (error.code === "DOCUMENT_CREATION_FAILED") {
            return res.status(500).json({
                status: "error",
                statusCode: 500,
                error: {
                    code: "DOCUMENT_CREATION_FAIRSLED",
                    message: "Failed to create document"
                }
            });
        }
    }
};


// const updateDocument = async (req, res) => {
//     const document = await documentService.updateDocument(req.params.id, req.body);
//     if (document) {
//         res.json(document);
//     } else {
//         res.status(404).json({ message: 'Document not found' });
//     }
// };

// const deleteDocument = async (req, res) => {
//     const result = await documentService.deleteDocument(req.params.id);
//     if (result) {
//         res.status(204).end();
//     } else {
//         res.status(404).json({ message: 'Document not found' });
//     }
// };

module.exports = addDocumentController


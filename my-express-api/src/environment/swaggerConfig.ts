import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Todo List API',
            version: '1.0.0',
            description: 'A simple TS Express API',
        },
    },
    apis: ['./src/routes/*.ts'], // path to your API routes
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
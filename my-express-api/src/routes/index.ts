import {Router, Request, Response} from 'express';
import {apiVersion, apiName, authorName} from '../environment/version';


const index_router = Router();


/**
 * @openapi
 * /:
 *   get:
 *     summary: Retrieve API information
 *     description: Returns basic information about the API, including version, name, and author.
 *     responses:
 *       200:
 *         description: A JSON object containing the API's version, name, and author.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 name:
 *                   type: string
 *                   example: My API
 *                 author:
 *                   type: string
 *                   example: John Doe
 *       500:
 *         description: An error occurred while processing the request.
 */
index_router.get('/', async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            version: apiVersion,
            name: apiName,
            author: authorName
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
});


export default index_router;
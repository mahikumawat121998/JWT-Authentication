/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         -isAdmin
 *       properties:
 *         id:
 *           type: string
 *           example: "64a8fcb3f27d3e001c57e7a2"
 *         username:
 *           type: string
 *           example: "john_doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "securePassword123"
 *          isAdmin
 *          type: boolean * 
 *          example: true * 
 * 
 */

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (Validation error)
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: login a user
 *     description: login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (Validation error)
 *       500:
 *         description: Internal server error
 */
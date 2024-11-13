const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth_controller");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validationMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: Pass@1234
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post("/register", validateRegister, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: Pass@1234
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateLogin, loginUser);

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Access protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized access
 *       401:
 *         description: Unauthorized
 */
router.get("/protected", authenticateToken, (req, res) => {
  res.send(`Welcome ${req.user.name}, this is a protected route.`);
});

module.exports = router;

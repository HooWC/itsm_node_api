const sql = require('mssql');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

module.exports = {
    getByIdNoToken,
    forgotPassword
};

// Get user by emp_id and username without token
async function getByIdNoToken({ emp_id, username }) {    
    try {
        // Get user from database
        const conn = await db.getConnection();
        if (!conn) {
            throw 'Database connection failed';
        }
        
        const result = await conn.request()
            .input('emp_id', emp_id)
            .input('username', username)
            .execute("api_itsm_user_get_by_id_no_token");
        
        // Validate user exists
        if (result.recordset.length === 0) {
            throw 'User not found';
        }
        
        return result.recordset[0];
    } catch (error) {
        console.error("Get user error:", error);
        throw error;
    }
}

// Forgot password function, update password
async function forgotPassword({ emp_id, username, password }) {
    try {
        // Get connection
        const conn = await db.getConnection();
        if (!conn) {
            throw 'Database connection failed';
        }
        
        // Check user exists
        const checkResult = await conn.request()
            .input('emp_id', emp_id)
            .input('username', username)
            .execute("api_itsm_user_get_by_id_no_token");
        
        if (checkResult.recordset.length === 0) {
            throw 'User not found';
        }
        
        const userId = checkResult.recordset[0].id;
        
        // Hash new password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Update password
        await conn.request()
            .input('id', userId)
            .input('password', passwordHash)
            .execute("api_itsm_user_forgot_password");
        
        return { message: 'Password has been reset successfully' };
    } catch (error) {
        console.error("Reset password error:", error);
        throw error;
    }
} 
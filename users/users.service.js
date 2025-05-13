const jwt = require('jsonwebtoken');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

const { secret } = require('../config.json');
const db = require('../_helpers/db');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// done
async function authenticate({ emp_id, username, password }) {    
    try {
        // Get user from database
        const conn = await db.getConnection();
        if (!conn) {
            throw 'Database connection failed';
        }
        
        const result = await conn.request()
            .input('emp_id', emp_id)
            .input('username', username)
            .query('SELECT Id, emp_id, Username, Password FROM Users WHERE username = @username');
        
        // Validate username and password
        if (result.recordset.length === 0) {
            //throw 'Username or password is incorrect';
        }
        
        const user = result.recordset[0];
        
        // Check password
        if (!await bcrypt.compare(password, user.Password)) {
            //throw 'Username or password is incorrect';
        }
        
        // Authentication successful - generate JWT token
        const token = jwt.sign({ sub: user.Id }, secret);
        
        // Return user info and token
        return {
            user: {
                id: user.Id,
                emp_id: user.emp_id,
                username: user.Username
            },
            token
        };
    } catch (error) {
        //console.error("Authentication error:", error);
        //throw error;
    }
}

// done
async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_user_get_all");
   
    var user = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        /* if(res.recordset[i].department_id == 1) 
            var department = 'IT';
         else if(res.recordset[i].department_id == 2) 
            var department = 'HR';
         else if(res.recordset[i].department_id == 3) 
            var department = 'Finance';
         else if(res.recordset[i].department_id == 4) 
            var department = 'Logistics';
         else if(res.recordset[i].department_id == 5) 
            var department = 'Support';
         else
            var department = 'Other';

        if(res.recordset[i].role_id == 1) 
            var role = 'Admin';
         else if(res.recordset[i].role_id == 2) 
            var role = 'ITIL';
         else
            var role = 'User';

        if(res.recordset[i].active == 1) 
            var activeInfo = "Active";
         else
            var activeInfo = "Blocked"; */
        
        var id = res.recordset[i].id;
        var emp_id = res.recordset[i].emp_id;
        var prefix = res.recordset[i].prefix;
        var photo = res.recordset[i].photo;
        var fullname = res.recordset[i].fullname;
        var email = res.recordset[i].email;
        var gender = res.recordset[i].gender;            
        var department_id = res.recordset[i].department_id;            
        var title = res.recordset[i].title;            
        var business_phone = res.recordset[i].business_phone;            
        var mobile_phone = res.recordset[i].mobile_phone;            
        var role_id = res.recordset[i].role_id;            
        var username = res.recordset[i].username;            
        var race = res.recordset[i].race;            
        var create_date = res.recordset[i].create_date;            
        var update_date = res.recordset[i].update_date;            
        var active = res.recordset[i].active;            
        var photo_type = res.recordset[i].photo_type;            

        user.push({
            'id': id, 
            'emp_id': emp_id, 
            'prefix': prefix, 
            'photo': photo, 
            'fullname': fullname,
            'email': email, 
            'gender': gender,
            'department_id': department_id,
            'title': title,
            'business_phone': business_phone,
            'mobile_phone': mobile_phone,
            'role_id': role_id,
            'username': username,
            'race': race,
            'create_date': create_date,
            'update_date': update_date,
            'active': active,
            "photo_type": photo_type
        });
    }
    
    return user;
}

// done
async function getById(id) {    
    return await getUser(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();

    const resChecking = await conn.request()
        .input('input_parameter', params.username)
        .query('SELECT id, username, password FROM Users WHERE username = @input_parameter');

    if (resChecking.recordset.length >= 1) {
        throw 'Username "' + params.username + '" is already taken';
    }

    if (!params.password) {
        throw 'No password is provided';
    }
    const passwordHash = await bcrypt.hash(params.password, 10);

    let prefix = '';
    if (params.gender) {
        const gender = params.gender.toLowerCase();
        if (gender === 'male') {
            prefix = 'Mr.';
        } else if (gender === 'female') {
            prefix = 'Ms.';
        }
    }

    let photo = null;
    if (params.photo && typeof params.photo === 'string') {
        photo = Buffer.from(params.photo, 'base64');
    } else if (Buffer.isBuffer(params.photo)) {
        photo = params.photo;
    } else {
        photo = null;
    }

    const res = await conn.request()
        .input("emp_id", params.emp_id)
        .input("prefix", prefix || null)
        .input("photo", sql.VarBinary(sql.MAX), photo)
        .input("fullname", params.fullname)
        .input("email", params.email)
        .input("gender", params.gender)
        .input("department_id", params.department_id)
        .input("title", params.title)
        .input("business_phone", params.business_phone !== undefined ? params.business_phone : null)
        .input("mobile_phone", params.mobile_phone)
        .input("role_id", params.role_id)
        .input("username", params.username)
        .input("password", passwordHash)
        .input("race", params.race)
        .input("photo_type", params.photo_type)
        .execute("api_itsm_user_register");

    // 获取新注册用户的ID
    const userId = res.recordset[0].id;
    
    // 生成JWT token，与authenticate函数保持一致
    const token = jwt.sign({ sub: userId }, secret);
    
    // 返回用户信息和token，格式与authenticate函数相同
    return {
        user: {
            id: userId,
            emp_id: params.emp_id,
            username: params.username
        },
        token
    };
}

// done
async function update(id, params) {
    const user = await getUser(id);

    const usernameChanged = params.username && user.username !== params.username;

    const conn = await db.getConnection();
    const resChecking = await conn.request().input('input_parameter', params.username)
        .query('SELECT id, username, password FROM Users WHERE username = @input_parameter');

    if (usernameChanged && resChecking.recordset.length >= 1)
        throw 'Username "' + params.username + '" is already taken';

    var passwordHash = '';
    if (params.password) {
        passwordHash = await bcrypt.hash(params.password, 10);
    }

    let prefix = '';
    if (params.gender) {
        const gender = params.gender.toLowerCase();
        if (gender === 'male') {
            prefix = 'Mr.';
        } else if (gender === 'female') {
            prefix = 'Ms.';
        }
    }

    let photo = null;
    if (params.photo && typeof params.photo === 'string') {
        photo = Buffer.from(params.photo, 'base64');
    } else if (Buffer.isBuffer(params.photo)) {
        photo = params.photo;
    } else {
        photo = null;
    }

    const res = await conn.request()
        .input("id", id)
        .input("emp_id", params.emp_id)
        .input("prefix", prefix || null)
        .input("photo", sql.VarBinary(sql.MAX), photo)
        .input("fullname", params.fullname)
        .input("email", params.email)
        .input("gender", params.gender)
        .input("department_id", params.department_id)
        .input("title", params.title)
        .input("business_phone", params.business_phone !== undefined ? params.business_phone : null)
        .input("mobile_phone", params.mobile_phone)
        .input("role_id", params.role_id)
        .input("username", params.username)
        .input("password", passwordHash)
        .input("race", params.race)
        .input("photo_type", params.photo_type)
        .execute("api_itsm_user_update");

    // Get only the first result set returned
    return res.recordset[0];
}

// done
async function _delete(id) {
    await getUser(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_user_delete_by_id");

    return res;
}

// done
async function getUser(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_user_get_by_id");

    if (res.recordset.length == 0) throw 'User not found';    

    var user = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        /* if(res.recordset[i].department_id == 1) 
            var department = 'IT';
         else if(res.recordset[i].department_id == 2) 
            var department = 'HR';
         else if(res.recordset[i].department_id == 3) 
            var department = 'Finance';
         else if(res.recordset[i].department_id == 4) 
            var department = 'Logistics';
         else if(res.recordset[i].department_id == 5) 
            var department = 'Support';
         else
            var department = 'Other';

        if(res.recordset[i].role_id == 1) 
            var role = 'Admin';
         else if(res.recordset[i].role_id == 2) 
            var role = 'ITIL';
         else
            var role = 'User';

        if(res.recordset[i].active == 1) 
            var activeInfo = "Active";
         else
            var activeInfo = "Blocked"; */
        
        var id = res.recordset[i].id;
        var emp_id = res.recordset[i].emp_id;
        var prefix = res.recordset[i].prefix;
        var photo = res.recordset[i].photo;
        var fullname = res.recordset[i].fullname;
        var email = res.recordset[i].email;
        var gender = res.recordset[i].gender;            
        var department_id = res.recordset[i].department_id;            
        var title = res.recordset[i].title;            
        var business_phone = res.recordset[i].business_phone;            
        var mobile_phone = res.recordset[i].mobile_phone;            
        var role_id = res.recordset[i].role_id;            
        var username = res.recordset[i].username;            
        var race = res.recordset[i].race;            
        var create_date = res.recordset[i].create_date;            
        var update_date = res.recordset[i].update_date;            
        var active = res.recordset[i].active;           
        var photo_type = res.recordset[i].photo_type;            

        user.push({
            'id': id, 
            'emp_id': emp_id, 
            'prefix': prefix, 
            'photo': photo, 
            'fullname': fullname,
            'email': email, 
            'gender': gender,
            'department_id': department_id,
            'title': title,
            'business_phone': business_phone,
            'mobile_phone': mobile_phone,
            'role_id': role_id,
            'username': username,
            'race': race,
            'create_date': create_date,
            'update_date': update_date,
            'active': active,
            "photo_type": photo_type
        });
    }
    
    return user;    
}

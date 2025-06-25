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
async function authenticate({ emp_id, password }) {    
    try {
        // Get user from database
        const conn = await db.getConnection();
        if (!conn) {
            throw 'Database connection failed';
        }
        
        const result = await conn.request()
            .input('emp_id', emp_id)
            .query('SELECT Id, emp_id, Password FROM Users WHERE emp_id = @emp_id');
        
        // Validate employee id and password
        if (result.recordset.length === 0) {
            throw 'Employee ID or password is incorrect';
        }
        
        const user = result.recordset[0];
        
        // Check password
        if (!await bcrypt.compare(password, user.Password)) {
            throw 'Password is incorrect';
        }
        
        // Authentication successful - generate JWT token
        const token = jwt.sign({ sub: user.Id }, secret);
        
        // Return user info and token
        return {
            user: {
                id: user.Id,
                emp_id: user.emp_id,
            },
            token
        };
    } catch (error) {
        //console.error("Authentication error:", error);
        throw error;
    }
}

// done
async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_user_get_all");
   
    var user = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        const record = res.recordset[i];

        let photoBase64 = null;
        if (record.photo && Buffer.isBuffer(record.photo)) {
            photoBase64 = record.photo.toString("base64");
        }
        
        var id = res.recordset[i].id;
        var emp_id = res.recordset[i].emp_id;
        var prefix = res.recordset[i].prefix;
        var fullname = res.recordset[i].fullname;
        var email = res.recordset[i].email;
        var gender = res.recordset[i].gender;            
        var department_id = res.recordset[i].department_id;            
        var title = res.recordset[i].title;            
        var business_phone = res.recordset[i].business_phone;            
        var mobile_phone = res.recordset[i].mobile_phone;            
        var role_id = res.recordset[i].role_id;               
        var race = res.recordset[i].race;            
        var create_date = res.recordset[i].create_date;            
        var update_date = res.recordset[i].update_date;            
        var active = res.recordset[i].active;            
        var photo_type = res.recordset[i].photo_type;      
        var r_manager = res.recordset[i].r_manager;           

        user.push({
            'id': id, 
            'emp_id': emp_id, 
            'prefix': prefix, 
            'photo': photoBase64, 
            'fullname': fullname,
            'email': email, 
            'gender': gender,
            'department_id': department_id,
            'title': title,
            'business_phone': business_phone,
            'mobile_phone': mobile_phone,
            'role_id': role_id,
            'race': race,
            'create_date': create_date,
            'update_date': update_date,
            'active': active,
            "photo_type": photo_type,
            "r_manager": r_manager
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
        } else {
            prefix = '-';
        }
    }

    const request = conn.request()
        .input("emp_id", params.emp_id)
        .input("prefix", prefix || null)
        .input("fullname", params.fullname)
        .input("email", params.email)
        .input("gender", params.gender)
        .input("department_id", params.department_id)
        .input("title", params.title)
        .input("business_phone", params.business_phone !== undefined ? params.business_phone : null)
        .input("mobile_phone", params.mobile_phone)
        .input("role_id", params.role_id)
        .input("password", passwordHash)
        .input("race", params.race)
        .input("photo_type", params.photo_type)
        .input("r_manager", params.r_manager)

    if (params.photo && typeof params.photo === 'string') {
        const base64Data = params.photo.startsWith('data:image/') 
            ? params.photo.split(',')[1] 
            : params.photo;
        
        const photoBuffer = Buffer.from(base64Data, 'base64');
        request.input("photo", sql.VarBinary(sql.MAX), photoBuffer);
    } else {
        request.input("photo", sql.VarBinary, null);
    }

    const res = await request.execute("api_itsm_user_register");

    const userId = res.recordset[0].id;
    
    const token = jwt.sign({ sub: userId }, secret);
    
    return {
        user: {
            id: userId,
            emp_id: params.emp_id
        },
        token
    };
}

// done
async function update(id, params) {
    const user = await getUser(id);
    const conn = await db.getConnection();

    let prefix = '';
    if (params.gender) {
        const gender = params.gender.toLowerCase();
        if (gender === 'male') {
            prefix = 'Mr.';
        } else if (gender === 'female') {
            prefix = 'Ms.';
        }
    }

    const request = conn.request()
        .input("id", id)
        .input("emp_id", params.emp_id)
        .input("prefix", prefix || null)
        .input("fullname", params.fullname)
        .input("email", params.email)
        .input("gender", params.gender)
        .input("department_id", params.department_id)
        .input("title", params.title)
        .input("business_phone", params.business_phone !== undefined ? params.business_phone : null)
        .input("mobile_phone", params.mobile_phone)
        .input("role_id", params.role_id)
        .input("photo_type", params.photo_type)
        .input("active", params.active)
        .input("race", params.race)
        .input("r_manager", params.r_manager);

    if (params.password && params.password.trim() !== '') {
        const passwordHash = await bcrypt.hash(params.password, 10);
        request.input("password", passwordHash);
    } 

    if (params.photo && typeof params.photo === 'string') {
        
        const base64Data = params.photo.startsWith('data:image/') 
            ? params.photo.split(',')[1] 
            : params.photo;
        
        const photoBuffer = Buffer.from(base64Data, 'base64');
        request.input("photo", sql.VarBinary(sql.MAX), photoBuffer);
    } else {
        request.input("photo", sql.VarBinary, null);
    }

    const res = await request.execute("api_itsm_user_update");

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
        const record = res.recordset[i];

        let photoBase64 = null;
        if (record.photo && Buffer.isBuffer(record.photo)) {
            photoBase64 = record.photo.toString("base64");
        }
        
        var id = res.recordset[i].id;
        var emp_id = res.recordset[i].emp_id;
        var prefix = res.recordset[i].prefix;
        var fullname = res.recordset[i].fullname;
        var email = res.recordset[i].email;
        var gender = res.recordset[i].gender;            
        var department_id = res.recordset[i].department_id;            
        var title = res.recordset[i].title;            
        var business_phone = res.recordset[i].business_phone;            
        var mobile_phone = res.recordset[i].mobile_phone;            
        var role_id = res.recordset[i].role_id;              
        var race = res.recordset[i].race;            
        var create_date = res.recordset[i].create_date;            
        var update_date = res.recordset[i].update_date;            
        var active = res.recordset[i].active;           
        var photo_type = res.recordset[i].photo_type; 
        var r_manager = res.recordset[i].r_manager;           

        user.push({
            'id': id, 
            'emp_id': emp_id, 
            'prefix': prefix, 
            'photo': photoBase64, 
            'fullname': fullname,
            'email': email, 
            'gender': gender,
            'department_id': department_id,
            'title': title,
            'business_phone': business_phone,
            'mobile_phone': mobile_phone,
            'role_id': role_id,
            'race': race,
            'create_date': create_date,
            'update_date': update_date,
            'active': active,
            "photo_type": photo_type,
            "r_manager": r_manager
        });
    }
    
    return user;    
}

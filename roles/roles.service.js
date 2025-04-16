const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// done
async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_role_get_all");
   
    var roles = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var role = res.recordset[i].role;        

        roles.push({
            'id': id, 
            'role': role
        });
    }
    
    return roles;
}

// done
async function getById(id) {    
    return await getRole(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("role", params.role)
        .execute("api_itsm_role_create");

    return res;
}

// done
async function update(id, params) {
    await getRole(id);

    const res = await conn.request()
        .input("id", id)
        .input("role", params.role)
        .execute("api_itsm_role_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getRole(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_role_delete_by_id");

    return res;
}

// done
async function getRole(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_role_get_by_id");

    if (res.recordset.length == 0) throw 'Role not found';    

    var role = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var role = res.recordset[i].role; 

        role.push({
            'id': id, 
            'role': role
        });
    }
    
    return role;    
}

const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_req_function_get_all");
   
    var functions = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;
        var req_subcategory_id = res.recordset[i].req_subcategory_id;

        functions.push({
            'id': id, 
            'name': name,
            'req_subcategory_id': req_subcategory_id
        });
    }
    
    return functions;
}

async function getById(id) {    
    return await getFunction(id);
}

async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("name", params.name)
        .input("req_subcategory_id", params.req_subcategory_id)
        .execute("api_itsm_req_function_create");
    return res;
}

async function update(id, params) {
    await getFunction(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("name", params.name)
        .input("req_subcategory_id", params.req_subcategory_id)
        .execute("api_itsm_req_function_update");
    return res;
}

async function _delete(id) {
    await getFunction(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_function_delete_by_id");
    return res;
}

async function getFunction(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_function_get_by_id");

    if (res.recordset.length == 0) throw 'Function not found';    

    var functions = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;
        var req_subcategory_id = res.recordset[i].req_subcategory_id;

        functions.push({
            'id': id, 
            'name': name,
            'req_subcategory_id': req_subcategory_id
        });
    }
    
    return functions;
}
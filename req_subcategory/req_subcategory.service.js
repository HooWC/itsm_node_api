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
    const res = await conn.request().execute("api_itsm_req_subcategory_get_all");
   
    var subcategories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;
        var req_category_id = res.recordset[i].req_category_id;

        subcategories.push({
            'id': id, 
            'name': name,
            'req_category_id': req_category_id
        });
    }
    
    return subcategories;
}

async function getById(id) {    
    return await getSubcategory(id);
}

async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("name", params.name)
        .input("req_category_id", params.req_category_id)
        .execute("api_itsm_req_subcategory_create");
    return res;
}

async function update(id, params) {
    await getSubcategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("name", params.name)
        .input("req_category_id", params.req_category_id)
        .execute("api_itsm_req_subcategory_update");
    return res;
}

async function _delete(id) {
    await getSubcategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_subcategory_delete_by_id");
    return res;
}

async function getSubcategory(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_subcategory_get_by_id");

    if (res.recordset.length == 0) throw 'Subcategory not found';    

    var subcategories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;
        var req_category_id = res.recordset[i].req_category_id;

        subcategories.push({
            'id': id, 
            'name': name,
            'req_category_id': req_category_id
        });
    }
    
    return subcategories;
} 
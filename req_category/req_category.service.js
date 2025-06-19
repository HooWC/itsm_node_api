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
    const res = await conn.request().execute("api_itsm_req_category_get_all");
   
    var categories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;

        categories.push({
            'id': id, 
            'name': name
        });
    }
    
    return categories;
}

async function getById(id) {    
    return await getCategory(id);
}

async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("name", params.name)
        .execute("api_itsm_req_category_create");
    return res;
}

async function update(id, params) {
    await getCategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("name", params.name)
        .execute("api_itsm_req_category_update");
    return res;
}

async function _delete(id) {
    await getCategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_category_delete_by_id");
    return res;
}

async function getCategory(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_category_get_by_id");

    if (res.recordset.length == 0) throw 'Category not found';    

    var categories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;

        categories.push({
            'id': id, 
            'name': name
        });
    }
    
    return categories;
} 
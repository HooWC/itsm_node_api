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
    const res = await conn.request().execute("api_itsm_sucategory_get_all");
   
    var sucategorys = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var sucategory = res.recordset[i].sucategory;        
        var category = res.recordset[i].category;        
        var department_id = res.recordset[i].department_id;        

        sucategorys.push({
            'id': id, 
            'sucategory': sucategory,
            'category': category,
            'department_id': department_id
        });
    }
    
    return sucategorys;
}

// done
async function getById(id) {
    return await getSucategory(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("sucategory", params.sucategory)
        .input("category", params.category)
        .input("department_id", params.department_id)
        .execute("api_itsm_sucategory_create");

    return res;
}

// done
async function update(id, params) {
    await getSucategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("sucategory", params.sucategory)
        .input("category", params.category)
        .input("department_id", params.department_id)
        .execute("api_itsm_sucategory_update");

    return res;
}

// done
async function _delete(id) {
    await getSucategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_sucategory_delete_by_id");

    return res;
}

// helper functions
async function getSucategory(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_sucategory_get_by_id");

    if (res.recordset.length == 0) throw 'Cant find it.';    

    var sucategorys = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var sucategory = res.recordset[i].sucategory;        
        var category = res.recordset[i].category;        
        var department_id = res.recordset[i].department_id;        

        sucategorys.push({
            'id': id, 
            'sucategory': sucategory,
            'category': category,
            'department_id': department_id
        });
    }
    
    return sucategorys[0];
} 
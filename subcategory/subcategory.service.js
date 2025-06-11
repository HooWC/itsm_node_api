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
    const res = await conn.request().execute("api_itsm_subcategory_get_all");
   
    var subcategories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var subcategory = res.recordset[i].subcategory;        
        var category = res.recordset[i].category;        
        var department_id = res.recordset[i].department_id;        

        subcategories.push({
            'id': id, 
            'subcategory': subcategory,
            'category': category,
            'department_id': department_id
        });
    }
    
    return subcategories;
}

// done
async function getById(id) {
    return await getSubcategory(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("subcategory", params.subcategory)
        .input("category", params.category)
        .input("department_id", params.department_id)
        .execute("api_itsm_subcategory_create");

    return res;
}

// done
async function update(id, params) {
    await getSubcategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("subcategory", params.subcategory)
        .input("category", params.category)
        .input("department_id", params.department_id)
        .execute("api_itsm_subcategory_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getSubcategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_subcategory_delete_by_id");

    return res;
}

// helper functions
async function getSubcategory(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_subcategory_get_by_id");

    if (res.recordset.length == 0) throw 'Cant find it.';    

    var subcategories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var subcategory = res.recordset[i].subcategory;        
        var category = res.recordset[i].category;        
        var department_id = res.recordset[i].department_id;        

        subcategories.push({
            'id': id, 
            'subcategory': subcategory,
            'category': category,
            'department_id': department_id
        });
    }
    
    return subcategories;
} 
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
    const res = await conn.request().execute("api_itsm_incidentcategory_get_all");
   
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

// done
async function getById(id) {
    return await getCategory(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("name", params.name)
        .execute("api_itsm_incidentcategory_create");

    return res;
}

// done
async function update(id, params) {
    await getCategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("name", params.name)
        .execute("api_itsm_incidentcategory_update");

    return res;
}

// done
async function _delete(id) {
    await getCategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_incidentcategory_delete_by_id");

    return res;
}

// helper functions
async function getCategory(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_incidentcategory_get_by_id");

    if (res.recordset.length == 0) throw 'Cant find incident category.';    

    var categories = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var name = res.recordset[i].name;        

        categories.push({
            'id': id, 
            'name': name
        });
    }
    
    return categories[0];
} 
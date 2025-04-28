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
    const res = await conn.request().execute("api_itsm_category_get_all");
   
    var categorys = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var title = res.recordset[i].title;        
        var description = res.recordset[i].description;      

        categorys.push({
            'id': id, 
            'title': title,
            'description': description
        });
    }
    
    return categorys;
}

// done
async function getById(id) {    
    return await getCategory(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("title", params.title)
        .input("description", params.description)
        .execute("api_itsm_category_create");

    return res;
}

// done
async function update(id, params) {
    await getCategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("title", params.title)
        .input("description", params.description)
        .execute("api_itsm_category_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getCategory(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_category_delete_by_id");

    return res;
}

// done
async function getCategory(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_category_get_by_id");

    if (res.recordset.length == 0) throw 'Category not found';    

    var categorys = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var title = res.recordset[i].title;        
        var description = res.recordset[i].description;      

        categorys.push({
            'id': id, 
            'title': title,
            'description': description
        });
    }
    
    return categorys;    
}

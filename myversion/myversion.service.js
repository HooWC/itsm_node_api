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
    const res = await conn.request().execute("api_itsm_version_get_all");
   
    var myversions = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var version_num = res.recordset[i].version_num;        
        var release_date = res.recordset[i].release_date;      
        var message = res.recordset[i].message;        

        myversions.push({
            'id': id, 
            'version_num': version_num,
            'release_date': release_date,
            'message': message
        });
    }
    
    return myversions;
}

// done
async function getById(id) {    
    return await getVersion(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("version_num", params.version_num)
        .input("message", params.message)
        .execute("api_itsm_version_create");

    return res;
}

// done
async function update(id, params) {
    await getVersion(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("version_num", params.version_num)
        .input("message", params.message)
        .execute("api_itsm_version_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getVersion(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_version_delete_by_id");

    return res;
}

// done
async function getVersion(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_version_get_by_id");

    if (res.recordset.length == 0) throw 'Version message not found';    

    var myversions = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var version_num = res.recordset[i].version_num;        
        var release_date = res.recordset[i].release_date;      
        var message = res.recordset[i].message;        

        myversions.push({
            'id': id, 
            'version_num': version_num,
            'release_date': release_date,
            'message': message
        });
    }
    
    return myversions;    
}

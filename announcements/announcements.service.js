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
    const res = await conn.request().execute("api_itsm_announcement_get_all");
   
    var anns = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var at_number = res.recordset[i].at_number;        
        var create_by = res.recordset[i].create_by;        
        var create_date = res.recordset[i].create_date;        
        var update_date = res.recordset[i].update_date;        
        var message = res.recordset[i].message;        

        anns.push({
            'id': id, 
            'at_number': at_number,
            'create_by': create_by,
            'create_date': create_date,
            'update_date': update_date,
            'message': message
        });
    }
    
    return anns;
}

// done
async function getById(id) {    
    return await getAnnouncement(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("at_number", params.at_number)
        .input("create_by", params.create_by)
        .input("message", params.message)
        .execute("api_itsm_announcement_create");

    return res;
}

// done
async function update(id, params) {
    await getAnnouncement(id);

    const res = await conn.request()
        .input("id", id)
        .input("message", params.message)
        .execute("api_itsm_announcement_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getAnnouncement(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_announcement_delete_by_id");

    return res;
}

// done
async function getAnnouncement(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_announcement_get_by_id");

    if (res.recordset.length == 0) throw 'Announcement not found';    

    var anns = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var at_number = res.recordset[i].at_number;        
        var create_by = res.recordset[i].create_by;        
        var create_date = res.recordset[i].create_date;        
        var update_date = res.recordset[i].update_date;        
        var message = res.recordset[i].message;   

        anns.push({
            'id': id, 
            'at_number': at_number,
            'create_by': create_by,
            'create_date': create_date,
            'update_date': update_date,
            'message': message
        });
    }
    
    return anns;    
}

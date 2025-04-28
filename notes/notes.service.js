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
    const res = await conn.request().execute("api_itsm_notes_get_all");
   
    var notes = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var note_number = res.recordset[i].note_number;        
        var incident_id = res.recordset[i].incident_id;        
        var user_id = res.recordset[i].user_id;        
        var create_date = res.recordset[i].create_date;        
        var message = res.recordset[i].message;        

        notes.push({
            'id': id, 
            'note_number': note_number,
            'incident_id': incident_id,
            'user_id': user_id,
            'create_date': create_date,
            'message': message
        });
    }
    
    return notes;
}

// done
async function getById(id) {    
    return await getNote(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("note_number", params.note_number)
        .input("incident_id", params.incident_id)
        .input("user_id", params.user_id)
        .input("message", params.message)
        .execute("api_itsm_notes_create");

    return res;
}

// done
async function update(id, params) {
    await getNote(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("message", params.message)
        .execute("api_itsm_notes_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getNote(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_notes_delete_by_id");

    return res;
}

// done
async function getNote(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_notes_get_by_id");

    if (res.recordset.length == 0) throw 'Note message not found';    

    var notes = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var note_number = res.recordset[i].note_number;        
        var incident_id = res.recordset[i].incident_id;        
        var user_id = res.recordset[i].user_id;        
        var create_date = res.recordset[i].create_date;        
        var message = res.recordset[i].message;        

        notes.push({
            'id': id, 
            'note_number': note_number,
            'incident_id': incident_id,
            'user_id': user_id,
            'create_date': create_date,
            'message': message
        });
    }
    
    return notes;    
}

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
    const res = await conn.request().execute("api_itsm_req_notes_get_all");
   
    var notes = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var note_number = res.recordset[i].note_number;        
        var request_id = res.recordset[i].request_id;        
        var user_id = res.recordset[i].user_id;        
        var create_date = res.recordset[i].create_date;        
        var message = res.recordset[i].message;
        var note_read = res.recordset[i].note_read;
        var receiver_id = res.recordset[i].receiver_id;

        notes.push({
            'id': id, 
            'note_number': note_number,
            'request_id': request_id,
            'user_id': user_id,
            'create_date': create_date,
            'message': message,
            'note_read': note_read,
            'receiver_id': receiver_id
        });
    }
    
    return notes;
}

async function getById(id) {    
    return await getNote(id);
}

async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("note_number", params.note_number)
        .input("request_id", params.request_id)
        .input("user_id", params.user_id)
        .input("message", params.message)
        .input("note_read", params.note_read)
        .input("receiver_id", params.receiver_id)
        .execute("api_itsm_req_notes_create");
    return res;
}

async function update(id, params) {
    await getNote(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("message", params.message)
        .input("note_read", params.note_read)
        .input("receiver_id", params.receiver_id)
        .execute("api_itsm_req_notes_update");
    return res;
}

async function _delete(id) {
    await getNote(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_notes_delete_by_id");
    return res;
}

async function getNote(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_req_notes_get_by_id");

    if (res.recordset.length == 0) throw 'Request note not found';    

    var notes = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var note_number = res.recordset[i].note_number;        
        var request_id = res.recordset[i].request_id;        
        var user_id = res.recordset[i].user_id;        
        var create_date = res.recordset[i].create_date;        
        var message = res.recordset[i].message;
        var note_read = res.recordset[i].note_read;
        var receiver_id = res.recordset[i].receiver_id;

        notes.push({
            'id': id, 
            'note_number': note_number,
            'request_id': request_id,
            'user_id': user_id,
            'create_date': create_date,
            'message': message,
            'note_read': note_read,
            'receiver_id': receiver_id
        });
    }
    
    return notes;
} 
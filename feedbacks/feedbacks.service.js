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
    const res = await conn.request().execute("api_itsm_feedback_get_all");
   
    var feedbacks = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var fb_number = res.recordset[i].fb_number;        
        var user_id = res.recordset[i].user_id;        
        var create_date = res.recordset[i].create_date;        
        var update_date = res.recordset[i].update_date;        
        var message = res.recordset[i].message;        

        feedbacks.push({
            'id': id, 
            'fb_number': fb_number,
            'user_id': user_id,
            'create_date': create_date,
            'update_date': update_date,
            'message': message
        });
    }
    
    return feedbacks;
}

// done
async function getById(id) {    
    return await getFeedback(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("fb_number", params.fb_number)
        .input("user_id", params.user_id)
        .input("message", params.message)
        .execute("api_itsm_feedback_create");

    return res;
}

// done
async function update(id, params) {
    await getFeedback(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("message", params.message)
        .execute("api_itsm_feedback_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getFeedback(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_feedback_delete_by_id");

    return res;
}

// done
async function getFeedback(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_feedback_get_by_id");

    if (res.recordset.length == 0) throw 'Feedback message not found';    

    var feedbacks = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var fb_number = res.recordset[i].fb_number;        
        var user_id = res.recordset[i].user_id;        
        var create_date = res.recordset[i].create_date;        
        var update_date = res.recordset[i].update_date;        
        var message = res.recordset[i].message;        

        feedbacks.push({
            'id': id, 
            'fb_number': fb_number,
            'user_id': user_id,
            'create_date': create_date,
            'update_date': update_date,
            'message': message
        });
    }
    
    return feedbacks;    
}

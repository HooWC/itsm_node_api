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
    const res = await conn.request().execute("api_itsm_request_get_all");
   
    var requests = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var req_id = res.recordset[i].req_id;        
        var pro_id = res.recordset[i].pro_id;        
        var sender = res.recordset[i].sender;        
        var state = res.recordset[i].state;        
        var short_description = res.recordset[i].short_description;        
        var description = res.recordset[i].description;        
        var create_date = res.recordset[i].create_date;        
        var assignment_group = res.recordset[i].assignment_group;        
        var update_date = res.recordset[i].update_date;        
        var updated_by = res.recordset[i].updated_by;        
        var closed_date = res.recordset[i].closed_date;        
        var quantity = res.recordset[i].quantity;        

        requests.push({
            'id': id, 
            'req_id': req_id,
            'pro_id': pro_id,
            'sender': sender,
            'state': state,
            'short_description': short_description,
            'description': description,
            'create_date': create_date,
            'assignment_group': assignment_group,
            'update_date': update_date,
            'updated_by': updated_by,
            'closed_date': closed_date,
            'quantity': quantity
        });
    }
    
    return requests;
}

// done
async function getById(id) {    
    return await getRequest(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("req_id", params.req_id)
        .input("pro_id", params.pro_id)
        .input("sender", params.sender)
        .input("state", params.state)
        .input("short_description", params.short_description)
        .input("description", params.description)
        .input("assignment_group", params.assignment_group)
        .input("quantity", params.quantity)
        .execute("api_itsm_request_create");

    return res;
}

// done
async function update(id, params) {
    await getRequest(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("pro_id", params.pro_id)
        .input("state", params.state)
        .input("short_description", params.short_description)
        .input("description", params.description)
        .input("assignment_group", params.assignment_group)
        .input("updated_by", params.updated_by)
        .input("closed_date", params.closed_date)
        .input("quantity", params.quantity)
        .execute("api_itsm_request_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getRequest(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_request_delete_by_id");

    return res;
}

// done
async function getRequest(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_request_get_by_id");

    if (res.recordset.length == 0) throw 'Trquest not found';    

    var requests = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var req_id = res.recordset[i].req_id;        
        var pro_id = res.recordset[i].pro_id;        
        var sender = res.recordset[i].sender;        
        var state = res.recordset[i].state;        
        var short_description = res.recordset[i].short_description;        
        var description = res.recordset[i].description;        
        var create_date = res.recordset[i].create_date;        
        var assignment_group = res.recordset[i].assignment_group;        
        var update_date = res.recordset[i].update_date;        
        var updated_by = res.recordset[i].updated_by;        
        var closed_date = res.recordset[i].closed_date;        
        var quantity = res.recordset[i].quantity;        

        requests.push({
            'id': id, 
            'req_id': req_id,
            'pro_id': pro_id,
            'sender': sender,
            'state': state,
            'short_description': short_description,
            'description': description,
            'create_date': create_date,
            'assignment_group': assignment_group,
            'update_date': update_date,
            'updated_by': updated_by,
            'closed_date': closed_date,
            'quantity': quantity
        });
    }
    
    return requests;
}

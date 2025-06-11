const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    getByIncId,
    create,
    update,
    delete: _delete
};

// done
async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_incident_get_all");
   
    var incidents = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var inc_number = res.recordset[i].inc_number;        
        var create_date = res.recordset[i].create_date;               
        var describe = res.recordset[i].describe;        
        var sender = res.recordset[i].sender;        
        var urgency = res.recordset[i].urgency;          
        var state = res.recordset[i].state;        
        var category = res.recordset[i].category;        
        var subcategory = res.recordset[i].subcategory;        
        var assignment_group = res.recordset[i].assignment_group;        
        var assigned_to = res.recordset[i].assigned_to;        
        var updated = res.recordset[i].updated;        
        var updated_by = res.recordset[i].updated_by;        
        var resolution = res.recordset[i].resolution;        
        var resolved_by = res.recordset[i].resolved_by;        
        var resolved_date = res.recordset[i].resolved_date;        
        var close_date = res.recordset[i].close_date;   
        var resolved_type = res.recordset[i].resolved_type; 

        incidents.push({
            'id': id, 
            'inc_number': inc_number,
            'create_date': create_date,
            'describe': describe,
            'sender': sender,
            'urgency': urgency,
            'state': state,
            'category': category,
            'subcategory': subcategory,
            'assignment_group': assignment_group,
            'assigned_to': assigned_to,
            'updated': updated,
            'updated_by': updated_by,
            'resolution': resolution,
            'resolved_by': resolved_by,
            'resolved_date': resolved_date,
            'close_date': close_date,
            'resolved_type': resolved_type
        });
    }
    
    return incidents;
}

// done
async function getById(id) {    
    return await getIncident(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("inc_number", params.inc_number)
        .input("describe", params.describe)
        .input("sender", params.sender)
        .input("urgency", params.urgency)
        .input("state", params.state)
        .input("category", params.category)
        .input("subcategory", params.subcategory)
        .input("assignment_group", params.assignment_group)
        .input("assigned_to", params.assigned_to)
        .input("updated_by", params.updated_by)
        .execute("api_itsm_incident_create");

    return res;
}

// done
async function update(id, params) {
    await getIncident(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("describe", params.describe)
        .input("urgency", params.urgency)
        .input("state", params.state)
        .input("category", params.category)
        .input("subcategory", params.subcategory)
        .input("assignment_group", params.assignment_group)
        .input("assigned_to", params.assigned_to)
        .input("resolution", params.resolution)
        .input("resolved_by", params.resolved_by)
        .input("resolved_date", params.resolved_date)
        .input("close_date", params.close_date)
        .input("updated_by", params.updated_by)
        .input("resolved_type", params.resolved_type)
        .execute("api_itsm_incident_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getIncident(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_incident_delete_by_id");

    return res;
}

// done
async function getIncident(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_incident_get_by_id");

    if (res.recordset.length == 0) throw 'Incident data not found';    

    var incidents = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var inc_number = res.recordset[i].inc_number;        
        var create_date = res.recordset[i].create_date;            
        var describe = res.recordset[i].describe;        
        var sender = res.recordset[i].sender;        
        var urgency = res.recordset[i].urgency;                
        var state = res.recordset[i].state;        
        var category = res.recordset[i].category;        
        var subcategory = res.recordset[i].subcategory;        
        var assignment_group = res.recordset[i].assignment_group;        
        var assigned_to = res.recordset[i].assigned_to;        
        var updated = res.recordset[i].updated;        
        var updated_by = res.recordset[i].updated_by;        
        var resolution = res.recordset[i].resolution;        
        var resolved_by = res.recordset[i].resolved_by;        
        var resolved_date = res.recordset[i].resolved_date;        
        var close_date = res.recordset[i].close_date;  
        var resolved_type = res.recordset[i].resolved_type; 

        incidents.push({
            'id': id, 
            'inc_number': inc_number,
            'create_date': create_date,
            'describe': describe,
            'sender': sender,
            'urgency': urgency,
            'state': state,
            'category': category,
            'subcategory': subcategory,
            'assignment_group': assignment_group,
            'assigned_to': assigned_to,
            'updated': updated,
            'updated_by': updated_by,
            'resolution': resolution,
            'resolved_by': resolved_by,
            'resolved_date': resolved_date,
            'close_date': close_date,
            'resolved_type': resolved_type
        });
    }
    
    return incidents;    
}

async function getByIncId(inc_number) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("inc_number", inc_number)
        .execute("api_itsm_incident_get_by_incid");

    if (res.recordset.length == 0) throw 'Incident data not found';    

    var incidents = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        var id = res.recordset[i].id;
        var inc_number = res.recordset[i].inc_number;        
        var create_date = res.recordset[i].create_date;        
        var describe = res.recordset[i].describe;        
        var sender = res.recordset[i].sender;        
        var urgency = res.recordset[i].urgency;        
        var state = res.recordset[i].state;        
        var category = res.recordset[i].category;        
        var subcategory = res.recordset[i].subcategory;        
        var assignment_group = res.recordset[i].assignment_group;        
        var assigned_to = res.recordset[i].assigned_to;        
        var updated = res.recordset[i].updated;        
        var updated_by = res.recordset[i].updated_by;        
        var resolution = res.recordset[i].resolution;        
        var resolved_by = res.recordset[i].resolved_by;        
        var resolved_date = res.recordset[i].resolved_date;        
        var close_date = res.recordset[i].close_date;  
        var resolved_type = res.recordset[i].resolved_type; 

        incidents.push({
            'id': id, 
            'inc_number': inc_number,
            'create_date': create_date,
            'describe': describe,
            'sender': sender,
            'urgency': urgency,
            'state': state,
            'category': category,
            'subcategory': subcategory,
            'assignment_group': assignment_group,
            'assigned_to': assigned_to,
            'updated': updated,
            'updated_by': updated_by,
            'resolution': resolution,
            'resolved_by': resolved_by,
            'resolved_date': resolved_date,
            'close_date': close_date,
            'resolved_type': resolved_type
        });
    }
    
    return incidents;    
}

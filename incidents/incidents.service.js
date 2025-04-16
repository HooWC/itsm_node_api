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
    const res = await conn.request().execute("api_itsm_incident_get_all");
   
    var incidents = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var inc_number = res.recordset[i].note_number;        
        var create_date = res.recordset[i].incident_id;        
        var short_description = res.recordset[i].user_id;        
        var describe = res.recordset[i].create_date;        
        var sender = res.recordset[i].message;        
        var impact = res.recordset[i].message;        
        var urgency = res.recordset[i].message;        
        var priority = res.recordset[i].message;        
        var state = res.recordset[i].message;        
        var category = res.recordset[i].message;        
        var subcategory = res.recordset[i].message;        
        var assignment_group = res.recordset[i].message;        
        var assigned_to = res.recordset[i].message;        
        var updated = res.recordset[i].message;        
        var updated_by = res.recordset[i].message;        
        var resolution = res.recordset[i].message;        
        var resolved_by = res.recordset[i].message;        
        var resolved_date = res.recordset[i].message;        
        var close_date = res.recordset[i].message;   

        incidents.push({
            'id': id, 
            'inc_number': inc_number,
            'create_date': create_date,
            'short_description': short_description,
            'describe': describe,
            'sender': sender,
            'impact': impact,
            'urgency': urgency,
            'priority': priority,
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
            'close_date': close_date
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
        .input("short_description", params.short_description)
        .input("describe", params.describe)
        .input("sender", params.sender)
        .input("impact", params.impact)
        .input("urgency", params.urgency)
        .input("priority", params.priority)
        .input("state", params.state)
        .input("category", params.category)
        .input("subcategory", params.subcategory)
        .input("assignment_group", params.assignment_group)
        .input("assigned_to", params.assigned_to)
        .execute("api_itsm_incident_create");

    return res;
}

// done
async function update(id, params) {
    await getIncident(id);

    const res = await conn.request()
        .input("id", id)
        .input("short_description", params.short_description)
        .input("describe", params.describe)
        .input("impact", params.impact)
        .input("urgency", params.urgency)
        .input("priority", params.priority)
        .input("state", params.state)
        .input("category", params.category)
        .input("subcategory", params.subcategory)
        .input("assignment_group", params.assignment_group)
        .input("assigned_to", params.assigned_to)
        .input("resolution", params.resolution)
        .input("resolved_by", params.resolved_by)
        .input("resolved_date", params.resolved_date)
        .input("close_date", params.close_date)
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
        var inc_number = res.recordset[i].note_number;        
        var create_date = res.recordset[i].incident_id;        
        var short_description = res.recordset[i].user_id;        
        var describe = res.recordset[i].create_date;        
        var sender = res.recordset[i].message;        
        var impact = res.recordset[i].message;        
        var urgency = res.recordset[i].message;        
        var priority = res.recordset[i].message;        
        var state = res.recordset[i].message;        
        var category = res.recordset[i].message;        
        var subcategory = res.recordset[i].message;        
        var assignment_group = res.recordset[i].message;        
        var assigned_to = res.recordset[i].message;        
        var updated = res.recordset[i].message;        
        var updated_by = res.recordset[i].message;        
        var resolution = res.recordset[i].message;        
        var resolved_by = res.recordset[i].message;        
        var resolved_date = res.recordset[i].message;        
        var close_date = res.recordset[i].message;   

        incidents.push({
            'id': id, 
            'inc_number': inc_number,
            'create_date': create_date,
            'short_description': short_description,
            'describe': describe,
            'sender': sender,
            'impact': impact,
            'urgency': urgency,
            'priority': priority,
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
            'close_date': close_date
        });
    }
    
    return incidents;    
}

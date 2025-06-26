const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    getByReqId,
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
        var description = res.recordset[i].description;        
        var create_date = res.recordset[i].create_date;        
        var assignment_group = res.recordset[i].assignment_group;        
        var update_date = res.recordset[i].update_date;        
        var updated_by = res.recordset[i].updated_by;           
        var quantity = res.recordset[i].quantity;  
        var assigned_to = res.recordset[i].assigned_to; 
        var req_type = res.recordset[i].req_type;
        var erp_version = res.recordset[i].erp_version;
        var erp_category = res.recordset[i].erp_category;
        var erp_subcategory = res.recordset[i].erp_subcategory;
        var erp_function = res.recordset[i].erp_function;
        var erp_module = res.recordset[i].erp_module;
        var erp_user_account = res.recordset[i].erp_user_account;
        var erp_report = res.recordset[i].erp_report;
        var erp_resolution_type = res.recordset[i].erp_resolution_type;
        var erp_resolution = res.recordset[i].erp_resolution;
        var erp_resolved_data = res.recordset[i].erp_resolved_data;

        requests.push({
            'id': id, 
            'req_id': req_id,
            'pro_id': pro_id,
            'sender': sender,
            'state': state,
            'description': description,
            'create_date': create_date,
            'assignment_group': assignment_group,
            'update_date': update_date,
            'updated_by': updated_by,
            'quantity': quantity,
            'assigned_to': assigned_to,
            'req_type': req_type,
            'erp_version': erp_version,
            'erp_category': erp_category,
            'erp_subcategory': erp_subcategory,
            'erp_function': erp_function,
            'erp_module': erp_module,
            'erp_user_account': erp_user_account,
            'erp_report': erp_report,
            'erp_resolution_type': erp_resolution_type,
            'erp_resolution': erp_resolution,
            'erp_resolved_data': erp_resolved_data
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
        .input("description", params.description)
        .input("assignment_group", params.assignment_group)
        .input("quantity", params.quantity)
        .input("updated_by", params.updated_by)
        .input("assigned_to", params.assigned_to)
        .input("req_type", params.req_type)
        .input("erp_version", params.erp_version)
        .input("erp_category", params.erp_category)
        .input("erp_subcategory", params.erp_subcategory)
        .input("erp_function", params.erp_function)
        .input("erp_module", params.erp_module)
        .input("erp_user_account", params.erp_user_account)
        .input("erp_report", params.erp_report)
        .input("erp_resolution_type", params.erp_resolution_type)
        .input("erp_resolution", params.erp_resolution)
        .input("erp_resolved_data", params.erp_resolved_data)
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
        .input("description", params.description)
        .input("assignment_group", params.assignment_group)
        .input("updated_by", params.updated_by)
        .input("quantity", params.quantity)
        .input("assigned_to", params.assigned_to)
        .input("erp_module", params.erp_module)
        .input("erp_user_account", params.erp_user_account)
        .input("erp_report", params.erp_report)
        .input("erp_resolution_type", params.erp_resolution_type)
        .input("erp_resolution", params.erp_resolution)
        .input("erp_resolved_data", params.erp_resolved_data)
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
        var description = res.recordset[i].description;        
        var create_date = res.recordset[i].create_date;        
        var assignment_group = res.recordset[i].assignment_group;        
        var update_date = res.recordset[i].update_date;        
        var updated_by = res.recordset[i].updated_by;        
        var quantity = res.recordset[i].quantity;        
        var assigned_to = res.recordset[i].assigned_to;   
        var req_type = res.recordset[i].req_type;
        var erp_version = res.recordset[i].erp_version;
        var erp_category = res.recordset[i].erp_category;
        var erp_subcategory = res.recordset[i].erp_subcategory;
        var erp_function = res.recordset[i].erp_function;
        var erp_module = res.recordset[i].erp_module;
        var erp_user_account = res.recordset[i].erp_user_account;
        var erp_report = res.recordset[i].erp_report;
        var erp_resolution_type = res.recordset[i].erp_resolution_type;
        var erp_resolution = res.recordset[i].erp_resolution;
        var erp_resolved_data = res.recordset[i].erp_resolved_data;

        requests.push({
            'id': id, 
            'req_id': req_id,
            'pro_id': pro_id,
            'sender': sender,
            'state': state,
            'description': description,
            'create_date': create_date,
            'assignment_group': assignment_group,
            'update_date': update_date,
            'updated_by': updated_by,
            'quantity': quantity,
            'assigned_to': assigned_to,
            'req_type': req_type,
            'erp_version': erp_version,
            'erp_category': erp_category,
            'erp_subcategory': erp_subcategory,
            'erp_function': erp_function,
            'erp_module': erp_module,
            'erp_user_account': erp_user_account,
            'erp_report': erp_report,
            'erp_resolution_type': erp_resolution_type,
            'erp_resolution': erp_resolution,
            'erp_resolved_data': erp_resolved_data
        });
    }
    
    return requests;
}

// done
async function getByReqId(req_id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("req_id", req_id)
        .execute("api_itsm_req_get_by_reqid");

    if (res.recordset.length == 0) throw 'Request data not found';    

    var requests = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var req_id = res.recordset[i].req_id;        
        var pro_id = res.recordset[i].pro_id;        
        var sender = res.recordset[i].sender;        
        var state = res.recordset[i].state;        
        var description = res.recordset[i].description;        
        var create_date = res.recordset[i].create_date;        
        var assignment_group = res.recordset[i].assignment_group;        
        var update_date = res.recordset[i].update_date;        
        var updated_by = res.recordset[i].updated_by;        
        var quantity = res.recordset[i].quantity;        
        var assigned_to = res.recordset[i].assigned_to;   
        var req_type = res.recordset[i].req_type;
        var erp_version = res.recordset[i].erp_version;
        var erp_category = res.recordset[i].erp_category;
        var erp_subcategory = res.recordset[i].erp_subcategory;
        var erp_function = res.recordset[i].erp_function;
        var erp_module = res.recordset[i].erp_module;
        var erp_user_account = res.recordset[i].erp_user_account;
        var erp_report = res.recordset[i].erp_report;
        var erp_resolution_type = res.recordset[i].erp_resolution_type;
        var erp_resolution = res.recordset[i].erp_resolution;
        var erp_resolved_data = res.recordset[i].erp_resolved_data;

        requests.push({
            'id': id, 
            'req_id': req_id,
            'pro_id': pro_id,
            'sender': sender,
            'state': state,
            'description': description,
            'create_date': create_date,
            'assignment_group': assignment_group,
            'update_date': update_date,
            'updated_by': updated_by,
            'quantity': quantity,
            'assigned_to': assigned_to,
            'req_type': req_type,
            'erp_version': erp_version,
            'erp_category': erp_category,
            'erp_subcategory': erp_subcategory,
            'erp_function': erp_function,
            'erp_module': erp_module,
            'erp_user_account': erp_user_account,
            'erp_report': erp_report,
            'erp_resolution_type': erp_resolution_type,
            'erp_resolution': erp_resolution,
            'erp_resolved_data': erp_resolved_data
        });
    }
    
    return requests;
}
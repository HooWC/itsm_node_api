const db = require('../_helpers/db');

module.exports = {
    getAll,
    create,
    update,
    delete: _delete
};

// done
async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_department_get_all");
   
    var dept = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var name = res.recordset[i].name;        
        var description = res.recordset[i].description;        
        var created_date = res.recordset[i].created_date;        
        var update_date = res.recordset[i].update_date;        

        dept.push({
            'id': id, 
            'name': name,
            'description': description,
            'created_date': created_date,
            'update_date': update_date
        });
    }
    
    return dept;
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("name", params.name)
        .input("description", params.description)
        .execute("api_itsm_department_create");

    return res;
}

// done
async function update(id, params) {
    await getDepartment(id);

    const res = await conn.request()
        .input("id", id)
        .input("name", params.name)
        .input("description", params.description)
        .execute("api_itsm_department_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getDepartment(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_department_delete_by_id");

    return res;
}

// done
async function getDepartment(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_department_get_by_id");

    if (res.recordset.length == 0) throw 'Department not found';    

    var dept = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var name = res.recordset[i].name;        
        var description = res.recordset[i].description;        
        var created_date = res.recordset[i].created_date;        
        var update_date = res.recordset[i].update_date;  

        dept.push({
            'id': id, 
            'name': name,
            'description': description,
            'created_date': created_date,
            'update_date': update_date
        });
    }
    
    return dept;    
}

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
    const res = await conn.request().execute("api_itsm_todo_get_all");
   
    var todos = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        /* if(res.recordset[i].active == 1){
            active_status = "Complete";
        }else{
            active_status = "Incomplete";
        } */

        var id = res.recordset[i].id;
        var user_id = res.recordset[i].user_id;        
        var title = res.recordset[i].title;       
        var create_date = res.recordset[i].create_date;        
        var update_date = res.recordset[i].update_date;        
        var active = res.recordset[i].active;  
        var todo_id = res.recordset[i].todo_id;      

        todos.push({
            'id': id, 
            'user_id': user_id,
            'title': title,
            'create_date': create_date,
            'update_date': update_date,
            'active': active,
            'todo_id': todo_id
        });
    }
    
    return todos;
}

// done
async function getById(id) {    
    return await getTodo(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("user_id", params.user_id)
        .input("title", params.title)
        .input("create_date", params.create_date)
        .input("update_date", params.update_date)
        .input("active", params.active)
        .input("todo_id", params.todo_id)
        .execute("api_itsm_todo_create");

    return res;
}

// done
async function update(id, params) {
    await getTodo(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("title", params.title)
        .input("active", params.active)
        .execute("api_itsm_todo_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getTodo(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_todo_delete_by_id");

    return res;
}

// done
async function getTodo(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_todo_get_by_id");

    if (res.recordset.length == 0) throw 'This todo task not found';    

    var todos = new Array();

    for (var i = 0; i < res.recordset.length; i++) {

        /* if(res.recordset[i].active == 1){
            active_status = "Complete";
        }else{
            active_status = "Incomplete";
        } */

            var id = res.recordset[i].id;
            var user_id = res.recordset[i].user_id;        
            var title = res.recordset[i].title;       
            var create_date = res.recordset[i].create_date;        
            var update_date = res.recordset[i].update_date;        
            var active = res.recordset[i].active;        
            var todo_id = res.recordset[i].todo_id;

            todos.push({
                'id': id, 
                'user_id': user_id,
                'title': title,
                'create_date': create_date,
                'update_date': update_date,
                'active': active,
                'todo_id': todo_id
            });
    }
    
    return notes;    
}

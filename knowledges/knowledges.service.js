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
    const res = await conn.request().execute("api_itsm_knowledge_get_all");
   
    var know = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var kb_number = res.recordset[i].kb_number;        
        var author = res.recordset[i].author;        
        var article = res.recordset[i].article;        
        var short_description = res.recordset[i].short_description;        
        var category_id = res.recordset[i].category_id;        
        var create_date = res.recordset[i].create_date;        
        var updated = res.recordset[i].updated;        
        var active = res.recordset[i].active;        
        var kb_file = res.recordset[i].kb_file;     

        know.push({
            'id': id, 
            'kb_number': kb_number,
            'author': author,
            'article': article,
            'short_description': short_description,
            'category_id': category_id,
            'create_date': create_date,
            'updated': updated,
            'active': active,
            'kb_file': kb_file
        });
    }
    
    return know;
}

// done
async function getById(id) {    
    return await getKnowledge(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("kb_number", params.kb_number)
        .input("author", params.author)
        .input("article", params.article)
        .input("short_description", params.short_description)
        .input("category_id", params.category_id)
        .input("kb_file", params.kb_file)
        .execute("api_itsm_knowledge_create");

    return res;
}

// done
async function update(id, params) {
    await getKnowledge(id);

    const res = await conn.request()
        .input("id", id)
        .input("article", params.article)
        .input("short_description", params.short_description)
        .input("category_id", params.category_id)
        .input("active", params.active)
        .input("updated", params.updated)
        .execute("api_itsm_knowledge_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getKnowledge(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_knowledge_delete_by_id");

    return res;
}

// done
async function getKnowledge(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_knowledge_get_by_id");

    if (res.recordset.length == 0) throw 'Knowledge not found';    

    var know = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var kb_number = res.recordset[i].kb_number;        
        var author = res.recordset[i].author;        
        var article = res.recordset[i].article;        
        var short_description = res.recordset[i].short_description;        
        var category_id = res.recordset[i].category_id;        
        var create_date = res.recordset[i].create_date;        
        var updated = res.recordset[i].updated;        
        var active = res.recordset[i].active;        
        var kb_file = res.recordset[i].kb_file;     

        know.push({
            'id': id, 
            'kb_number': kb_number,
            'author': author,
            'article': article,
            'short_description': short_description,
            'category_id': category_id,
            'create_date': create_date,
            'updated': updated,
            'active': active,
            'kb_file': kb_file
        });
    }
    
    return know;   
}

const db = require('../_helpers/db');
const sql = require('mssql');

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
        const record = res.recordset[i];

        var id = record.id;
        var kb_number = record.kb_number;        
        var author = record.author;        
        var article = record.article;        
        var short_description = record.short_description;        
        var category_id = record.category_id;        
        var create_date = record.create_date;        
        var updated = record.updated;        
        var active = record.active;           
        var title = record.title;
        var kb_view = record.kb_view !== null ? record.kb_view : 0;
        var kb_type = record.kb_type;

        let kb_file_base64 = null;
        if (record.kb_file && Buffer.isBuffer(record.kb_file)) {
            kb_file_base64 = record.kb_file.toString("base64");
        }

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
            'kb_file': kb_file_base64,
            'title': title,
            'kb_view': kb_view,
            'kb_type': kb_type,
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
    const request = conn.request()
        .input("kb_number", params.kb_number)
        .input("author", params.author)
        .input("article", params.article)
        .input("short_description", params.short_description)
        .input("category_id", params.category_id)
        .input("kb_type", params.kb_type)
        .input("title", params.title);

    if (params.kb_file && typeof params.kb_file === 'string') {
        const base64Data = params.kb_file.startsWith('data:') 
            ? params.kb_file.split(',')[1] 
            : params.kb_file;
        
        const fileBuffer = Buffer.from(base64Data, 'base64');
        request.input("kb_file", sql.VarBinary(sql.MAX), fileBuffer);
    } else {
        request.input("kb_file", sql.VarBinary, null);
    }

    const res = await request.execute("api_itsm_knowledge_create");

    return res;
}

// done
async function update(id, params) {
    await getKnowledge(id);

    const conn = await db.getConnection();
    const request = conn.request()
        .input("id", id)
        .input("article", params.article)
        .input("short_description", params.short_description)
        .input("category_id", params.category_id)
        .input("active", params.active)
        .input("updated", params.updated)
        .input("title", params.title)
        .input("kb_type", params.kb_type);

    if (params.kb_file && typeof params.kb_file === 'string') {
        const base64Data = params.kb_file.startsWith('data:') 
            ? params.kb_file.split(',')[1] 
            : params.kb_file;
        
        const fileBuffer = Buffer.from(base64Data, 'base64');
        request.input("kb_file", sql.VarBinary(sql.MAX), fileBuffer);
    } else {
        request.input("kb_file", sql.VarBinary, null);
    }

    const res = await request.execute("api_itsm_knowledge_update");

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
        const record = res.recordset[i];

        var id = record.id;
        var kb_number = record.kb_number;        
        var author = record.author;        
        var article = record.article;        
        var short_description = record.short_description;        
        var category_id = record.category_id;        
        var create_date = record.create_date;        
        var updated = record.updated;        
        var active = record.active;           
        var title = record.title;
        var kb_view = record.kb_view !== null ? record.kb_view : 0;   
        var kb_type = record.kb_type;

        let kb_file_base64 = null;
        if (record.kb_file && Buffer.isBuffer(record.kb_file)) {
            kb_file_base64 = record.kb_file.toString("base64");
        }

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
            'kb_file': kb_file_base64,
            'title': title,
            'kb_view': kb_view,
            'kb_type': kb_type,
        });
    }
    
    return know;   
}

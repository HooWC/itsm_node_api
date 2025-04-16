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
    const res = await conn.request().execute("api_itsm_product_get_all");
   
    var products = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var pro_number = res.recordset[i].note_number;        
        var category_id = res.recordset[i].incident_id;        
        var photo = res.recordset[i].user_id;        
        var item_title = res.recordset[i].create_date;        
        var description = res.recordset[i].message;        
        var quantity = res.recordset[i].message;        
        var active = res.recordset[i].message;        
        var responsible = res.recordset[i].message;        

        products.push({
            'id': id, 
            'pro_number': pro_number,
            'category_id': category_id,
            'photo': photo,
            'item_title': item_title,
            'description': description,
            'quantity': quantity,
            'active': active,
            'responsible': responsible
        });
    }
    
    return products;
}

// done
async function getById(id) {    
    return await getProduct(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("pro_number", params.pro_number)
        .input("category_id", params.category_id)
        .input("photo", params.photo)
        .input("item_title", params.item_title)
        .input("description", params.description)
        .input("quantity", params.quantity)
        .input("responsible", params.responsible)
        .execute("api_itsm_product_create");

    return res;
}

// done
async function update(id, params) {
    await getProduct(id);

    const res = await conn.request()
        .input("id", id)
        .input("category_id", params.category_id)
        .input("photo", params.photo)
        .input("item_title", params.item_title)
        .input("description", params.description)
        .input("quantity", params.quantity)
        .input("active", params.active)
        .input("responsible", params.responsible)
        .execute("api_itsm_product_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getProduct(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_product_delete_by_id");

    return res;
}

// done
async function getProduct(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_product_get_by_id");

    if (res.recordset.length == 0) throw 'Product not found';    

    var products = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var pro_number = res.recordset[i].note_number;        
        var category_id = res.recordset[i].incident_id;        
        var photo = res.recordset[i].user_id;        
        var item_title = res.recordset[i].create_date;        
        var description = res.recordset[i].message;        
        var quantity = res.recordset[i].message;        
        var active = res.recordset[i].message;        
        var responsible = res.recordset[i].message;        

        products.push({
            'id': id, 
            'pro_number': pro_number,
            'category_id': category_id,
            'photo': photo,
            'item_title': item_title,
            'description': description,
            'quantity': quantity,
            'active': active,
            'responsible': responsible
        });
    }
    
    return products;  
}

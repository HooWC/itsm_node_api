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
    const res = await conn.request().execute("api_itsm_product_get_all");
   
    var products = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        const record = res.recordset[i];

        let photoBase64 = null;
        if (record.photo && Buffer.isBuffer(record.photo)) {
            photoBase64 = record.photo.toString("base64");
        }

        var id = res.recordset[i].id;
        var pro_number = res.recordset[i].pro_number;
        var item_title = res.recordset[i].item_title;        
        var description = res.recordset[i].description;        
        var quantity = res.recordset[i].quantity;        
        var active = res.recordset[i].active;        
        var responsible = res.recordset[i].responsible;        
        var photo_type = res.recordset[i].photo_type;       

        products.push({
            'id': id, 
            'pro_number': pro_number,
            'photo': photoBase64,
            'item_title': item_title,
            'description': description,
            'quantity': quantity,
            'active': active,
            'responsible': responsible,
            'photo_type': photo_type,
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
    const request = conn.request()
        .input("pro_number", params.pro_number)
        .input("item_title", params.item_title)
        .input("description", params.description)
        .input("quantity", params.quantity)
        .input("responsible", params.responsible)
        .input("photo_type", params.photo_type)

    if (params.photo) {
        try {
            const base64Data = params.photo.replace(/^data:image\/\w+;base64,/, '');
            const photoBuffer = Buffer.from(base64Data, 'base64');
            request.input("photo", sql.VarBinary(sql.MAX), photoBuffer);
        } catch (error) {
            throw new Error('Failed to process photo data: ' + error.message);
        }
    } else {
        request.input("photo", sql.VarBinary, null);
    }

    const res = await request.execute("api_itsm_product_create");
    return res;
}

// done
async function update(id, params) {
    await getProduct(id);

    // console.group("All params:", params);
    // console.log("Me photo_type:", params.photo_type);
    // console.groupEnd();

    // console.log("Received photo type:", typeof params.photo);

    const conn = await db.getConnection();
    const request = conn.request()
        .input("id", id)
        .input("item_title", params.item_title)
        .input("description", params.description)
        .input("quantity", params.quantity)
        .input("active", params.active)
        .input("responsible", params.responsible)
        .input("photo_type", params.photo_type)
    
        if (params.photo) {
            try {
                const base64Data = params.photo.replace(/^data:image\/\w+;base64,/, '');
                const photoBuffer = Buffer.from(base64Data, 'base64');
                request.input("photo", sql.VarBinary(sql.MAX), photoBuffer);
            } catch (error) {
                throw new Error('Failed to process photo data: ' + error.message);
            }
        }
        else {
            request.input("photo", sql.VarBinary, null);
        }

    const res = await request.execute("api_itsm_product_update");
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
        const record = res.recordset[i];

        let photoBase64 = null;
        if (record.photo && Buffer.isBuffer(record.photo)) {
            photoBase64 = record.photo.toString("base64");
        }

        var id = res.recordset[i].id;
        var pro_number = res.recordset[i].pro_number;        
        var item_title = res.recordset[i].item_title;        
        var description = res.recordset[i].description;        
        var quantity = res.recordset[i].quantity;        
        var active = res.recordset[i].active;        
        var responsible = res.recordset[i].responsible;        
        var photo_type = res.recordset[i].photo_type;        

        products.push({
            'id': id, 
            'pro_number': pro_number,
            'photo': photoBase64,
            'item_title': item_title,
            'description': description,
            'quantity': quantity,
            'active': active,
            'responsible': responsible,
            'photo_type': photo_type,
        });
    }
    
    return products;  
}

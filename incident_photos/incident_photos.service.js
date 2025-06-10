const db = require('../_helpers/db');
const sql = require('mssql');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const conn = await db.getConnection();
    const res = await conn.request().execute("api_itsm_incident_photos_get_all");
   
    var photos = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        const record = res.recordset[i];

        let photoBase64 = null;
        if (record.photo && Buffer.isBuffer(record.photo)) {
            photoBase64 = record.photo.toString("base64");
        }

        photos.push({
            'id': record.id,
            'incident_id': record.incident_id,
            'photo': photoBase64,
            'photo_type': record.photo_type,
            'upload_time': record.upload_time
        });
    }
    
    return photos;
}

async function getById(id) {    
    return await getIncidentPhoto(id);
}

async function create(params) {
    const conn = await db.getConnection();
    const request = conn.request()
        .input("incident_id", params.incident_id)
        .input("photo_type", params.photo_type);

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

    const res = await request.execute("api_itsm_incident_photos_create");
    return res;
}

async function update(id, params) {
    await getIncidentPhoto(id);

    const conn = await db.getConnection();
    const request = conn.request()
        .input("id", id)
        .input("incident_id", params.incident_id)
        .input("photo_type", params.photo_type);
    
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

    const res = await request.execute("api_itsm_incident_photos_update");
    return res.recordset[0];
}

async function _delete(id) {
    await getIncidentPhoto(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_incident_photos_delete_by_id");

    return res;
}

async function getIncidentPhoto(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_incident_photos_get_by_id");

    if (res.recordset.length == 0) throw 'Incident photo not found';    

    var photos = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {
        const record = res.recordset[i];

        let photoBase64 = null;
        if (record.photo && Buffer.isBuffer(record.photo)) {
            photoBase64 = record.photo.toString("base64");
        }

        photos.push({
            'id': record.id,
            'incident_id': record.incident_id,
            'photo': photoBase64,
            'photo_type': record.photo_type,
            'upload_time': record.upload_time
        });
    }
    
    return photos;
} 
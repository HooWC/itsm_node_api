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
    const res = await conn.request().execute("api_itsm_cmdb_get_all");
   
    var cmdbs = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var full_name = res.recordset[i].full_name;        
        var department_id = res.recordset[i].department_id;        
        var device_type = res.recordset[i].device_type;        
        var windows_version = res.recordset[i].windows_version;        
        var hostname = res.recordset[i].hostname;        
        var microsoft_office = res.recordset[i].microsoft_office;        
        var antivirus = res.recordset[i].antivirus;        
        var ip_address = res.recordset[i].ip_address;        
        var erp_system = res.recordset[i].erp_system;        
        var sql_account = res.recordset[i].sql_account;        
        var processor = res.recordset[i].processor;        
        var motherboard = res.recordset[i].motherboard;        
        var ram = res.recordset[i].ram;        
        var monitor_led = res.recordset[i].monitor_led;        
        var keyboard = res.recordset[i].keyboard;        
        var mouse = res.recordset[i].mouse;        
        var hard_disk = res.recordset[i].hard_disk;        
        var dvdrw = res.recordset[i].dvdrw;        
        var ms_office = res.recordset[i].ms_office;       

        cmdbs.push({
            'id': id, 
            'full_name': full_name,
            'department_id': department_id,
            'device_type': device_type,
            'windows_version': windows_version,
            'hostname': hostname,
            'microsoft_office': microsoft_office,
            'antivirus': antivirus,
            'ip_address': ip_address,
            'erp_system': erp_system,
            'sql_account': sql_account,
            'processor': processor,
            'motherboard': motherboard,
            'ram': ram,
            'monitor_led': monitor_led,
            'keyboard': keyboard,
            'mouse': mouse,
            'hard_disk': hard_disk,
            'dvdrw': dvdrw,
            'ms_office': ms_office
        });
    }
    
    return cmdbs;
}

// done
async function getById(id) {    
    return await getCMDB(id);
}

// done
async function create(params) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("full_name", params.full_name)
        .input("department_id", params.department_id)
        .input("device_type", params.device_type)
        .input("windows_version", params.windows_version)
        .input("hostname", params.hostname)
        .input("microsoft_office", params.microsoft_office)
        .input("antivirus", params.antivirus)
        .input("ip_address", params.ip_address)
        .input("erp_system", params.erp_system)
        .input("sql_account", params.sql_account)
        .input("processor", params.processor)
        .input("motherboard", params.motherboard)
        .input("ram", params.ram)
        .input("monitor_led", params.monitor_led)
        .input("keyboard", params.keyboard)
        .input("mouse", params.mouse)
        .input("hard_disk", params.hard_disk)
        .input("dvdrw", params.dvdrw)
        .input("ms_office", params.ms_office)
        .execute("api_itsm_cmdb_create");

    return res;
}

// done
async function update(id, params) {
    await getCMDB(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .input("full_name", params.full_name)
        .input("department_id", params.department_id)
        .input("device_type", params.device_type)
        .input("windows_version", params.windows_version)
        .input("hostname", params.hostname)
        .input("microsoft_office", params.microsoft_office)
        .input("antivirus", params.antivirus)
        .input("ip_address", params.ip_address)
        .input("erp_system", params.erp_system)
        .input("sql_account", params.sql_account)
        .input("processor", params.processor)
        .input("motherboard", params.motherboard)
        .input("ram", params.ram)
        .input("monitor_led", params.monitor_led)
        .input("keyboard", params.keyboard)
        .input("mouse", params.mouse)
        .input("hard_disk", params.hard_disk)
        .input("dvdrw", params.dvdrw)
        .input("ms_office", params.ms_office)
        .execute("api_itsm_cmdb_update");

    return res.recordset[0];
}

// done
async function _delete(id) {
    await getCMDB(id);

    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_cmdb_delete_by_id");

    return res;
}

// done
async function getCMDB(id) {
    const conn = await db.getConnection();
    const res = await conn.request()
        .input("id", id)
        .execute("api_itsm_cmdb_get_by_id");

    if (res.recordset.length == 0) throw 'CMDB not found';    

    var cmdbs = new Array();
    
    for (var i = 0; i < res.recordset.length; i++) {

        var id = res.recordset[i].id;
        var full_name = res.recordset[i].full_name;        
        var department_id = res.recordset[i].department_id;        
        var device_type = res.recordset[i].device_type;        
        var windows_version = res.recordset[i].windows_version;        
        var hostname = res.recordset[i].hostname;        
        var microsoft_office = res.recordset[i].microsoft_office;        
        var antivirus = res.recordset[i].antivirus;        
        var ip_address = res.recordset[i].ip_address;        
        var erp_system = res.recordset[i].erp_system;        
        var sql_account = res.recordset[i].sql_account;        
        var processor = res.recordset[i].processor;        
        var motherboard = res.recordset[i].motherboard;        
        var ram = res.recordset[i].ram;        
        var monitor_led = res.recordset[i].monitor_led;        
        var keyboard = res.recordset[i].keyboard;        
        var mouse = res.recordset[i].mouse;        
        var hard_disk = res.recordset[i].hard_disk;        
        var dvdrw = res.recordset[i].dvdrw;        
        var ms_office = res.recordset[i].ms_office;       

        cmdbs.push({
            'id': id, 
            'full_name': full_name,
            'department_id': department_id,
            'device_type': device_type,
            'windows_version': windows_version,
            'hostname': hostname,
            'microsoft_office': microsoft_office,
            'antivirus': antivirus,
            'ip_address': ip_address,
            'erp_system': erp_system,
            'sql_account': sql_account,
            'processor': processor,
            'motherboard': motherboard,
            'ram': ram,
            'monitor_led': monitor_led,
            'keyboard': keyboard,
            'mouse': mouse,
            'hard_disk': hard_disk,
            'dvdrw': dvdrw,
            'ms_office': ms_office
        });
    }
    
    return cmdbs;   
}

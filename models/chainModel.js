const db = require("../config/db");

const getAllChains = (callback) => {

    const sql = `
        SELECT
            c.chain_id,
            c.company_name,
            c.gstn_number,
            g.group_name,
            c.is_active
        FROM chains c
        JOIN user_groups g
        ON c.group_id = g.group_id
        WHERE c.is_active = 1
    `;

    db.query(sql, callback);

};

const getGroups = (callback) => {

    const sql = `
        SELECT *
        FROM user_groups
        WHERE is_active = 1
    `;

    db.query(sql, callback);

};

const addChain = (data, callback) => {

    const sql = `
        INSERT INTO chains
        (company_name, gstn_number, group_id)
        VALUES (?, ?, ?)
    `;

    db.query(sql,
        [
            data.company_name,
            data.gstn_number,
            data.group_id
        ],
        callback
    );

};

const checkGSTNExists = (gstn_number, callback) => {

    const sql = `
        SELECT *
        FROM chains
        WHERE gstn_number = ?
    `;

    db.query(sql, [gstn_number], callback);

};

const getChainById = (id, callback) => {

    const sql = `
        SELECT *
        FROM chains
        WHERE chain_id = ?
    `;

    db.query(sql, [id], callback);

};
const updateChain = (id, data, callback) => {

    const sql = `
        UPDATE chains
        SET
            company_name = ?,
            gstn_number = ?,
            group_id = ?
        WHERE chain_id = ?
    `;

    db.query(
        sql,
        [
            data.company_name,
            data.gstn_number,
            data.group_id,
            id
        ],
        callback
    );

};

const softDeleteChain = (id, callback) => {

    const sql = `
        UPDATE chains
        SET is_active = 0
        WHERE chain_id = ?
    `;

    db.query(sql, [id], callback);

};
const getDashboardCounts = (callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalChains,
            SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS activeChains,
            SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactiveChains
        FROM chains
    `;

    db.query(sql, callback);

};

const searchChains = (keyword, callback) => {

    const sql = `
        SELECT
            c.chain_id,
            c.company_name,
            c.gstn_number,
            g.group_name
        FROM chains c
        JOIN user_groups g
        ON c.group_id = g.group_id
        WHERE c.company_name LIKE ?
        AND c.is_active = 1
    `;

    db.query(sql, [`%${keyword}%`], callback);

};

const filterByGroup = (groupId, callback) => {

    const sql = `
        SELECT
            c.chain_id,
            c.company_name,
            c.gstn_number,
            g.group_name
        FROM chains c
        JOIN user_groups g
        ON c.group_id = g.group_id
        WHERE c.group_id = ?
        AND c.is_active = 1
    `;

    db.query(sql, [groupId], callback);

};
module.exports = {
    getAllChains,
    getGroups,
    addChain,
    checkGSTNExists,
    getChainById,
    updateChain,
     softDeleteChain,
     getDashboardCounts,
     searchChains,
     filterByGroup
};
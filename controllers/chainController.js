const chainModel = require("../models/chainModel");

const dashboard = (req, res) => {

    chainModel.getDashboardCounts((err, countResult) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        chainModel.getAllChains((err, chainResult) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            chainModel.getGroups((err, groupResult) => {

                if (err) {
                    console.log(err);
                    return res.send("Database Error");
                }

                res.render("dashboard", {
                    chains: chainResult,
                    counts: countResult[0],
                    groups: groupResult
                });

            });

        });

    });

};

const showAddForm = (req, res) => {

    chainModel.getGroups((err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.render("addChain", {
            groups: results
        });

    });

};

const addChain = (req, res) => {

    const { company_name, gstn_number, group_id } = req.body;

    // Validation
    if (!company_name || !gstn_number || !group_id) {
        return res.send("All fields are required.");
    }
    console.log("Checking GSTN:", gstn_number);
    // Check duplicate GSTN
    chainModel.checkGSTNExists(gstn_number, (err, results) => {
        console.log("Results:", results);


        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (results.length > 0) {
            return res.send("GSTN Number already exists.");
        }

        const data = {
            company_name,
            gstn_number,
            group_id
        };

        chainModel.addChain(data, (err) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.redirect("/");

        });

    });

};

const showEditForm = (req, res) => {

    const id = req.params.id;

    chainModel.getChainById(id, (err, chainResult) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (chainResult.length === 0) {
            return res.send("Chain not found");
        }

        chainModel.getGroups((err, groupResult) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("editChain", {
                chain: chainResult[0],
                groups: groupResult
            });

        });

    });

};

const updateChain = (req, res) => {

    const id = req.params.id;

    const data = {
        company_name: req.body.company_name,
        gstn_number: req.body.gstn_number,
        group_id: req.body.group_id
    };

    chainModel.updateChain(id, data, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/");

    });

};

const deleteChain = (req, res) => {

    const id = req.params.id;

    chainModel.softDeleteChain(id, (err) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        res.redirect("/");

    });

};

const searchChain = (req, res) => {

    const keyword = req.query.keyword;

    chainModel.searchChains(keyword, (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        chainModel.getDashboardCounts((err, countResult) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            chainModel.getGroups((err, groupResult) => {

                if (err) {
                    console.log(err);
                    return res.send("Database Error");
                }

                res.render("dashboard", {
                    chains: result,
                    counts: countResult[0],
                    groups: groupResult
                });

            });

        });

    });

};

const filterChains = (req, res) => {

    const groupId = req.query.group_id;

    chainModel.filterByGroup(groupId, (err, chainResult) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        chainModel.getDashboardCounts((err, countResult) => {

            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            chainModel.getGroups((err, groupResult) => {

                if (err) {
                    console.log(err);
                    return res.send("Database Error");
                }

                res.render("dashboard", {
                    chains: chainResult,
                    counts: countResult[0],
                    groups: groupResult
                });

            });

        });

    });

};
console.log("deleteChain =", deleteChain);
module.exports = {
    dashboard,
    showAddForm,
    addChain,
    showEditForm,
    updateChain,
     deleteChain,
     searchChain,
     filterChains
};
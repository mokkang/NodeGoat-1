/* The BenefitsDAO must be constructed with a connected database object */
function BenefitsDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof BenefitsDAO)) {
        console.log("Warning: BenefitsDAO constructor called without 'new' operator");
        return new BenefitsDAO(db);
    }

    var usersCollection = db.collection("users");

    this.getAllNonAdminUsers = function(callback) {
        usersCollection.find({
            "isAdmin": {
                $ne: true
            }
        }).toArray(function(err, users) {
            callback(null, users);
        });
    };

    this.updateBenefits = function(userId, startDate, callback) {

        usersCollection.update({
            userId: userId
        }, {
            $set: {
                benefitStartDate: startDate
            }
        }, function(err, result) {

            if (!err) {
                console.log("Updated benefits");
                return callback(null, result);
            }

            return callback(err, null);
        });
    };
}

module.exports.BenefitsDAO = BenefitsDAO;
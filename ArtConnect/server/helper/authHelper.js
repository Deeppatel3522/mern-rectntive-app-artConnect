const bcrypt = require("bcrypt");

// HASH function
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        });
    });
}

// COMPARE || DECRYPT function
exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}
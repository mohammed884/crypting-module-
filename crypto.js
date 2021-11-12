const crypto = require('crypto');
class Crypto {
    constructor(key) {
        this.key = key.substr(0, 32);
        this.iv = crypto.randomBytes(16);
    }
    encrypt(value) {
        const encrypt = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let result = encrypt.update(value, 'utf-8', 'hex');
        result += encrypt.final('hex')
        return result;
    }
    decrypt(hash) {
        const decrypted = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
        let result = decrypted.update(hash, 'hex', 'utf-8');
        result += decrypted.final('utf-8');
        return result
    }
    compare(value, hash) {
        const decrypted = this.decrypt(hash);
        if (value === decrypted) return true 
        else return false
    }
    
}
module.exports = Crypto

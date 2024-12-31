const crypto = require('crypto');

// 生成 64 字節的隨機密鑰
const secret = crypto.randomBytes(64).toString('hex');

console.log('Generated JWT_SECRET:');
console.log(secret);
console.log('\nCopy this value to your .env file:');
console.log(`JWT_SECRET=${secret}`);

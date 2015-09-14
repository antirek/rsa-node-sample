var NodeRSA = require('node-rsa');

var text = 'Hello RSA!';

var keyString = "-----BEGIN PRIVATE KEY----- \
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAha/YcvcErWbXdEbs \
ZTaHDcMoKv+BsL5nWKCcjsoQZ6gwYyH+BOHI3ebAfT1hmr7qTFLvILkLx6MJrDVT \
r/7ewwIDAQABAkAsKtCECwBMmbGNBPGM7trnvRZEPm4GiqFyMn4G3tNUq0ikpVDh \
0F5zzZ9nGEocwxPpYlj7cdnzBubElv4sLW6hAiEA+dW530+qNOaoEnj8QzDrfnGt \
VpV1ZTiGyJZRp7cXIX8CIQCI/GGrgtWtXENS67ZwmN5ux+RTkZ2KB9c7Ulti6d7c \
vQIhAKtNKE09ym7LWKKR4iYP/OiN+VRM1lm5EHGo4AQnPezxAiBVJhQMCVKK5RvQ \
EkagLNWupL/vlkcHwqHt9N5rWJY4PQIgMud8O5sgn78G74g9kqgChYnp9gurQwbS \
f0gXJ1B92uQ= \
-----END PRIVATE KEY-----";

var key = new NodeRSA(keyString);


var encrypted = key.encryptPrivate(text, 'base64');
console.log('encrypted: ', encrypted);

var privateKey = key.exportKey('pkcs8');
console.log('privateKey:', privateKey);

var publicKey = key.exportKey('pkcs8-public');
console.log('publicKey:', publicKey);


var publicString = "-----BEGIN PUBLIC KEY-----\n" +
'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIWv2HL3BK1m13RG7GU2hw3DKCr/gbC+\n' +
'Z1ignI7KEGeoMGMh/gThyN3mwH09YZq+6kxS7yC5C8ejCaw1U6/+3sMCAwEAAQ==\n' + 
'-----END PUBLIC KEY-----';

var key2 = new NodeRSA();
key2.importKey(publicString, 'pkcs8-public');

var sign = key.sign(text, 'base64');
console.log('sign:', sign);

var decrypted = key2.decryptPublic(encrypted, 'utf8');
console.log('decrypted: ', decrypted);

var verify = key2.verify(decrypted, sign, '', 'base64');
console.log('verify', verify);

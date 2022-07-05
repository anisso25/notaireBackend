const crypto = require('crypto')
const algorithm = 'aes-256-cbc';
const key       = process.env.KEY_CRYPT;

module.exports.dArabicDates = (date) => {
	date = date.split('-');
	if (date.length != 0) {
		const { nArabicWords } = require('./nArabicWords'),
			{ arabicMonths } = require('../utils/globalValues.utils'),
			day = date[2] == '01' ? 'أول' : nArabicWords(date[2]),
			month = arabicMonths[date[1]],
			year = nArabicWords(date[0], { AG: 'on' });
		return day + ' ' + month + ' سنة ' + year;
	}
	return null;
};

module.exports.sendMail = (data) => {
  const mailgun = require("mailgun-js");
  return mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST
  }).messages().send(data);
}

module.exports.generateChars = (size) => {
  return crypto.randomBytes(size).toString('hex');
}

module.exports.encrypt = (plain) => {
  const iv = crypto.randomBytes(16)
  , aes = crypto.createCipheriv(algorithm, key, iv);
  let ciphertext = aes.update(plain);
  ciphertext = Buffer.concat([iv, ciphertext, aes.final()]);
  return ciphertext.toString('base64');
}

module.exports.decrypt = (cipher) => {
  const ciphertextBytes = Buffer.from(cipher, 'base64')
  , iv = ciphertextBytes.slice(0, 16)
  , data = ciphertextBytes.slice(16)
  , aes = crypto.createDecipheriv(algorithm, key, iv);
  let plaintextBytes = Buffer.from(aes.update(data));
  plaintextBytes = Buffer.concat([plaintextBytes, aes.final()]);
  return plaintextBytes.toString();
}

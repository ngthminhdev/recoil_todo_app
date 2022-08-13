const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'manga-dev',
    api_key: '396194293235678',
    api_secret: 'oZJ0PAiUSuk8rCnAbP8vRZrOsc0',
    secure: true
});

module.exports = { cloudinary };

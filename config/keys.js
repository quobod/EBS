const usr = process.env.M_DB_USR;
const pwd = process.env.M_DB_PWD;
const path = process.env.M_DB_PATH;

module.exports = {
    mongoURI: `mongodb://${usr}:${pwd}@ds121089.mlab.com:21089/storybooks-dev`,
    googleClientID: '495945587274-5n9brubufevru1evp65dl8ee3g6tlquc.apps.googleusercontent.com',
    googleClientSecret: 'Y_SXEDP7toKjkAn30h52VG0c'
}
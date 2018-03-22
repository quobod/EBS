const usr = process.env.M_DB_USR;
const pwd = process.env.M_DB_PWD;
const path = process.env.M_DB_PATH;
const log = (arg = '') => console.log(arg);

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: `mongodb://${usr}:${pwd}@ds121089.mlab.com:21089/storybooks-dev`
    }
} else {
    log(`\n\n\t\t\tNot in Production Mode\n\n\n`);
    module.exports = {
        mongoURI: `mongodb://${usr}:${pwd}@ds121089.mlab.com:21089/storybooks-dev`
    }
}
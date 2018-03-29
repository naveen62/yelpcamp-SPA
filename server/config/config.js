let env = process.env.NODE_ENV || 'development';

if(env == 'development') {
    process.env.DATABASEURL = 'mongodb://127.0.0.1/yelpcamp';
}
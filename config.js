let config = {

    dev: {
        database: {
            host: 'localhost',
            port: '3001',
            user: 'root',
            password: 'controle',
            db: 'personal_site_blog'
        }
    },
    production: {
        database: {
            host: '52.8.197.89',
            port: '3000',
            user: 'root',
            password: 'controle',
            db: 'personal_site_blog',
        }
    },
}

module.exports = config; 
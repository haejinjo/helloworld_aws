let config = {

    dev: {
        database: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'controle',
            db: 'personal_site_blog'
        },
        server: {
            host: 'localhost',
            port: '3001',
        }
    },
    production: {
        database: {
            host: 'portfolio-blog-posts.ctbfs0ayjwqq.us-west-1.rds.amazonaws.com',
            port: '3306',
            user: 'haejinjo',
            password: 'controle',
            db: 'portfolio_posts',
        },
        server: {
            host: '52.8.197.89',
            port: '3000',
        }

    },
}

module.exports = config; 
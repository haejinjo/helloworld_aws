let config = {

    dev: {
        database: {
            host: 'portfolio-blog-posts.ctbfs0ayjwqq.us-west-1.rds.amazonaws.com',
            port: '3306',
            user: 'haejinjo',
            password: 'controle',
            db: 'portfolio_posts'
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
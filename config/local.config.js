import path from 'path';
let config = {
    web_end_point: "http://192.168.168.94",
    api_end_point: "http://192.168.168.94:8000",
    mongo: {
        database_name: "profile",
        host: "ds239206.mlab.com",
        port: "39206",
        username: "raja",
        password: "raja123"
    },
    logs: {
        path: path.join(__dirname, '../logs'),
        file_name: 'development.ServiceApp.logs'
    },
    media: {
        local_file_path: "./images/",
        use_S3: "false"
    },
    smtp:{
        host:'smtp.googlemail.com',
        port:465,
        email:'abs.rajaabinesh@gmail.com',
        password:'raja100xxx'
    }
};

export default config;

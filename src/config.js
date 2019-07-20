module.exports = {
    download_path: `${__dirname}/../downloads/`,
    base_path: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 8080}`
}
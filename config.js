const config = {
  dbUrl : process.env.DB_URL || 'mongodb+srv://db_user_mauricio:rUtFODyFysLf74re@cluster0-vjvyo.mongodb.net/test?retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app' ,
  algo: "algo",
  filesRoute: process.env.FILES_ROUTE || 'files'
}

module.exports = config
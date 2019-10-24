let mongodbURL = "mongodb://localhost:27017/movieX";

if (process.env.NODE_ENV === "development") {
  mongodbURL = "mongodb://localhost:27017/movieX";
}
if (process.env.NODE_ENV === "production") {
  mongodbURL = `mongodb+srv://hale:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0-5wiwj.mongodb.net/test?retryWrites=true&w=majority`;
}

module.exports = mongodbURL;

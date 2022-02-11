

//create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String
});

const Photo = mongoose.model('Photo', PhotoSchema);



//create a photo
// Photo.create({
//   title: 'Photo Title 2',
//   description: 'Photo Description 2',
// });

//read a photo
// Photo.find({}, (err, data) => {
//     console.log(data);
// });

//update a photo
const id = "614c37d9d1b59c4ae367b177";

Photo.findByIdAndUpdate(
    id, {
        title: "Photo Title 1111 Updated",
        description: "Description Updated 111",
        image: "image Updated 111"
    },
    {
        new: true
    },
    (err, data) => {
        console.log(data);
    }
)




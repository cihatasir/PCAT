const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;                        
  const photosPerPage = 3;                                 
  const totalPhotos = await Photo.find().countDocuments(); 

  const photos = await Photo.find({})                        
  .sort('-dateCreated')                                    
  .skip((page-1) * photosPerPage)                          
  .limit(photosPerPage)                                    


  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage)
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
}

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id});
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();

  res.redirect(`/photos/${req.params.id}`);
}

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({__id: req.params.id});
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage); 
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
}

exports.createPhoto = async (req, res) => {
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
}

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "muLa/photos",
      tags: "photos",
    });

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeleteImg = async (public_id) => {
  try {
    var imagePath = "muLa/photos/" + public_id;

    console.log(imagePath);
    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };

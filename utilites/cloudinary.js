const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "shiponislam",
  api_key: "487628687323619",
  api_secret: "ddbTb1vklMQHmzDDMGUDC4zme8g",
});

const cloudUpload = async (file, path) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      resource_type: "image",
      folder: path,
      unique_filename: false,
      use_filename: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const cloudRemove = async (file, path) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(file, {
      invalidate: true,
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  cloudUpload,
  cloudRemove,
};

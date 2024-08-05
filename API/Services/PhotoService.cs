using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var cloudinarySettings = config?.Value ?? throw new ArgumentNullException(nameof(config));
            var acc = new Account(cloudinarySettings.CloudName, cloudinarySettings.ApiKey, cloudinarySettings.ApiSecret);
            _cloudinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            if (file == null) throw new ArgumentNullException(nameof(file));
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                try
                {
                    using var stream = file.OpenReadStream();
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation()
                            .Height(500).Width(500).Crop("fill").Gravity("face"),
                        Folder = "social"
                    };
                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
                catch (Exception ex)
                {
                    throw new Exception("Photo upload failed", ex);
                }
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            if (string.IsNullOrEmpty(publicId)) throw new ArgumentNullException(nameof(publicId));

            var deleteParams = new DeletionParams(publicId);

            try
            {
                return await _cloudinary.DestroyAsync(deleteParams);
            }
            catch (Exception ex)
            {
                throw new Exception("Photo deletion failed", ex);
            }
        }
    }
}

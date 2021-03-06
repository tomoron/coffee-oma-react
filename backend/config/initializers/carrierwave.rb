require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

if Rails.env.production?
  CarrierWave.configure do |config|
    config.storage :fog
    config.fog_directory = 'coffee-oma-image-bucket'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_S3_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_S3_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1',
      path_style: true
    }
  end
else
  CarrierWave.configure do |config|
    config.asset_host = 'http://localhost:3001'
    config.storage = :file
    config.cache_storage = :file
  end
end

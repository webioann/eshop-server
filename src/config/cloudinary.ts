import { v2 as cloudinary } from 'cloudinary';
import config from './env.ts';

cloudinary.config({ 
    cloud_name: config.CLOUD_NAME, 
    api_key: config.CLOUD_API_KEY, 
    api_secret: config.CLOUD_SECRET
});

export default cloudinary;
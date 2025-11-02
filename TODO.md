# TODO: Fix Image Deployment Issues

## 1. Set up Cloudinary Integration
- [ ] Install Cloudinary SDK in backend
- [ ] Add Cloudinary config in server.js
- [ ] Create upload endpoint for images to Cloudinary
- [ ] Update image creation to use Cloudinary URLs

## 2. Update Frontend Upload Logic
- [ ] Modify Dashboard.tsx to upload files to new endpoint instead of base64
- [ ] Update API client to handle file uploads
- [ ] Test image upload functionality

## 3. Fix Database Consistency
- [ ] Ensure MongoDB URI is consistent across environments
- [ ] Update seed.js with Cloudinary URLs for demo images
- [ ] Run seed script on production database

## 4. Update CORS for Netlify Deployment
- [ ] Update server.js CORS settings for Netlify domain
- [ ] Test API endpoints from deployed frontend

## 5. Testing
- [ ] Test image upload and display locally
- [ ] Deploy to Netlify and test cross-device functionality
- [ ] Verify all image-related features work

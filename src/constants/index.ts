export const fetchImageApi = (imageId: string) => {
  return `https://devapi.cuccu.vn/file.api/files/image/large/${imageId}`;
};
export const fetchVideoApi = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};
export const uploadImageUrl =
  'https://devapi.cuccu.vn/file.api/files/suploadbase64';

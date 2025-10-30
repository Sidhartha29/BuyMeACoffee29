import React, { useEffect, useState, useCallback } from 'react';
import { Search, Filter, Coffee } from 'lucide-react';
import { api, Image, Profile } from '../lib/api';

interface ExploreProps {
  onNavigate: (page: string) => void;
}

const categories = ['All', 'Nature', 'Architecture', 'Portrait', 'Abstract', 'Street', 'Wildlife', 'Landscape'];

export const Explore: React.FC<ExploreProps> = ({ onNavigate }) => {
  const [images, setImages] = useState<(Image & { profiles: Profile })[]>([]);
  const [filteredImages, setFilteredImages] = useState<(Image & { profiles: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await api.getImages();
      setImages(data as (Image & { profiles: Profile })[]);
      setFilteredImages(data as (Image & { profiles: Profile })[]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterImages = useCallback(() => {
    let filtered = images;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (img) => img.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.profiles?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [images, searchTerm, selectedCategory]);

  useEffect(() => {
    filterImages();
  }, [filterImages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Images</h1>
          <p className="text-xl text-gray-600">
            Discover amazing artwork from creators around the world
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search images or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-amber-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredImages.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'} found
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => onNavigate(`profile/${image.creator_id}`)}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={image.thumbnail_url.startsWith('data:') ? image.thumbnail_url : image.thumbnail_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center space-x-2">
                      <Coffee className="w-4 h-4 text-amber-500" />
                      <span className="truncate">{image.profiles?.name}</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-black">₹{image.price}</span>
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Coffee className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No images found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

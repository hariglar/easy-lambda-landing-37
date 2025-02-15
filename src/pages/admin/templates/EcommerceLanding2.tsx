
import { TemplateContent } from "../types/editor";
import { EditableText } from "../components/editor/EditableText";
import { ImageEditor } from "../components/editor/ImageEditor";
import { Star } from "lucide-react";

interface EcommerceLanding2Props {
  content: TemplateContent;
  onContentChange: (section: keyof TemplateContent, value: any, index?: number, field?: string) => void;
  isEditing: boolean;
}

export default function EcommerceLanding2({ content, onContentChange, isEditing }: EcommerceLanding2Props) {
  const { hero, features, products } = content;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <nav className="flex items-center space-x-6">
            <EditableText
              value="RadEl"
              onChange={(value) => onContentChange('hero', { ...hero, title: value })}
              className="text-xl font-semibold"
              identifier="hero.brandName"
              isEditing={isEditing}
            />
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Shop</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pages</a>
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <span className="sr-only">Search</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <span className="sr-only">Cart</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-2">Product Details</h1>
            <div className="text-gray-600">
              <span>Home</span>
              <span className="mx-2">/</span>
              <span>Shop</span>
              <span className="mx-2">/</span>
              <span>Product Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <ImageEditor
              src={products[0].image}
              alt={products[0].name}
              className="w-full aspect-square object-cover rounded-lg"
              onImageChange={(newSrc) => onContentChange('products', { ...products[0], image: newSrc }, 0, 'image')}
              isEditing={isEditing}
            />
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square">
                  <img 
                    src={products[0].image} 
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <EditableText
              value={products[0].name}
              onChange={(value) => onContentChange('products', { ...products[0], name: value }, 0, 'name')}
              className="text-3xl font-serif"
              identifier="products.0.name"
              isEditing={isEditing}
            />
            <EditableText
              value="Celebrate this precious moment with our Golden Brillow Charm Bracelet, a splendid accessory embellished with delightful symbols of happiness and affluence."
              onChange={(value) => onContentChange('products', { ...products[0], description: value }, 0, 'description')}
              className="text-gray-600"
              identifier="products.0.description"
              isEditing={isEditing}
            />
            <button className="bg-[#B8860B] text-white px-6 py-2 rounded hover:bg-[#9A7209] transition-colors">
              Shop Now
            </button>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Price :</span>
                <EditableText
                  value={products[0].price}
                  onChange={(value) => onContentChange('products', { ...products[0], price: value }, 0, 'price')}
                  className="font-medium"
                  identifier="products.0.price"
                  isEditing={isEditing}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Product Number :</span>
                <span>3675-9613-4829</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Category :</span>
                <span>Ring</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tags :</span>
                <span>Bracelet, Accessories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-4 gap-8 my-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#B8860B]" />
                </div>
              </div>
              <EditableText
                value={feature.title}
                onChange={(value) => onContentChange('features', { ...feature, title: value }, index, 'title')}
                className="font-medium"
                identifier={`features.${index}.title`}
                isEditing={isEditing}
              />
              <EditableText
                value={feature.description}
                onChange={(value) => onContentChange('features', { ...feature, description: value }, index, 'description')}
                className="text-sm text-gray-600"
                identifier={`features.${index}.description`}
                isEditing={isEditing}
              />
            </div>
          ))}
        </div>

        {/* Related Products */}
        <div className="space-y-8">
          <h2 className="text-2xl font-serif">Related Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {products.slice(1).map((product, index) => (
              <div key={index} className="space-y-2">
                <ImageEditor
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-lg"
                  onImageChange={(newSrc) => onContentChange('products', { ...product, image: newSrc }, index + 1, 'image')}
                  isEditing={isEditing}
                />
                <EditableText
                  value={product.name}
                  onChange={(value) => onContentChange('products', { ...product, name: value }, index + 1, 'name')}
                  className="font-medium"
                  identifier={`products.${index + 1}.name`}
                  isEditing={isEditing}
                />
                <EditableText
                  value={product.price}
                  onChange={(value) => onContentChange('products', { ...product, price: value }, index + 1, 'price')}
                  className="text-gray-600"
                  identifier={`products.${index + 1}.price`}
                  isEditing={isEditing}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium mb-4">Where about</h3>
            <address className="text-sm text-gray-600 not-italic">
              4517 Washington Ave. Manchester,<br />
              Kentucky 39495
            </address>
          </div>
          <div>
            <h3 className="font-medium mb-4">Pages</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About us</a></li>
              <li><a href="#" className="hover:text-gray-900">Categories</a></li>
              <li><a href="#" className="hover:text-gray-900">Shop</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Resource</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Style Guide</a></li>
              <li><a href="#" className="hover:text-gray-900">Error 404</a></li>
              <li><a href="#" className="hover:text-gray-900">Licensing</a></li>
              <li><a href="#" className="hover:text-gray-900">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Subscribe</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md"
              />
              <button className="w-full bg-[#B8860B] text-white px-4 py-2 rounded hover:bg-[#9A7209] transition-colors">
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

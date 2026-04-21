const ProductListing = () => {
  return (
    <div className="container section flex flex-col lg:flex-row gap-10">
      {/* Sidebar / Filters */}
      <aside className="hidden lg:block w-[240px] shrink-0">
        <div className="mb-10">
          <h4 className="text-sm font-semibold mb-4 tracking-[0.5px] uppercase">Category</h4>
          <ul className="list-none">
            <li className="mb-2.5 text-sm text-text-primary font-medium cursor-pointer">All Products</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">Apparel</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">Accessories</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">Home</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">Objects</li>
          </ul>
        </div>

        <div className="mb-10">
          <h4 className="text-sm font-semibold mb-4 tracking-[0.5px] uppercase">Price Range</h4>
          <ul className="list-none">
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">$0 - $50</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">$50 - $100</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">$100 - $200</li>
            <li className="mb-2.5 text-sm text-text-secondary cursor-pointer hover:text-text-primary">$200+</li>
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">All Products</h2>
          <div className="text-sm text-text-secondary flex items-center gap-2">
            <span>Sort by:</span>
            <select className="border-none text-sm text-text-primary font-medium cursor-pointer outline-none bg-transparent">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
          {/* Repeating products for demo */}
          <ProductCard title="Essential Cotton Tee" price="$35.00" category="Apparel" />
          <ProductCard title="Minimalist Leather Standard" price="$120.00" category="Accessories" />
          <ProductCard title="Ceramic Coffee Set" price="$85.00" category="Home" />
          <ProductCard title="Everyday Canvas Tote" price="$45.00" category="Bags" />
          <ProductCard title="Linen Trousers" price="$88.00" category="Apparel" />
          <ProductCard title="Desk Organizer" price="$40.00" category="Objects" />
          <ProductCard title="Travel Mug" price="$25.00" category="Home" />
          <ProductCard title="Wool Scarf" price="$65.00" category="Accessories" />
          <ProductCard title="Notebook Set" price="$18.00" category="Objects" />
        </div>

        <div className="flex justify-center gap-4 mt-[60px]">
          <button className="text-sm font-medium text-accent">1</button>
          <button className="text-sm font-medium text-text-secondary">2</button>
          <button className="text-sm font-medium text-text-secondary">3</button>
          <button className="text-sm font-medium text-text-secondary">Next</button>
        </div>
      </main>
    </div>
  );
};

export default ProductListing;

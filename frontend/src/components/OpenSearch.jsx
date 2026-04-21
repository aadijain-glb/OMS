import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import products  from "../data/product";
export default function SearchOverlay() {
  
const [open, setOpen] = useState(false);
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

const handleSearch = (e) => {
  setQuery(e.target.value);
};

useEffect(() => {
   if (!query.trim()) {
    setResults([]);
    return;
  }
  const filtered = products.filter(p =>
    p.title?.toLowerCase().includes(query.toLowerCase())
  );
  setResults(filtered);
}, [query]);

  return (
    <>
      {/* Search Icon */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center"
      >
        <Search size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 flex justify-center pt-20"
        >
          {/* Search Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[640px] bg-white rounded-xl p-6 shadow-xl absolute top-24 right-16 z-50"
          >
            <input
              autoFocus
              type="text"
              placeholder="Search for products..."
              className="w-full border px-4 py-3 rounded-md outline-none"
              value={query}
              onChange={handleSearch}
            />

            <div className="mt-4">
              {results.length > 0 ? (
                results.map((p) => (
                  <div className="flex gap-2">
                  <img src={p.image} alt="" className="w-10 h-10" />
                  <p>{p.title}</p>
                  </div>
                ))
              ) : query ? (
                <p className="text-sm text-gray-500">No results found</p>
              ) : null}
            </div>


            {/* Popular Choices */}
            <div className="mt-5">
              <p className="text-sm font-semibold mb-2">Popular Choices</p>
              <div className="flex gap-2">
                <button className="border px-3 py-1 rounded-md text-sm">
                  Hair Repair Range →
                </button>
                <button className="border px-3 py-1 rounded-md text-sm">
                  Skin →
                </button>
              </div>
            </div>

            {/* Recommended */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">Recommended For You</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 h-32 rounded-md" />
                <div className="bg-gray-100 h-32 rounded-md" />
                <div className="bg-gray-100 h-32 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
const AllcategorySidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-fit sticky top-30">
      <h2 onClick={() => navigate('/categories')} className="text-xl md:text-2xl font-medium mb-6">
        All Products
      </h2>

      <ul className="flex flex-col gap-4 text-sm">
        <li onClick={() => navigate('/categories/apparel')} className="text-text-secondary hover:text-text-primary cursor-pointer transition">
          Apparel
        </li>

        <li onClick={() => navigate('/categories/accessories')} className="text-text-secondary hover:text-text-primary cursor-pointer transition">
          Accessories
        </li>

        <li onClick={() => navigate('/categories/bags')} className="text-text-secondary hover:text-text-primary cursor-pointer transition">
          Bags
        </li>

        <li onClick={() => navigate('/categories/home')} className="text-text-secondary hover:text-text-primary cursor-pointer transition">
          Home
        </li>
      </ul>
    </div>
  )
}

export default AllcategorySidebar
import React, { useEffect, useState } from 'react';
import { db } from './../../../configs';
import { cropCategories } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

function CategoryAdminPanel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Initially loading is true
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const result = await db.select().from(cropCategories);
    setCategories(result);
    setLoading(false);
  };

  const handlePriceChange = (index, newPrice) => {
    const updated = [...categories];
    updated[index].defaultPrice = newPrice;
    setCategories(updated);
  };

  const handleUpdate = async (id, price) => {
    setUpdating(true);
    try {
      await db.update(cropCategories)
        .set({ defaultPrice: price })
        .where(eq(cropCategories.id, id));
      toast.success('✅ Price Updated Successfully!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('❌ Failed to update price.');
    }
    setUpdating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-md p-6 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight  ">
          <span className="mr-2 text-center">📊</span> Crop Price Administration
        </h1>
        <p className="text-gray-600 mt-2">Manage and update crop prices efficiently.</p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-lg animate-pulse border border-gray-200"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))
          ) : (
            categories.map((cat, index) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {cat.categoryName}
                </h3>
                <Input
                  value={cat.defaultPrice || ''}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  className="w-full border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4 shadow-sm"
                  placeholder="Enter new price"
                />
                <Button
                  disabled={updating}
                  onClick={() => handleUpdate(cat.id, cat.defaultPrice)}
                  className={`w-full text-sm font-medium py-2.5 rounded-lg shadow-md transition-colors duration-200 ${
                    updating
                      ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                  }`}
                >
                  {updating ? 'Updating...' : 'Update Price'}
                </Button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default CategoryAdminPanel;
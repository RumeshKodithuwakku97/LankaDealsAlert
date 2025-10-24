import React, { useState } from 'react';
import { googleSheetsAPI } from '../../services/googleSheets';

const AddDealForm = ({ onDealAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    store: '',
    currentPrice: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: '',
    expiry: '',
    affiliateUrl: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await googleSheetsAPI.addDeal(formData);
      
      if (result.success) {
        alert('Deal added successfully!');
        setFormData({
          title: '',
          store: '',
          currentPrice: '',
          originalPrice: '',
          discount: '',
          image: '',
          category: '',
          expiry: '',
          affiliateUrl: ''
        });
        if (onDealAdded) onDealAdded();
      } else {
        alert('Error adding deal: ' + result.error);
      }
    } catch (error) {
      alert('Error adding deal: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-panel">
      <h3>Add New Deal</h3>
      <form onSubmit={handleSubmit} className="deal-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Deal Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="store"
            placeholder="Store Name"
            value={formData.store}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="currentPrice"
              placeholder="Current Price (Rs. 12,999)"
              value={formData.currentPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="originalPrice"
              placeholder="Original Price (Rs. 18,500)"
              value={formData.originalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="discount"
              placeholder="Discount (20% OFF)"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Living</option>
              <option value="grocery">Groceries</option>
              <option value="beauty">Beauty</option>
              <option value="digital">Digital Products</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="expiry"
              placeholder="Expiry (5 days left)"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="url"
            name="affiliateUrl"
            placeholder="Affiliate URL"
            value={formData.affiliateUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Adding Deal...' : 'Add Deal'}
        </button>
      </form>
    </div>
  );
};

export default AddDealForm;
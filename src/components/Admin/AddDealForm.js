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
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const result = await googleSheetsAPI.addDeal(formData);
      
      if (result.success) {
        setMessage('✅ Deal added successfully!');
        // Reset form
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
        setMessage(`❌ Error: ${result.error || 'Failed to add deal'}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
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
      
      {message && (
        <div className={`form-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="deal-form">
        <div className="form-group">
          <label>Deal Title *</label>
          <input
            type="text"
            name="title"
            placeholder="Samsung Galaxy S24 Ultra 5G"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Store Name *</label>
          <input
            type="text"
            name="store"
            placeholder="Daraz.lk"
            value={formData.store}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current Price *</label>
            <input
              type="text"
              name="currentPrice"
              placeholder="Rs. 287,500"
              value={formData.currentPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Original Price *</label>
            <input
              type="text"
              name="originalPrice"
              placeholder="Rs. 359,999"
              value={formData.originalPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Discount *</label>
            <input
              type="text"
              name="discount"
              placeholder="20% OFF"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image URL *</label>
          <input
            type="url"
            name="image"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
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
            <label>Expiry *</label>
            <input
              type="text"
              name="expiry"
              placeholder="5 days left"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Affiliate URL *</label>
          <input
            type="url"
            name="affiliateUrl"
            placeholder="https://daraz.lk/product-link"
            value={formData.affiliateUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="submit-btn"
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Adding Deal...
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i>
              Add Deal
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddDealForm;
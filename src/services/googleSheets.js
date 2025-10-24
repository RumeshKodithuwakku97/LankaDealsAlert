// Replace with your actual Google Apps Script URL
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbwl_JCXoyBHfIxa6YNHZmAeLPZhyaWpVQ7D-olGiZbWDYenFx8Cp5k9_aWVr_W8lUP9/exec';




// Import Firebase services for newsletter
import { firestoreService } from './firestoreService';

export const googleSheetsAPI = {
  // Get all deals from Google Sheets
  getDeals: async () => {
    try {
      console.log('🔗 Fetching deals from Google Sheets API...');
      console.log('📡 API URL:', API_BASE_URL);
      
      const response = await fetch(`${API_BASE_URL}?action=getDeals`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Google Sheets API Connected! Found', data.length, 'deals');
      return data;
    } catch (error) {
      console.error('❌ Google Sheets API Connection failed:', error);
      
      // Fallback to sample data
      console.log('🔄 Using sample data for now...');
      return getSampleDeals();
    }
  },

  // Add new deal to Google Sheets
  addDeal: async (dealData) => {
    try {
      console.log('📝 Adding new deal to Google Sheets:', dealData);
      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addDeal',
          data: dealData
        })
      });
      
      const result = await response.json();
      console.log('✅ Add deal result:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Error adding deal to Google Sheets:', error);
      return { 
        success: false, 
        error: 'Failed to connect to server. Please check your internet connection.' 
      };
    }
  },

  // Subscribe to newsletter - USING FIRESTORE
  subscribeNewsletter: async (email) => {
    try {
      console.log('📧 Subscribing email to Firestore:', email);
      
      // Use Firestore instead of Google Sheets for better performance
      const result = await firestoreService.subscribeToNewsletter(email);
      
      console.log('✅ Newsletter subscription result:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Error subscribing to newsletter:', error);
      return { 
        success: false, 
        error: 'Subscription failed. Please try again later.' 
      };
    }
  },

  // Get deals by category
  getDealsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}?action=getDealsByCategory&category=${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ ${category} deals fetched:`, data.length, 'deals found');
      return data;
    } catch (error) {
      console.error(`❌ Error fetching ${category} deals:`, error);
      // Return filtered sample data
      return getSampleDeals().filter(deal => 
        deal.category.toLowerCase() === category.toLowerCase()
      );
    }
  },

  // Get subscriber count from Firestore
  getSubscriberCount: async () => {
    try {
      const result = await firestoreService.getSubscriberCount();
      return result;
    } catch (error) {
      console.error('Error getting subscriber count:', error);
      return { success: false, error: 'Failed to get subscriber count' };
    }
  },

  // Get all subscribers from Firestore (for admin)
  getAllSubscribers: async () => {
    try {
      const result = await firestoreService.getAllSubscribers();
      return result;
    } catch (error) {
      console.error('Error getting subscribers:', error);
      return { success: false, error: 'Failed to get subscribers' };
    }
  }
};

// Sample data fallback
function getSampleDeals() {
  return [
    {
      id: 1,
      title: "Samsung Galaxy S24 Ultra 5G",
      store: "Daraz.lk",
      currentprice: "Rs. 287,500",
      originalprice: "Rs. 359,999",
      discount: "20% OFF",
      imageurl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3",
      category: "electronics",
      expiry: "5 days left",
      affiliateurl: "https://daraz.lk/",
      isactive: true
    },
    {
      id: 2,
      title: "Nike Air Max 270 - Limited Stock",
      store: "Kapruka.com",
      currentprice: "Rs. 12,999",
      originalprice: "Rs. 18,500",
      discount: "30% OFF",
      imageurl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3",
      category: "fashion",
      expiry: "3 days left",
      affiliateurl: "https://kapruka.com/",
      isactive: true
    },
    {
      id: 3,
      title: "Philips Air Fryer XXL",
      store: "MyShop.lk",
      currentprice: "Rs. 24,999",
      originalprice: "Rs. 34,999",
      discount: "29% OFF",
      imageurl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3",
      category: "home",
      expiry: "7 days left",
      affiliateurl: "https://myshop.lk/",
      isactive: true
    },
    {
      id: 4,
      title: "L'Oreal Skincare Bundle",
      store: "Arpico Super",
      currentprice: "Rs. 3,499",
      originalprice: "Rs. 5,200",
      discount: "33% OFF",
      imageurl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3",
      category: "beauty",
      expiry: "2 days left",
      affiliateurl: "https://arpico.com/",
      isactive: true
    },
    {
      id: 5,
      title: "Basmati Rice 5kg Bag",
      store: "Keells Super",
      currentprice: "Rs. 1,850",
      originalprice: "Rs. 2,400",
      discount: "23% OFF",
      imageurl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3",
      category: "grocery",
      expiry: "10 days left",
      affiliateurl: "https://keells.com/",
      isactive: true
    },
    {
      id: 6,
      title: "Sony WH-1000XM4 Headphones",
      store: "Daraz.lk",
      currentprice: "Rs. 49,999",
      originalprice: "Rs. 69,999",
      discount: "29% OFF",
      imageurl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3",
      category: "electronics",
      expiry: "6 days left",
      affiliateurl: "https://daraz.lk/",
      isactive: true
    }
  ];
}
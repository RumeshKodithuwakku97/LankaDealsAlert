// Replace with your actual Google Apps Script URL
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbwl_JCXoyBHfIxa6YNHZmAeLPZhyaWpVQ7D-olGiZbWDYenFx8Cp5k9_aWVr_W8lUP9/exec';


export const googleSheetsAPI = {
  getDeals: async () => {
    try {
      console.log('🔗 Fetching deals from Google Sheets...');
      
      const response = await fetch(`${API_BASE_URL}?action=getDeals`);
      
      console.log('📡 Response status:', response.status);
      
      const responseText = await response.text();
      console.log('📄 Raw response:', responseText);
      
      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        throw new Error('Invalid JSON response from API');
      }
      
      console.log('📊 Parsed data type:', typeof data);
      console.log('📊 Parsed data:', data);
      
      // ✅ Ensure we always return an array
      if (!Array.isArray(data)) {
        console.warn('⚠️ API did not return array, converting...', data);
        data = [data]; // Wrap in array if it's a single object
      }
      
      console.log('✅ Final deals array:', data);
      return data;
      
    } catch (error) {
      console.error('❌ API Error:', error);
      
      // Fallback to mock data
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
          affiliateurl: "https://daraz.lk/"
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
          affiliateurl: "https://kapruka.com/"
        }
      ];
    }
  },

  subscribeNewsletter: async (email) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          action: 'subscribeNewsletter',
          data: { email }
        })
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
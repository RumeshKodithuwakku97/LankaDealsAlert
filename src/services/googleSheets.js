


// Google Apps Script bridge - More secure approach
const SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwl_JCXoyBHfIxa6YNHZmAeLPZhyaWpVQ7D-olGiZbWDYenFx8Cp5k9_aWVr_W8lUP9/exec';

// Append data to sheet via Apps Script
export const appendToSheet = async (data) => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        action: 'append',
        values: data 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to append data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
};

// Read data from sheet via Apps Script
export const readFromSheet = async () => {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to read data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error reading from sheet:', error);
    throw error;
  }
};

// For testing - dummy data
export const getDummyData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        ['Email', 'Date'],
        ['test@example.com', new Date().toISOString()],
        ['user@gmail.com', new Date().toISOString()]
      ]);
    }, 500);
  });
};

export default {
  appendToSheet,
  readFromSheet,
  getDummyData
};
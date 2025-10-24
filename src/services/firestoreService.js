import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const firestoreService = {
  // Subscribe to newsletter
  subscribeToNewsletter: async (email) => {
    try {
      // Check if email already exists
      const subscribersRef = collection(db, 'newsletterSubscribers');
      const q = query(subscribersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return {
          success: false,
          error: 'This email is already subscribed to our newsletter.'
        };
      }

      // Add new subscriber
      const docRef = await addDoc(collection(db, 'newsletterSubscribers'), {
        email: email,
        subscribedAt: serverTimestamp(),
        status: 'active',
        source: 'website',
        language: 'en',
        lastNotificationSent: null,
        unsubscribeToken: generateUnsubscribeToken()
      });

      console.log('✅ Newsletter subscription saved to Firestore:', docRef.id);
      
      return {
        success: true,
        id: docRef.id,
        message: 'Successfully subscribed to newsletter!'
      };

    } catch (error) {
      console.error('❌ Error subscribing to newsletter:', error);
      return {
        success: false,
        error: 'Failed to subscribe. Please try again later.'
      };
    }
  },

  // Get all subscribers (for admin)
  getAllSubscribers: async () => {
    try {
      const subscribersRef = collection(db, 'newsletterSubscribers');
      const q = query(subscribersRef, orderBy('subscribedAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const subscribers = [];
      querySnapshot.forEach((doc) => {
        subscribers.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return {
        success: true,
        subscribers: subscribers
      };
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return {
        success: false,
        error: 'Failed to fetch subscribers'
      };
    }
  },

  // Get subscriber count
  getSubscriberCount: async () => {
    try {
      const subscribersRef = collection(db, 'newsletterSubscribers');
      const q = query(subscribersRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);

      return {
        success: true,
        count: querySnapshot.size
      };
    } catch (error) {
      console.error('Error getting subscriber count:', error);
      return {
        success: false,
        error: 'Failed to get subscriber count'
      };
    }
  },

  // Unsubscribe user
  unsubscribeFromNewsletter: async (email, token) => {
    try {
      const subscribersRef = collection(db, 'newsletterSubscribers');
      const q = query(
        subscribersRef, 
        where('email', '==', email),
        where('unsubscribeToken', '==', token)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          success: false,
          error: 'Subscription not found or already unsubscribed.'
        };
      }

      // Update status to unsubscribed
      const docRef = doc(db, 'newsletterSubscribers', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        status: 'unsubscribed',
        unsubscribedAt: serverTimestamp()
      });

      return {
        success: true,
        message: 'Successfully unsubscribed from newsletter.'
      };

    } catch (error) {
      console.error('Error unsubscribing:', error);
      return {
        success: false,
        error: 'Failed to unsubscribe. Please try again.'
      };
    }
  },

  // Update subscriber preferences
  updateSubscriberPreferences: async (email, preferences) => {
    try {
      const subscribersRef = collection(db, 'newsletterSubscribers');
      const q = query(subscribersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return {
          success: false,
          error: 'Subscriber not found.'
        };
      }

      const docRef = doc(db, 'newsletterSubscribers', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        ...preferences,
        updatedAt: serverTimestamp()
      });

      return {
        success: true,
        message: 'Preferences updated successfully.'
      };

    } catch (error) {
      console.error('Error updating preferences:', error);
      return {
        success: false,
        error: 'Failed to update preferences.'
      };
    }
  }
};

// Helper function to generate unsubscribe token
function generateUnsubscribeToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
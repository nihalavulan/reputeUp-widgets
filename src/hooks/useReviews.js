"use client"
import { useState, useEffect } from 'react';
import { reviewService } from '../services/reviewService';

export const useReviews = (apiId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviewsData = await reviewService.getReviews(apiId);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [apiId]);

  return { reviews, loading, error };
}; 
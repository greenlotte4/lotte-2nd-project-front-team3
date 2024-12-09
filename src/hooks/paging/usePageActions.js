import React, { useCallback } from "react";
import axios from "axios";

export const usePageActions = () => {
  const fetchPageData = useCallback(async (id) => {
    try {
      const response = await axios.get(`${PAGE_FETCH_URI}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching page:", error);
      throw error;
    }
  }, []);

  const savePage = useCallback(async (pageData) => {
    try {
      await axios.post(PAGE_SAVE_URI, pageData);
    } catch (error) {
      console.error("Error saving page:", error);
      throw error;
    }
  }, []);

  return { fetchPageData, savePage };
}; 
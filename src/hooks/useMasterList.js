// hooks/useMasterList.js
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../environment";
import { toast } from "react-toastify";

export const useMasterList = (type) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/GetMasterList/${type}`);
        const { data } = await res.json();
        setList(data);
      } catch {
        toast.error("Failed to fetch master list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { list, loading };
};

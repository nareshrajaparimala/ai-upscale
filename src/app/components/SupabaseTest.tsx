'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setStatus(`Error: ${error.message}`);
        } else {
          setStatus('Connection successful!');
        }
      } catch (err) {
        setStatus(`Connection failed: ${err}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3>Supabase Connection Test</h3>
      <p>{status}</p>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
    </div>
  );
}
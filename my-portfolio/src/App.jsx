import React, { useState, useEffect } from "react";
import Loading from "./components/Loading/Loading";
import Header  from "./components/Header/Header";
// … import other pages …

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate asset fetch / data load
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {/* … your main page content … */}
    </>
  );
}
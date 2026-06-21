"use client";
import { Footer } from '../../components/Footer';

export default function Help() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '80px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px' }}>Help Center</h1>
        <p>Coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}

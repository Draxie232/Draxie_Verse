export default function RecruiterProfile() {
  return (
    <div className="profile-container">

      <div className="profile-header">
        <h2>Company Name</h2>
        <p>Hiring Creators</p>
      </div>

      <div className="stats">
        <div>Campaigns: 12</div>
        <div>Creators Hired: 45</div>
      </div>

      <div className="campaigns">
        <div className="campaign-card">
          <h3>Instagram Reel Campaign</h3>
          <p>Budget: ₹50,000</p>
        </div>
      </div>

    </div>
  );
}
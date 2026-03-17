export default function CreatorProfile() {
  return (
    <div className="profile-container">

      <div className="profile-header">
        <img src="/avatar.png" alt="profile" />
        <h2>@username</h2>
        <p>Video Creator 🎬</p>
      </div>

      <div className="stats">
        <div>Followers: 1200</div>
        <div>Videos: 45</div>
        <div>Earnings: ₹12,000</div>
      </div>

      <div className="content-grid">
        <div className="video-card">Video 1</div>
        <div className="video-card">Video 2</div>
      </div>

    </div>
  );
}
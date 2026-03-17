export default function RoleCard({ title, desc, onClick }) {
  return (
    <div className="role-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
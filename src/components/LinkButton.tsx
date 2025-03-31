export default function LinkButton({ title, onClick = () => null }) {
  return (
    <div onClick={onClick} style={{ padding: 10, cursor: "pointer" }}>
      <span style={{ color: "white" }}>{title}</span>
    </div>
  );
}

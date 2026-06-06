"use client";
import { deleteProduct } from "@/app/actions/products";

export default function DeleteProductButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteProduct.bind(null, id)}
      onSubmit={e => {
        if (!confirm(`Delete "${name}"?`)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        style={{
          padding: ".6rem .875rem",
          borderRadius: "var(--radius-sm)",
          background: "#FFF1F2",
          color: "var(--g700)",
          border: "none",
          cursor: "pointer",
          fontFamily: "DM Sans,sans-serif",
          fontWeight: 700,
          fontSize: ".78rem",
          letterSpacing: ".06em",
          textTransform: "uppercase",
        }}
      >
        Delete
      </button>
    </form>
  );
}

export default function Header() {
  return (
    <header>
      <div
        className="header_actions"
        style={{
          color: "#000",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          alignItems: "center",
          boxShadow: "0 1px 4px rgba(0,21,41,.08)",
        }}
      >
        <span
          style={{
            marginRight: "auto",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          HỆ THỐNG QUẢN LÝ SẢN PHẨM
        </span>
        <a
          href="/login"
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Đăng nhập
        </a>
      </div>
    </header>
  );
}

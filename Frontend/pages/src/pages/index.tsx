import { Link } from "lucide-react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Link
      href="/services/web-development"
      className="bg-[#202637] text-[white] text-[10px] flex items-center justify-center h-[20px]"
      onClick={(e) => {
        router.push("/services/web-development");
      }}
    >
      Hello
    </Link>
  );
}

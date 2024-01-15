"use client";
import "./navbar.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();

  function handleLogoOnClick() {
    router.push("/");
  }

  function handleAboutOnClick() {
    router.push("/about");
  }

  return (
    <nav className="navbar">
      <Image
        className="logo"
        src="/box.png"
        alt="ToolBox Logo"
        width={80}
        height={50}
        onClick={handleLogoOnClick}
      />
      <div className="question-mark" onClick={handleAboutOnClick}>
        ?
      </div>
    </nav>
  );
}

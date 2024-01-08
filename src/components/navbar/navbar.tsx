"use client";
import "./navbar.css";
import { useRouter } from "next/navigation";

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
      <div onClick={handleLogoOnClick}>LOGO</div>
      <div onClick={handleAboutOnClick}>ABOUT</div>
    </nav>
  );
}

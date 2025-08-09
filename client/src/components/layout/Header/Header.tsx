import { ThemeModeToggle } from "./ThemeModeToggle";

export function Header() {
  return (
    <header id="header" className="header fixed left-0 top-0 right-0 z-10">
      <section className="header-container min-h-[48px] flex items-center justify-between px-2">
        <h1>Timesheets</h1>
        <ThemeModeToggle />
      </section>
    </header>
  );
}

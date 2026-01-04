import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Goal Tracker
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track your progress, build habits, and smash your goals.
        </p>
      </header>

      <main className="flex flex-col gap-4">
        <Link to="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link
          to="/login"
          className="text-sm text-muted-foreground hover:underline text-center"
        >
          I already have an account
        </Link>
      </main>
    </div>
  );
}

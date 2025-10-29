import flowIaLogo from "@/assets/flow-ia-logo.png";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "h-8" }: LogoProps) => {
  return (
    <img
      src={flowIaLogo}
      alt="Flow.IA"
      className={className}
    />
  );
};

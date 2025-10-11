import { ImageIcon, Code, Zap, Download } from "lucide-react";
import { TypographyP } from "./ui/typography";

const features = [
  {
    id: 1,
    icon: (
      <Code className="h-6 w-6 mb-2 text-orange-400" />

    ),
    text: "Live Editor",
  },
  {
    id: 2,
    icon: (
      <ImageIcon className="h-6 w-6 mb-2 text-orange-400" />
    ),
    text: "Live Preview",
  },
  {
    id: 3,
    icon: (
      <Zap className="h-6 w-6 mb-2 text-orange-400" />
    ),
    text: "Fast & Efficient",
  },
  {
    id: 4,
    icon: (
      <Download className="h-6 w-6 mb-2 text-orange-400" />
    ),
    text: "Multiple Formats",
  },
];

export default function FeatureCarousel() {
  return (
    <div
      className="relative w-full overflow-hidden 
      [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
    >
      <div className="flex w-max animate-scroll">
        {[...features, ...features].map((feature, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-54 flex flex-col justify-center items-center text-center"
          >
            {feature.icon}
            <TypographyP className="dark:font-semibold">{feature.text}</TypographyP>
          </div>
        ))}
      </div>
    </div>
  );
}
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
const reviews = [
  {
    name: "Aarav Mehta",
    username: "@aaravm",
    body: "The keynote was mind-blowing! Learned so much about the future of AI. Can't wait for next year.",
    img: "https://avatar.vercel.sh/aarav",
  },
  {
    name: "Sanya Kapoor",
    username: "@sanyak",
    body: "Absolutely loved the networking sessions. Met so many like-minded innovators and founders.",
    img: "https://avatar.vercel.sh/sanya",
  },
  {
    name: "Rahul Verma",
    username: "@rahulv",
    body: "The live demos during the hackathon were unreal. Super inspired to build something amazing now.",
    img: "https://avatar.vercel.sh/rahul",
  },
  {
    name: "Neha Sharma",
    username: "@nehas",
    body: "Everything was so well organized — from workshops to food stalls. Felt like a tech festival!",
    img: "https://avatar.vercel.sh/neha",
  },
  {
    name: "Karan Joshi",
    username: "@karanj",
    body: "I came for the talks, but the VR showcase totally stole the spotlight. Unreal experience!",
    img: "https://avatar.vercel.sh/karan",
  },
  {
    name: "Priya Nair",
    username: "@priyan",
    body: "First tech event I attended and I’m blown away. Kudos to the team behind this!",
    img: "https://avatar.vercel.sh/priya",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

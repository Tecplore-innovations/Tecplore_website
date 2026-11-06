import { Heart, Lightbulb, Linkedin, Target, TrendingUp } from 'lucide-react';

import PageHero from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';

const perks = [
  { icon: Target, title: 'Real Impact' },
  { icon: Lightbulb, title: 'Learn Every Day' },
  { icon: TrendingUp, title: 'Grow Fast' },
  { icon: Heart, title: 'Work That Matters' },
];

export default function CareersPage() {
  return (
    <PageHero
      title="Your Tecplore Career Starts Here"
      subtitle="We look for curiosity above all else. Everything else can be taught."
      pattern
    >
      <ul className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {perks.map((perk) => {
          const Icon = perk.icon;
          return (
            <li key={perk.title} className="flex items-center gap-2 font-semibold text-foreground">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              {perk.title}
            </li>
          );
        })}
      </ul>
      <p className="mb-6 text-body">We post all openings on LinkedIn. Follow us to be the first to know.</p>
      <Button asChild size="lg">
        <a
          href="https://www.linkedin.com/company/tecplore"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <Linkedin className="h-5 w-5" strokeWidth={1.5} />
          Follow Tecplore on LinkedIn
        </a>
      </Button>
    </PageHero>
  );
}

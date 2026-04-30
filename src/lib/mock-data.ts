export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  salary: string;
  salaryNum: number;
  tags: string[];
  posted: string;
  description: string;
};

export const jobs: Job[] = [
  { id: "1", title: "Frontend Engineer", company: "Stripe", logo: "S", location: "Remote", type: "Full-time", salary: "$120k – $160k", salaryNum: 140, tags: ["React", "TypeScript", "Tailwind"], posted: "2d ago", description: "Build delightful payment experiences used by millions." },
  { id: "2", title: "Product Designer", company: "Linear", logo: "L", location: "San Francisco", type: "Full-time", salary: "$130k – $170k", salaryNum: 150, tags: ["Figma", "Design Systems"], posted: "1d ago", description: "Craft the next generation of issue tracking." },
  { id: "3", title: "ML Engineer Intern", company: "Vercel", logo: "V", location: "Remote", type: "Internship", salary: "$45/hr", salaryNum: 90, tags: ["Python", "PyTorch", "LLMs"], posted: "5h ago", description: "Work on infrastructure that powers the modern web." },
  { id: "4", title: "Backend Engineer", company: "Notion", logo: "N", location: "New York", type: "Full-time", salary: "$140k – $180k", salaryNum: 160, tags: ["Go", "Postgres", "Distributed"], posted: "3d ago", description: "Scale collaborative tools for millions of teams." },
  { id: "5", title: "Growth Analyst", company: "Ramp", logo: "R", location: "Remote", type: "Full-time", salary: "$100k – $130k", salaryNum: 115, tags: ["SQL", "Analytics", "Growth"], posted: "1w ago", description: "Drive growth at the fastest growing fintech." },
  { id: "6", title: "DevOps Engineer", company: "Cloudflare", logo: "C", location: "Austin", type: "Full-time", salary: "$135k – $175k", salaryNum: 155, tags: ["K8s", "Terraform", "AWS"], posted: "4d ago", description: "Build and operate planetary-scale infrastructure." },
  { id: "7", title: "iOS Engineer Intern", company: "Figma", logo: "F", location: "Remote", type: "Internship", salary: "$50/hr", salaryNum: 100, tags: ["Swift", "iOS"], posted: "2d ago", description: "Bring collaborative design to mobile." },
  { id: "8", title: "Data Scientist", company: "Airbnb", logo: "A", location: "Seattle", type: "Full-time", salary: "$150k – $200k", salaryNum: 175, tags: ["Python", "ML", "SQL"], posted: "6d ago", description: "Unlock insights from the world's largest travel dataset." },
];

export const trustedCompanies = ["Stripe", "Linear", "Vercel", "Notion", "Ramp", "Figma", "Cloudflare", "Airbnb"];

export type Application = {
  id: string;
  jobTitle: string;
  company: string;
  appliedOn: string;
  status: "Applied" | "Shortlisted" | "Interview" | "Offer" | "Rejected";
};

export const applications: Application[] = [
  { id: "a1", jobTitle: "Frontend Engineer", company: "Stripe", appliedOn: "Apr 22, 2026", status: "Interview" },
  { id: "a2", jobTitle: "Product Designer", company: "Linear", appliedOn: "Apr 19, 2026", status: "Shortlisted" },
  { id: "a3", jobTitle: "ML Engineer Intern", company: "Vercel", appliedOn: "Apr 15, 2026", status: "Applied" },
  { id: "a4", jobTitle: "Backend Engineer", company: "Notion", appliedOn: "Apr 10, 2026", status: "Offer" },
  { id: "a5", jobTitle: "Growth Analyst", company: "Ramp", appliedOn: "Apr 02, 2026", status: "Rejected" },
];

export type Applicant = {
  id: string;
  name: string;
  email: string;
  role: string;
  university: string;
  cgpa: number;
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
};

export const applicants: Applicant[] = [
  { id: "p1", name: "Ananya Sharma", email: "ananya@univ.edu", role: "Frontend Engineer", university: "IIT Bombay", cgpa: 9.1, status: "Shortlisted" },
  { id: "p2", name: "Marcus Lee", email: "mlee@stanford.edu", role: "Frontend Engineer", university: "Stanford", cgpa: 3.9, status: "New" },
  { id: "p3", name: "Priya Verma", email: "priya@univ.edu", role: "Product Designer", university: "NID", cgpa: 8.7, status: "Reviewed" },
  { id: "p4", name: "Daniel Kim", email: "dkim@mit.edu", role: "ML Engineer Intern", university: "MIT", cgpa: 4.0, status: "Shortlisted" },
  { id: "p5", name: "Sara Ahmed", email: "sara@univ.edu", role: "Backend Engineer", university: "BITS Pilani", cgpa: 8.9, status: "New" },
  { id: "p6", name: "Liam Patel", email: "lpatel@cmu.edu", role: "DevOps Engineer", university: "CMU", cgpa: 3.8, status: "Rejected" },
];

export type PendingCompany = {
  id: string;
  name: string;
  industry: string;
  size: string;
  submittedOn: string;
  contact: string;
};

export const pendingCompanies: PendingCompany[] = [
  { id: "c1", name: "Quantum Labs", industry: "AI / Research", size: "50-200", submittedOn: "Apr 28, 2026", contact: "hr@quantum.io" },
  { id: "c2", name: "Northwind Capital", industry: "Fintech", size: "200-500", submittedOn: "Apr 27, 2026", contact: "talent@northwind.co" },
  { id: "c3", name: "Lumen Health", industry: "Healthtech", size: "10-50", submittedOn: "Apr 25, 2026", contact: "people@lumen.health" },
  { id: "c4", name: "Orbit Robotics", industry: "Hardware", size: "50-200", submittedOn: "Apr 24, 2026", contact: "jobs@orbit.bot" },
];

export const activityFeed = [
  { id: 1, who: "Stripe", action: "shortlisted your application", when: "2h ago" },
  { id: 2, who: "Linear", action: "scheduled an interview", when: "5h ago" },
  { id: 3, who: "Vercel", action: "viewed your profile", when: "1d ago" },
  { id: 4, who: "Notion", action: "sent you an offer 🎉", when: "2d ago" },
  { id: 5, who: "Ramp", action: "updated their job posting", when: "3d ago" },
];

export const chartData = [
  { m: "Nov", v: 12 }, { m: "Dec", v: 18 }, { m: "Jan", v: 22 },
  { m: "Feb", v: 31 }, { m: "Mar", v: 28 }, { m: "Apr", v: 42 },
];
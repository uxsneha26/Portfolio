export type Testimonial = {
  id: string;
  name: string;
  designation: string;
  company: string;
  text: string;
  image: string;
  linkedin: string;
  color: "green" | "blue" | "beige" | "peach";
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Mayur Jain",
    designation: "Project Lead",
    company: "Boston Consulting Group",
    text: "She demonstrated strong strategic thinking by converting complex business requirements into user-centered digital experiences. She consistently delivered high-quality work within strict timelines, incorporated feedback thoughtfully, and communicated ideas with clarity. Her professionalism and collaborative approach made her a key contributor to the project’s success.",
    image: "/testimonials/1.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "green",
  },
  {
    id: "t2",
    name: "Biswa Prateem Das",
    designation: "Head of GCC Platform",
    company: "Zinnov",
    text: "The project required translating complex business and product requirements into structured insights and interactive design solutions. Her approach was grounded in strategic thinking, balancing user needs with business objectives. She helped facilitate an insight workshop with the Business Development and Customer Success teams to gather and align on requirements for Admin Module.",
    image: "/testimonials/2.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "blue",
  },
  {
    id: "t3",
    name: "Disha Somra",
    designation: "Product Lead, Consumer Platforms AI & iOT",
    company: "ACT Fibernet",
    text: "She brought clarity to the product experience, with a strong focus on intuitive interactions and enabling users to easily manage their devices and network. She also had a natural knack for design innovation and visual execution, especially when working through ambiguous problem spaces and shaping them into intuitive interfaces. She is reliable, collaborative, and easy to work with, contributing positively to team dynamics throughout the project.",
    image: "/testimonials/3.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "beige",
  },
  {
    id: "t4",
    name: "Aerathe Rajeev Radhakrishnan Nair",
    designation: "Design Program Manager",
    company: "Lollypop Design Studio",
    text: "Editorial tone without fluff. Stakeholders trusted the flows because the rationale was always visible.",
    image: "/testimonials/4.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "peach",
  },
  {
    id: "t5",
    name: "Loyola Daniel  Duke",
    designation: "UI Designer",
    company: "Lollypop Design Studio",
    text: "From the very beginning, what stood out to me was her ability to communicate effortlessly with clients. Whether explaining design decisions or handling feedback, she did it with clarity and calmness, always ensuring the team and the client were on the same page. She was also someone I could always turn to whenever I had doubts. No matter how busy things got, she patiently took the time to explain things until I fully understood something I truly appreciated.",
    image: "/testimonials/5.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "green",
  },
  {
    id: "t6",
    name: "Tejas Ambole",
    designation: "Projest Manager",
    company: "Lollypop Design Studio",
    text: "Sneha is a born-ready designer who brings an incredible mix of grounded empathy and sharp UX fundamentals to every project she takes on. Her ability to connect design thinking with on-ground customer insights truly sets her apart. What I’ve admired most is her commitment to good UX practices; not just as a checklist, but as a mindset. She’s thoughtful, thorough, and always focused on delivering experiences that feel intuitive and meaningful.",
    image: "/testimonials/6.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "blue",
  },
  {
    id: "t7",
    name: "Doris Santhus",
    designation: "Prncipal UX Designer",
    company: "Lollypop Design Studio",
    text: "Sneha is diligent and extremely hard working. She can own a project and does whatever it takes to see the project through the finish line. I have worked with her on a couple of projects and have seen her consistently grow more confident in making design decisions in the last few years.",
    image: "/testimonials/7.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "beige",
  },
  {
    id: "t8",
    name: "Addaito Chatterjee",
    designation: "Associate Lead UX Researcher",
    company: "Lollypop Design Studio",
    text: "Quiet confidence in the work. I’d partner again on anything that needs both strategy and sensitivity to users.",
    image: "/testimonials/8.jpg",
    linkedin: "https://www.linkedin.com/",
    color: "peach",
  },
];

import Link from "next/link";
import * as icons from "./icons";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

const contacts = [
  {
    icon: icons.InstagramIcon,
    link: "https://instagram.com/luddilo",
  },
];

export default function Footer() {
  return (
    <footer className="mb-16 mt-16">
      <section>
        {/* <div className="flex flex-wrap items-center text-gray-900 dark:text-white">
          Reach me:
          {contacts.map((contact) => (
            <Link className="mx-1" href={contact.link}>
              {contact.icon()}
            </Link>
          ))}
        </div> */}
      </section>
    </footer>
  );
}

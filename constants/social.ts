import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

export const SOCIAL_LINKS = [
  {
    name: "Twitter",
    url: "https://twitter.com/universityofai",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/universityofai",
    icon: FaLinkedinIn,
  },
  {
    name: "GitHub",
    url: "https://github.com/universityofai",
    icon: FaGithub,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@universityofai",
    icon: FaYoutube,
  },
  {
    name: "Discord",
    url: "https://discord.gg/universityofai",
    icon: FaDiscord,
  },
  {
    name: "Email",
    url: "mailto:hello@universityofai.com",
    icon: MdOutlineMail,
  },
];

export const SOCIAL_SHARE = {
  twitter: (url: string, text: string) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};
